/*
 *
 * Component: `CreateNewBatchModal`.
 *
 */
import { memo, useCallback, useMemo } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import DatePickerField from "@exsys-patient-insurance/date-picker-field";
import Modal from "@exsys-patient-insurance/modal";
import Flex from "@exsys-patient-insurance/flex";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";
import SelectWithApiQuery from "@exsys-patient-insurance/select-with-api-query";
import { useAppConfigStore } from "@exsys-patient-insurance/app-config-store";
import { validateFields } from "@exsys-patient-insurance/helpers";
import { initialNewBatchValues } from "../constants";

interface CreateNewBatchModalProps {
  visible: boolean;
  handleClose: () => void;
  handleSaveSuccuss: () => void;
}

const CreateNewBatchModal = ({
  visible,
  handleClose,
  handleSaveSuccuss,
}: CreateNewBatchModalProps) => {
  const {
    addNotification,
    state: { provider_no },
  } = useAppConfigStore();

  const { mutate, loading } = useBasicMutation({
    apiId: "POST_MI_BATCHES_TABLE_DATA",
    includeLanguage: true,
  });

  const handleSave = useCallback(
    ({ start_date, end_date, tpa_no }: typeof initialNewBatchValues) => {
      mutate({
        body: {
          start_date,
          end_date,
          tpa_no,
          provider_no,
        },
        cb: ({ apiValues, error }) => {
          const isError = !!error || apiValues?.status !== "success";

          addNotification({
            type: isError ? "error" : "success",
            message: isError ? error || "flssve" : "succmsg",
            description: isError ? error : "",
          });

          if (!isError) {
            handleClose();
            handleSaveSuccuss();
          }
        },
      });
    },
    [handleSaveSuccuss, addNotification, handleClose, mutate, provider_no]
  );

  const {
    values: { start_date, end_date, tpa_no },
    handleChange,
    errors,
    handleSubmit,
  } = useFormManager({
    initialValues: initialNewBatchValues,
    onSubmit: handleSave,
    // @ts-ignore ignore this for now.
    validate: validateFields,
  });

  const tpaProvidersParams = useMemo(() => ({ provider_no }), [provider_no]);

  return (
    <Modal
      title="creatnewbatch"
      width="520px"
      visible={visible}
      onClose={handleClose}
      onOk={handleSubmit}
      okText="aply"
      loading={loading}
      disabled={loading}
      maskClosable={false}
    >
      <Flex gap="12px" width="100%" column="true">
        <SelectWithApiQuery
          label="tpaname"
          width="100%"
          name="tpa_no"
          enableNetworkCache
          queryType="query"
          apiOrCodeId="QUERY_TPA_PROVIDER_LIST"
          value={tpa_no}
          onChange={handleChange}
          apiParams={tpaProvidersParams}
          checkAllParamsValuesToQuery
          preselectFirstKey
          error={errors?.tpa_no}
        />

        <DatePickerField
          width="100%"
          onChange={handleChange}
          name="start_date"
          label="strtdt"
          value={start_date}
          error={errors?.start_date}
        />
        <DatePickerField
          width="100%"
          onChange={handleChange}
          name="end_date"
          label="enddate"
          value={end_date}
          error={errors?.end_date}
        />
      </Flex>
    </Modal>
  );
};

export default memo(CreateNewBatchModal);
