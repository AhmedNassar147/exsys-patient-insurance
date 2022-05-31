/*
 *
 * `BookingModal`: `@exsys-clinio/booking-modal`.
 *
 */
import { memo, useCallback, useState, useMemo } from "react";
import Modal from "@exsys-clinio/modal";
import Flex from "@exsys-clinio/flex";
import { spacings, colors } from "@exsys-clinio/theme-values";
import Text, { BaseText } from "@exsys-clinio/text";
import { setItemToStorage, getItemFromStorage } from "@exsys-clinio/helpers";
import InputField from "@exsys-clinio/input-field";
import SelectWithApiQuery from "@exsys-clinio/select-with-api-query";
import useFromManager from "@exsys-clinio/form-manager";
import { useBasicMutation } from "@exsys-clinio/network-hooks";
import Image from "@exsys-clinio/image";
import Button from "@exsys-clinio/button";
import {
  FORM_INITIAL_VALUES,
  minimumBirthDate,
  maximumBirthDate,
  FormInitialValuesType,
} from "./constants";
import { StyledDateInput, StyledTable } from "./styled";
import validateFormFields from "./helpers/validateFormFields";
import convertInputDateToNormalFormat from "./helpers/convertInputDateToNormalFormat";

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  appointmentId: number;
  bookingTime?: string;
  booking: string;
  doctorImageUrl: string;
  bookingDate: string;
  clinicalName: string;
  onBookingDoneSuccessfully: () => void;
}

const {
  sp4: spacing4,
  sp22: spacing22,
  sp27: spacing27,
  sp3: spacing3,
  sp2: spacing2,
  sp19: spacing19,
  sp16: spacing10,
  sp32: spacing32,
} = spacings;

const valueMatchPattern = "/[a-zA-Z|ء-ي]+/gi";

const serverTextMargin = `0 0 ${spacing2}`;
const bookingInfoTextMargin = `${spacing2} 0 0`;
const bookingInfoCardMargin = `0 0 0 ${spacing3}`;

const { red, lightGreen, appPrimary } = colors;

const initialBookingApiDoneResults = {
  message: "",
  type: "",
};

const oldReservationData = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(
  (_, index) => ({
    rowKey: index + 1,
    date: `${index + 1}-06-2022`,
    doctorName: index % 2 === 0 ? "Nagy Abdulkhaleq" : "Kamel",
  })
);

