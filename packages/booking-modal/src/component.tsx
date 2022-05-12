/*
 *
 * `BookingModal`: `@exsys-clinio/booking-modal`.
 *
 */
import { memo, useCallback, useState } from "react";
import Modal from "@exsys-clinio/modal";
import Flex from "@exsys-clinio/flex";
import { spacings, colors } from "@exsys-clinio/theme-values";
import Text from "@exsys-clinio/text";
import InputField from "@exsys-clinio/input-field";
import SelectWithApiQuery from "@exsys-clinio/select-with-api-query";
import useFromManager from "@exsys-clinio/form-manager";
import { useBasicMutation } from "@exsys-clinio/network-hooks";
import { FORM_INITIAL_VALUES, FormInitialValuesType } from "./constants";
import { StyledDateInput } from "./styled";
import validateFormFields from "./helpers/validateFormFields";

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  appointmentId: number;
}

const BookingModal = ({
  visible,
  onClose,
  appointmentId,
}: BookingModalProps) => {
  const [serverError, setServerError] = useState("");

  const { loading, mutate } = useBasicMutation({
    apiId: "POST_CREATE_PATIENT_BOOKING",
    includeLanguage: true,
  });

  const handleSaveBooking = useCallback(
    (values: FormInitialValuesType) => {
      mutate({
        body: {
          ...values,
          session_length: 0,
          booking_type: "N",
          appointment_id: appointmentId,
          // walking
          // session_code,
          // bookingDate: date
        },
        cb: ({ apiValues, error }) => {
          const isError = !!error || apiValues?.status !== "success";
          if (isError && error) {
            setServerError(error as string);
          }
        },
      });
    },
    [mutate, appointmentId]
  );

  const {
    values: {
      gender,
      patient_name_p,
      patient_name_2_p,
      patient_name_3_p,
      patient_name_f_p,
      phone_m,
      where_find,
      id_type,
      id_no,
      date_of_birth,
      nationality,
    },
    handleChange,
    errors,
    handleSubmit,
  } = useFromManager({
    initialValues: FORM_INITIAL_VALUES,
    validate: validateFormFields,
    onSubmit: handleSaveBooking,
  });

  return (
    <Modal
      width="743px"
      visible={visible}
      onClose={onClose}
      title="bokapntmnt"
      bodyPadding={spacings.sp4}
      maskClosable={false}
      onOk={handleSubmit}
      okText="book"
      loading={loading}
      disabled={loading}
    >
      {serverError && (
        <Text
          children={serverError}
          color={colors.red}
          disableTranslation
          width="99%"
          align="center"
          fontSize="ff7"
          margin="0 0 10px"
        />
      )}
      <Flex width="100%" gap={spacings.sp4} wrap="true">
        <Flex width="100%" gap={spacings.sp4} align="center" wrap="true">
          <InputField
            name="patient_name_p"
            label="frstnme"
            width={spacings.sp22}
            value={patient_name_p}
            onChange={handleChange}
            error={errors?.patient_name_p}
            valueMatchPattern="/[a-zA-Z]+/gi"
            upperCaseFirstCharacter
          />
          <InputField
            name="patient_name_2_p"
            label="scndnme"
            width={spacings.sp22}
            value={patient_name_2_p}
            onChange={handleChange}
            error={errors?.patient_name_2_p}
            valueMatchPattern="/[a-zA-Z]+/gi"
            upperCaseFirstCharacter
          />
          <InputField
            name="patient_name_3_p"
            label="thrdnme"
            width={spacings.sp22}
            value={patient_name_3_p}
            onChange={handleChange}
            error={errors?.patient_name_3_p}
            valueMatchPattern="/[a-zA-Z]+/gi"
            upperCaseFirstCharacter
          />
          <InputField
            name="patient_name_f_p"
            label="fmlynme"
            width={spacings.sp22}
            value={patient_name_f_p}
            onChange={handleChange}
            error={errors?.patient_name_f_p}
            valueMatchPattern="/[a-zA-Z]+/gi"
            upperCaseFirstCharacter
          />
        </Flex>

        <InputField
          customInputComponent={StyledDateInput}
          name="date_of_birth"
          type="date"
          width={spacings.sp22}
          label="dob"
          value={date_of_birth}
          error={errors?.date_of_birth}
          onChange={handleChange}
          forceFloatingLabel
        />
        <InputField
          name="phone_m"
          label="mbln"
          value={phone_m}
          width={spacings.sp22}
          onChange={handleChange}
          error={errors?.phone_m}
          valueMatchPattern="/\d/g"
        />

        <SelectWithApiQuery
          label="ntionlty"
          width={spacings.sp22}
          apiOrCodeId="NATIONALITY_TYPES"
          queryType="u_code"
          error={errors?.nationality}
          name="nationality"
          value={nationality}
          onChange={handleChange}
          enableNetworkCache
        />

        <InputField
          label="idnum"
          error={errors?.id_no}
          name="id_no"
          value={id_no}
          width={spacings.sp22}
          onChange={handleChange}
          valueMatchPattern="/\d/g"
        />

        <SelectWithApiQuery
          label="idtyp"
          width={spacings.sp22}
          error={errors?.id_type}
          apiOrCodeId="ID_TYPES"
          queryType="u_code"
          name="id_type"
          value={id_type}
          onChange={handleChange}
          enableNetworkCache
        />

        <SelectWithApiQuery
          label="gndr"
          width={spacings.sp22}
          error={errors?.gender}
          apiOrCodeId="GENDER_TYPES"
          queryType="u_code"
          name="gender"
          value={gender}
          onChange={handleChange}
          enableNetworkCache
        />
        <SelectWithApiQuery
          label="whrfindus"
          width={spacings.sp27}
          apiOrCodeId="WHERE_TO_FIND_TYPES"
          queryType="u_code"
          name="where_find"
          value={where_find}
          onChange={handleChange}
          enableNetworkCache
        />
      </Flex>
    </Modal>
  );
};

export default memo(BookingModal);
