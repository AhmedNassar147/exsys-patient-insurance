/*
 *
 * Component: `MoreDetailsModal`.
 *
 */
import { memo, useCallback } from "react";
import TextArea from "@exsys-patient-insurance/textarea-field";
import Modal from "@exsys-patient-insurance/modal";
import useFormManager from "@exsys-patient-insurance/form-manager";
import { validateFields } from "@exsys-patient-insurance/helpers";
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";
import {
  RequestTableRecordType,
  ServiceItemValuesForPostApiType,
} from "../index.interface";

interface MoreDetailsModal {
  visible: boolean;
  onClose: () => void;
  selectedRecord: RequestTableRecordType;
  isSavingRequest: boolean;
  handleSaveServiceRequest: (
    values: ServiceItemValuesForPostApiType,
    showNotificationAndRefetchData?: boolean
  ) => Promise<void>;
}

const MoreDetailsModal = ({
  selectedRecord: { reply_notes: baseReplyNotes, ...record },
  visible,
  onClose,
  isSavingRequest,
  handleSaveServiceRequest,
}: MoreDetailsModal) => {
  const onSubmit = useCallback(
    ({ reply_notes }: RecordTypeWithAnyValue) =>
      handleSaveServiceRequest(
        {
          ...record,
          reply_notes,
          record_status: "u",
        },
        true
      ),
    []
  );

  const {
    values: { reply_notes },
    handleChange,
    errors,
    handleSubmit,
  } = useFormManager({
    initialValues: {
      reply_notes: baseReplyNotes,
    },
    // @ts-ignore
    validate: validateFields,
    onSubmit,
  });

  return (
    <Modal
      title="rply"
      visible={visible}
      onClose={onClose}
      width="600px"
      onOk={handleSubmit}
      disabled={isSavingRequest}
      loading={isSavingRequest}
    >
      <TextArea
        name="reply_notes"
        value={reply_notes}
        onChange={handleChange}
        width="100%"
        margin="12px 0"
        initialInputHeight="110px"
        error={errors?.reply_notes}
      />
    </Modal>
  );
};

export default memo(MoreDetailsModal);
