import { memo, useCallback } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import DatePickerField from "@exsys-patient-insurance/date-picker-field";
import Modal from "@exsys-patient-insurance/modal";
import Flex from "@exsys-patient-insurance/flex";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";
import InputField from "@exsys-patient-insurance/input-field";
import { useAppConfigStore } from "@exsys-patient-insurance/app-config-store";
import { validateFields } from "@exsys-patient-insurance/helpers";
import { initialNewBatchValues } from "../constants";
import SelectionCheck from "@exsys-patient-insurance/selection-check";

interface CreateNewRecordModalProps {
  visible: boolean;
  handleClose: () => void;
}

const ModalView = ({ visible, handleClose }: CreateNewRecordModalProps) => {
  const { addNotification } = useAppConfigStore();

  const { mutate, loading } = useBasicMutation({
    apiId: "POST_POLICY_PATIENT_TABLE_DATA",
    includeLanguage: true,
  });
  const {
    values: {
      patient_card_no,
      patient_name_p,
      patient_name_s,
      gender,
      date_of_birth,
      start_from,
      end_at,
      phone_m,
      // status,
    },
    handleChange,
    errors,
  } = useFormManager({
    initialValues: initialNewBatchValues,

    // @ts-ignore ignore this for now.
    validate: validateFields,
  });

  const handleSave = useCallback(() => {
    mutate({
      body: {
        class: "SSGL",
        policy_no: "SSW",
        organization_no: "001",
        patient_card_no,
        patient_name_p,
        patient_name_s,
        gender,
        date_of_birth,
        start_from,
        end_at,
        phone_m,
        status: "N",
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
        }
      },
    });
  }, [
    mutate,
    patient_card_no,
    patient_name_p,
    patient_name_s,
    gender,
    date_of_birth,
    start_from,
    end_at,
    phone_m,
    addNotification,
    handleClose,
  ]);

  return (
    <Modal
      title="creatnewrcrd"
      width="70%"
      visible={visible}
      onClose={handleClose}
      onOk={handleSave}
      okText="aply"
      loading={loading}
      disabled={loading}
      maskClosable={false}
    >
      <Flex wrap="true" width="100%" gap="12px" align="baseline">
        <InputField
          name="patient_card_no"
          onChange={handleChange}
          value={patient_card_no}
          error={errors?.patient_card_no}
          label="cardno"
          width="calc(100% / 3 - 10px)"
          // minLength={maxMiCardNoFieldLength}
          // maxLength={maxMiCardNoFieldLength}
          // disabled={miCardNoFieldDisabled || !isInsetStatusMode}
        />
        <InputField
          name="patient_name_p"
          value={patient_name_p}
          error={errors?.patient_name_p}
          onChange={handleChange}
          label="engname"
          width="calc(100% / 3 - 10px)"
        />

        <InputField
          name="patient_name_s"
          value={patient_name_s}
          error={errors?.patient_name_s}
          onChange={handleChange}
          label="arname"
          width="calc(100% / 3 - 10px)"
        />

        <DatePickerField
          label="dob"
          width="calc(100% / 3 - 10px)"
          value={date_of_birth}
          name="date_of_birth"
          error={errors?.date_of_birth}
          onChange={handleChange}
        />

        <InputField
          label="phn"
          width="calc(100% / 3 - 10px)"
          name="phone_m"
          onChange={handleChange}
          value={phone_m}
        />

        <DatePickerField
          value={start_from}
          name="start_from"
          onChange={handleChange}
          label="strtdt"
          error={errors?.start_from}
          width="calc(100% / 4 - 10px)"
        />

        <DatePickerField
          label="endat"
          width="calc(100% / 4 - 10px)"
          value={end_at}
          name="end_at"
          error={errors?.end_at}
          onChange={handleChange}
        />

        <SelectionCheck
          label="actve"
          width="auto"
          // checked={status}
          onChange={handleChange}
          name="status"
        />
      </Flex>
    </Modal>
  );
};
export default memo(ModalView);
