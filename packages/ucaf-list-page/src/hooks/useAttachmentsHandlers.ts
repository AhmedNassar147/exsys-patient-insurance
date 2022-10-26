/*
 *
 * Hook: `useAttachmentsHandlers`
 *
 */
import { useCallback } from "react";
import {
  useGlobalProviderNo,
  useAppConfigStore,
} from "@exsys-patient-insurance/app-config-store";
import {
  useUploadFilesMutation,
  useBasicMutation,
  useBasicQuery,
} from "@exsys-patient-insurance/network-hooks";
import { normalizeNativeInputFile } from "@exsys-patient-insurance/helpers";
import {
  RecordType,
  OnResponseActionType,
  onChangeEvent,
} from "@exsys-patient-insurance/types";
import { SaveAttachmentEventType } from "../index.interface";

interface UseAttachmentsHandlersOptions {
  handleChange: onChangeEvent;
  root_organization_no: string;
  patient_card_no: string;
  ucaf_id?: number;
}

const useAttachmentsHandlers = ({
  handleChange,
  root_organization_no,
  patient_card_no,
  ucaf_id,
}: UseAttachmentsHandlersOptions) => {
  const globalProviderNo = useGlobalProviderNo();
  const { addNotification } = useAppConfigStore();

  const { handleUploadOneFile, uploading } = useUploadFilesMutation();
  const { loading: isSavingAttachment, mutate: saveAttachment } =
    useBasicMutation({
      apiId: "POST_UCAF_ATTACHMENT",
    });

  const handleAttachmentsResponse: OnResponseActionType<
    RecordType<RecordType[]>
  > = useCallback(
    ({ apiValues, error }) => {
      const baseValues = apiValues?.data;
      handleChange({
        name: "attachments",
        value: !!error || !baseValues?.length ? [] : baseValues,
      });
    },
    [handleChange]
  );

  const { loading: attachmentsLoading, runQuery: fetchAttachments } =
    useBasicQuery({
      apiId: "QUERY_UCAF_ATTACHMENTS",
      callOnFirstRender: false,
      // skipQuery: skipAttachmentsQuery,
      checkAllParamsValuesToQuery: true,
      onResponse: handleAttachmentsResponse,
      params: {
        ucaf_id,
        provider_no: globalProviderNo,
      },
    });

  const handleSaveAttachment = useCallback(
    async ({ imageType, imageID, onSuccess }: SaveAttachmentEventType) => {
      const isDelete = !!imageID;
      await saveAttachment({
        body: {
          root_organization_no,
          patient_card_no: patient_card_no,
          ucaf_id,
          provider_no: globalProviderNo,
          record_status: isDelete ? "d" : "n",
          image_file_name: imageType,
          image_id: imageID || "",
        },
        cb: async ({ apiValues, error }) => {
          const { status, imageFileName } = apiValues || {};
          const isError = !!error || status !== "success";

          if (onSuccess) {
            await onSuccess(imageFileName);
          }

          addNotification({
            type: isError ? "error" : "success",
            message: isError ? "flssve" : "succmsg",
          });

          if (!isError) {
            await fetchAttachments();
          }
        },
      });
    },
    [
      fetchAttachments,
      saveAttachment,
      patient_card_no,
      globalProviderNo,
      root_organization_no,
    ]
  );

  const handleAddAttachment: onChangeEvent<File | undefined> = useCallback(
    async ({ value, name }) => {
      if (!value) {
        return;
      }

      const { imageType } = normalizeNativeInputFile(value);

      await handleSaveAttachment({
        imageType,
        onSuccess: async (imageFileName) => {
          await handleUploadOneFile({
            file: value,
            directory: "PATIENTIMAGE",
            fieldName: name,
            customUniqueFileNameOrFn: imageFileName,
          });
        },
      });
    },
    [handleSaveAttachment, handleUploadOneFile]
  );

  const onDeleteAttachment = useCallback(
    async ({ image_id }: RecordType) =>
      await handleSaveAttachment({
        imageID: image_id,
      }),
    [handleSaveAttachment]
  );

  return {
    attachmentsLoading,
    handleAddAttachment,
    onDeleteAttachment,
    uploading,
    isSavingAttachment,
  };
};

export default useAttachmentsHandlers;