const BookingModal = ({
  visible,
  onClose,
  appointmentId,
  bookingTime,
  doctorImageUrl,
  bookingDate,
  clinicalName,
  onBookingDoneSuccessfully,
}: BookingModalProps) => {
  const [bookingResultModalState, setBookingResultModalState] = useState(
    initialBookingApiDoneResults
  );

  const { loading, mutate } = useBasicMutation({
    apiId: "POST_CREATE_PATIENT_BOOKING",
    includeLanguage: true,
  });

  const handleSaveBooking = useCallback(
    (fromValues: FormInitialValuesType) => {
      setItemToStorage("patientData", fromValues);

      const { date_of_birth, ...values } = fromValues;

      mutate({
        body: {
          ...values,
          date_of_birth: convertInputDateToNormalFormat(date_of_birth),
          session_length: 0,
          booking_type: "N",
          appointment_id: appointmentId,
          // walking
          // session_code,
          // bookingDate: date
        },
        cb: ({ apiValues, error }) => {
          const { status } = apiValues;
          const isError = status !== "success";
          setBookingResultModalState({
            type: status,
            message: isError ? error || "flssve" : "donsucesfly",
          });
        },
      });
    },
    [mutate, appointmentId]
  );

  const formInitialValues = useMemo(() => {
    const cashedPatientData =
      getItemFromStorage<FormInitialValuesType>("patientData");

    return cashedPatientData || FORM_INITIAL_VALUES;
  }, []);

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
    initialValues: formInitialValues,
    validate: validateFormFields,
    onSubmit: handleSaveBooking,
  });

  const { type: bookingApiStatus, message: bookingApiMessage } =
    bookingResultModalState;

  const handleCloseBookingApiModal = useCallback(() => {
    if (bookingApiStatus === "success") {
      onClose();
      onBookingDoneSuccessfully();
      return;
    }

    setBookingResultModalState(initialBookingApiDoneResults);
  }, [onBookingDoneSuccessfully, onClose, bookingApiStatus]);

  return (
    <>
      <Modal
        width="743px"
        visible={visible}
        onClose={onClose}
        title="bokapntmnt"
        bodyPadding={spacing4}
        maskClosable={false}
        onOk={handleSubmit}
        okText="book"
        loading={loading}
        disabled={loading}
      >
        <Flex width="100%" gap={spacing4} wrap="true">
          <Text
            fontSize="ff7"
            margin={bookingInfoTextMargin}
            colors={appPrimary}
          >
            bokinginfo
          </Text>

          <Flex
            width="100%"
            bordered
            gap={spacing4}
            wrap="true"
            padding={spacing4}
            margin={bookingInfoCardMargin}
          >
            <Image
              src={doctorImageUrl}
              alt="clinical"
              height="sp16"
              width="sp16"
              borderRadius="4px"
            />
            <Flex gap={spacing4} wrap="true" column="true" flex={1}>
              <Text
                disableTranslation
                children={clinicalName}
                fontSize="ff8"
                weight="700"
                lines={3}
              />
              <Text
                children={`__t__bookngdte : ${bookingDate}`}
                fontSize="ff9"
                weight="400"
              />
              <Text
                children={`__t__bokngtim : ${bookingTime}`}
                fontSize="ff9"
                weight="400"
              />
            </Flex>
          </Flex>

          <Flex width="100%" gap={spacing4} align="center" wrap="true">
            <Flex width="100%" gap={spacing4} align="center" wrap="true">
              <InputField
                label="idnum"
                error={errors?.id_no}
                name="id_no"
                value={id_no}
                width={spacing22}
                onChange={handleChange}
                valueMatchPattern="/\d/g"
              />

              <SelectWithApiQuery
                label="idtyp"
                width={spacing22}
                error={errors?.id_type}
                apiOrCodeId="ID_TYPES"
                queryType="u_code"
                name="id_type"
                value={id_type}
                onChange={handleChange}
                enableNetworkCache
              />

              <InputField
                name="phone_m"
                label="mbln"
                value={phone_m}
                width={spacing22}
                onChange={handleChange}
                error={errors?.phone_m}
                valueMatchPattern="/\d/g"
              />

              <Button type="primary" label="srch" />
            </Flex>
            <InputField
              name="patient_name_p"
              label="frstnme"
              width={spacing22}
              value={patient_name_p}
              onChange={handleChange}
              error={errors?.patient_name_p}
              valueMatchPattern={valueMatchPattern}
              upperCaseFirstCharacter
            />
            <InputField
              name="patient_name_2_p"
              label="scndnme"
              width={spacing22}
              value={patient_name_2_p}
              onChange={handleChange}
              error={errors?.patient_name_2_p}
              valueMatchPattern={valueMatchPattern}
              upperCaseFirstCharacter
            />
            <InputField
              name="patient_name_3_p"
              label="thrdnme"
              width={spacing22}
              value={patient_name_3_p}
              onChange={handleChange}
              error={errors?.patient_name_3_p}
              valueMatchPattern={valueMatchPattern}
              upperCaseFirstCharacter
            />
            <InputField
              name="patient_name_f_p"
              label="fmlynme"
              width={spacing22}
              value={patient_name_f_p}
              onChange={handleChange}
              error={errors?.patient_name_f_p}
              valueMatchPattern={valueMatchPattern}
              upperCaseFirstCharacter
            />
          </Flex>

          <InputField
            customInputComponent={StyledDateInput}
            name="date_of_birth"
            type="date"
            width={spacing22}
            label="dob"
            value={date_of_birth}
            error={errors?.date_of_birth}
            onChange={handleChange}
            forceFloatingLabel
            min={minimumBirthDate}
            max={maximumBirthDate}
          />

          <SelectWithApiQuery
            label="ntionlty"
            width={spacing19}
            apiOrCodeId="NATIONALITY_TYPES"
            queryType="u_code"
            error={errors?.nationality}
            name="nationality"
            value={nationality}
            onChange={handleChange}
            enableNetworkCache
          />

          <SelectWithApiQuery
            label="gndr"
            width={spacing10}
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
            width={spacing32}
            apiOrCodeId="WHERE_TO_FIND_TYPES"
            queryType="u_code"
            name="where_find"
            value={where_find}
            onChange={handleChange}
            enableNetworkCache
          />
        </Flex>

        <Text
          fontSize="ff7"
          color={colors.appPrimary}
          margin={`${spacings.sp4} 0`}
        >
          bokngs
        </Text>
        <StyledTable>
          <thead>
            <tr>
              <BaseText tag="th">date</BaseText>
              <BaseText tag="th">docnam</BaseText>
              <BaseText tag="th">action</BaseText>
            </tr>
          </thead>

          <tbody>
            {oldReservationData.map(({ date, doctorName, rowKey }) => (
              <tr key={rowKey}>
                <td>{date}</td>
                <td>{doctorName}</td>
                <td>
                  <Flex width="100%" align="center" justify="center">
                    <Button
                      height="18px"
                      size="small"
                      type="danger"
                      label="-"
                    />
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </Modal>
      {!!bookingApiMessage && (
        <Modal
          visible={!!bookingApiMessage}
          title="info"
          width={spacing27}
          onClose={handleCloseBookingApiModal}
          noCancelButton
          bodyMinHeight="20px"
        >
          <Text
            children={bookingApiMessage}
            color={bookingApiStatus !== "success" ? red : lightGreen}
            width="99%"
            align="center"
            fontSize="ff8"
            margin={serverTextMargin}
          />
        </Modal>
      )}
    </>
  );
};

export default memo(BookingModal);
