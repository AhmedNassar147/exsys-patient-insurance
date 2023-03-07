/*
 *
 * Package: `@exsys-patient-insurance/find-patient-form`.
 *
 */
import { memo, useCallback, useMemo } from "react";
import SelectionCheckGroup from "@exsys-patient-insurance/selection-check-group";
import Text from "@exsys-patient-insurance/text";
import Flex from "@exsys-patient-insurance/flex";
import Button from "@exsys-patient-insurance/button";
import InputField from "@exsys-patient-insurance/input-field";
import Modal from "@exsys-patient-insurance/modal";
import ExsysTable from "@exsys-patient-insurance/exsys-table";
import useFormManager from "@exsys-patient-insurance/form-manager";
import { useOpenCloseActionsWithState } from "@exsys-patient-insurance/hooks";
import { useAppConfigStore } from "@exsys-patient-insurance/app-config-store";
import { checkIfThisDateGreaterThanOther } from "@exsys-patient-insurance/helpers";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import {
  onChangeEvent,
  RecordTypeWithAnyValue,
  TableBodyRowClickEvent,
  RecordType,
  OnResponseActionType,
} from "@exsys-patient-insurance/types";
import {
  TABLE_COLUMNS,
  SEARCH_RADIO_OPTIONS,
  initialPatientData,
  initialState,
} from "./constants";
import { PatientItemRecordType } from "./index.interface";

interface FindPatientFormProps {
  handleChangeMultipleInputs: (values: RecordTypeWithAnyValue) => void;
  onChangeSearchFields?: onChangeEvent;
  hidePhoneOption?: boolean;
}

const FindPatientForm = ({
  handleChangeMultipleInputs,
  onChangeSearchFields,
  hidePhoneOption,
}: FindPatientFormProps) => {
  const { addNotification } = useAppConfigStore();
  const {
    values: { patientsDataList, search_type, search_value },
    handleChange: handleInternalChange,
    handleChangeMultipleInputs: handleChangeInternalMultipleInputs,
  } = useFormManager({
    initialValues: initialState,
  });

  const {
    visible: selectionModalOpened,
    handleClose,
    handleOpen,
  } = useOpenCloseActionsWithState();

  const skipQuery = useCallback(
    ({ search_value }: RecordType<string>) => (search_value?.length || 0) < 3,
    []
  );

  const handleMainFieldsChangeAndResetFrom: onChangeEvent = useCallback(
    (event) => {
      const { name, value } = event;
      handleChangeInternalMultipleInputs({
        [name]: value,
        patientsDataList: [],
        ...(name === "search_value" ? { search_type } : { search_value: "" }),
      });
      onChangeSearchFields?.(event);
    },
    [onChangeSearchFields, handleChangeInternalMultipleInputs]
  );

  const createPatientStatusEvent = useCallback(
    (endDate: string, status: string) => {
      const isDefaultInActive = status === "A";
      const isCurrentDateGreaterThanEndDate = checkIfThisDateGreaterThanOther(
        new Date(),
        endDate
      );

      const isActive = !isCurrentDateGreaterThanEndDate && isDefaultInActive;

      if (!isActive) {
        addNotification({
          type: "warning",
          message: "patnotactve",
        });
      }

      return {
        isCurrentPatientActive: isActive,
      };
    },
    [addNotification]
  );

  const handlePatientsResponse: OnResponseActionType<
    RecordType<PatientItemRecordType[]>
  > = useCallback(
    ({ apiValues }) => {
      const data = apiValues.data || [];
      const length = data.length ?? 0;
      const isMultiPatients = length > 1;

      const [firstRecord] = data;

      handleInternalChange({
        name: "patientsDataList",
        value: isMultiPatients ? data : [],
      });

      if (isMultiPatients) {
        handleOpen();
      }

      const { end_date, status } = firstRecord || {};

      handleChangeMultipleInputs({
        currentPatientData: isMultiPatients
          ? initialPatientData
          : firstRecord || initialPatientData,
        ...(!isMultiPatients && !!length
          ? createPatientStatusEvent(end_date, status)
          : null),
      });
    },
    [
      handleChangeMultipleInputs,
      createPatientStatusEvent,
      handleOpen,
      handleInternalChange,
    ]
  );

  const { runQuery, loading: patientSearchLoading } = useBasicQuery<
    RecordType<PatientItemRecordType[]>
  >({
    apiId: "QUERY_MI_UCAF_PATIENT_DATA",
    disableParamsChangeCheck: true,
    skipQuery,
    onResponse: handlePatientsResponse,
    params: {
      search_type,
      search_value,
    },
  });

  const onSearchPatients = useCallback(() => runQuery(), [runQuery]);

  const onDoubleClickPatientRecord: TableBodyRowClickEvent<RecordTypeWithAnyValue> =
    useCallback(
      (currentRecord) => {
        const { end_date, status } = currentRecord;

        handleChangeMultipleInputs({
          currentPatientData: currentRecord,
          ...createPatientStatusEvent(end_date, status),
        });

        handleClose();
      },
      [createPatientStatusEvent, handleChangeMultipleInputs, handleClose]
    );

  const searchTypOptions = useMemo(() => {
    if (hidePhoneOption) {
      return SEARCH_RADIO_OPTIONS.filter(({ value }) => value !== "P");
    }
    return SEARCH_RADIO_OPTIONS;
  }, [hidePhoneOption]);

  const searchDisabled = (search_value?.length || 0) < 3;

  return (
    <>
      <Flex width="auto" padding="10px" bordered gap="10px" align="center">
        <Text margin="0">fndpat</Text>
        <SelectionCheckGroup
          options={searchTypOptions}
          name="search_type"
          value={search_type}
          onChange={handleMainFieldsChangeAndResetFrom}
          mode="radio"
          disabled={patientSearchLoading}
        />

        <InputField
          width="150px"
          value={search_value}
          name="search_value"
          onChange={handleMainFieldsChangeAndResetFrom}
          onPressEnter={onSearchPatients}
          disabled={patientSearchLoading}
          autoCapitalize
        />

        <Button
          label="srch"
          disabled={searchDisabled}
          onClick={onSearchPatients}
          type="primary"
          padding="0 5px"
          loading={patientSearchLoading}
        />
      </Flex>

      {selectionModalOpened && patientsDataList && (
        <Modal
          title="slctpat"
          width="90%"
          visible={selectionModalOpened}
          onClose={handleClose}
          maskClosable={false}
          noCancelButton
        >
          <ExsysTable
            dataSource={patientsDataList}
            rowKey="rowKey"
            noPagination
            hideTableHeaderTools
            columns={TABLE_COLUMNS}
            onDoubleClick={onDoubleClickPatientRecord}
            totalRecordsInDataBase={
              patientsDataList?.[0]?.total ?? patientsDataList?.length
            }
          />
        </Modal>
      )}
    </>
  );
};

export default memo(FindPatientForm);
export type { PatientItemRecordType };
