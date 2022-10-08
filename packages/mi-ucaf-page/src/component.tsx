/*
 *
 * `MiUcafPage`: `@exsys-patient-insurance/mi-ucaf-page`.
 *
 */
import { memo, useCallback } from "react";
import Flex from "@exsys-patient-insurance/flex";
import { PageTitle } from "@exsys-patient-insurance/text";
import FindPatientForm from "@exsys-patient-insurance/find-patient-form";
import useFormManager from "@exsys-patient-insurance/form-manager";
import ExsysTableWithApiQuery, {
  useCreateTableActionsFromRefToForm,
} from "@exsys-patient-insurance/exsys-table-with-api-query";
import Button from "@exsys-patient-insurance/button";
import { PatientHistoryWithApiQuery } from "@exsys-patient-insurance/patient-history-components";
import MiPreviewPatientData from "@exsys-patient-insurance/mi-preview-patient-data";
import Modal from "@exsys-patient-insurance/modal";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import {
  TableBodyRowClickEvent,
  onChangeEvent,
  RecordType,
  RecordTypeWithAnyValue,
  OnResponseActionType,
} from "@exsys-patient-insurance/types";
import { initialValues, BASE_DETAILS_COLUMN } from "./constants";
import { UcafPatientDataPropType } from "./index.interface";

// provider_name: "Ahmed Wahid Pharmacy"
// for new moda

const { currentPatientData: initialPatientData } = initialValues;

const MiUcafPage = () => {
  const {
    values: {
      search_type,
      search_value,
      patientsDataList,
      currentPatientData,
      selectionModalOpened,
      historyModalShown,
    },
    handleChange,
    handleChangeMultipleInputs,
    resetForm,
  } = useFormManager({
    initialValues,
  });

  const { fetchTableData, setTableData, tableValuesRef } =
    useCreateTableActionsFromRefToForm();

  const handleMainFieldsChangeAndResetFrom: onChangeEvent = useCallback(
    ({ name, value }) => {
      resetForm();
      handleChangeMultipleInputs({
        [name]: value,
        ...(name === "search_value" ? { search_type } : null),
      });
    },
    [handleChangeMultipleInputs, resetForm, search_type]
  );

  const closeSelectionModal = useCallback(
    () =>
      handleChange({
        name: "selectionModalOpened",
        value: false,
      }),
    [handleChange]
  );

  const toggleHistoryModal = useCallback(
    () =>
      handleChange({
        name: "historyModalShown",
        value: !historyModalShown,
      }),
    [handleChange, historyModalShown]
  );

  const onDoubleClickPatientRecord: TableBodyRowClickEvent<RecordTypeWithAnyValue> =
    useCallback(
      (currentRecord) => {
        handleChangeMultipleInputs({
          currentPatientData: currentRecord,
          selectionModalOpened: false,
        });

        const { patient_card_no } = currentRecord;

        if (patient_card_no) {
          fetchTableData({
            patient_card_no: patient_card_no,
          });
        }
      },
      [handleChangeMultipleInputs, fetchTableData]
    );

  const skipQuery = useCallback(
    ({ search_value }: RecordType<string>) => (search_value?.length || 0) < 3,
    []
  );

  const handlePatientsResponse: OnResponseActionType<
    RecordType<UcafPatientDataPropType[]>
  > = useCallback(
    ({ apiValues }) => {
      const data = apiValues.data || [];
      const length = data.length ?? 0;
      const isMultiPatients = length > 1;

      const [firstRecord] = data;

      handleChangeMultipleInputs({
        currentPatientData: isMultiPatients
          ? initialPatientData
          : firstRecord || initialPatientData,
        patientsDataList: isMultiPatients ? data : [],
        selectionModalOpened: isMultiPatients,
      });

      const { patient_card_no } = firstRecord || {};

      if (!isMultiPatients && patient_card_no) {
        fetchTableData({
          patient_card_no: patient_card_no,
        });
      }
    },
    [fetchTableData, handleChangeMultipleInputs]
  );

  const { runQuery: fetchUcafPatient, loading: patientDataLoading } =
    useBasicQuery<RecordType<UcafPatientDataPropType[]>>({
      apiId: "QUERY_MI_UCAF_PATIENT_DATA",
      disableParamsChangeCheck: true,
      onResponse: handlePatientsResponse,
      checkAllParamsValuesToQuery: true,
      skipQuery,
      params: {
        search_type,
        search_value,
      },
    });

  const onSearchPatients = useCallback(() => {
    setTableData([]);
    fetchUcafPatient();
  }, [fetchUcafPatient, setTableData]);

  const {
    patient_card_no,
    root_organization_no,
    patient_name,
    gender,
    age,
    patientImgUrl,
    status,
    nationality,
    phone_no,
    start_date,
    end_date,
    class: patient_class,
    plan,
    member_of,
    subsidiary,
    relationship,
    declaration_file_path,
    declaration_req,
    doctor_id,
  } = currentPatientData;

  const patientHistoryParams = {
    doctor_id,
    organization_no: root_organization_no,
    patientfileno: patient_card_no,
  };

  return (
    <>
      <PageTitle children="miucaf" padding="10px 0" margin="0" />

      <Flex width="100%" gap="15px" align="center" margin="0 0 10px 0">
        <FindPatientForm
          searchType={search_type}
          searchValue={search_value}
          onSearchPatients={onSearchPatients}
          handleChange={handleMainFieldsChangeAndResetFrom}
          selectionModalOpened={selectionModalOpened}
          closeSelectionModal={closeSelectionModal}
          patientsDataList={patientsDataList}
          onDoubleClickPatientRecord={onDoubleClickPatientRecord}
          patientSearchLoading={patientDataLoading}
        />

        <Button
          label="ptnthstry"
          type="primary"
          onClick={toggleHistoryModal}
          disabled={!patient_card_no}
        />
        <Button label="adnwrcrd" shape="round" type="primary" />
      </Flex>
      <MiPreviewPatientData
        patientCardNo={patient_card_no}
        patientName={patient_name}
        gender={gender}
        age={age}
        patientImgUrl={patientImgUrl}
        phone={phone_no}
        nationalId={nationality}
        status={status}
        start_date={start_date}
        end_date={end_date}
        class={patient_class}
        plan={plan}
        member_of={member_of}
        subsidiary={subsidiary}
        relationship={relationship}
        declaration_file_path={declaration_file_path}
        declaration_req={declaration_req}
      />

      <ExsysTableWithApiQuery
        // @ts-ignore we already know it takes a ref.
        ref={tableValuesRef}
        queryApiId="QUERY_MI_UCAF_PATIENTS_TABLE_DATA"
        noPagination
        height="250px"
        rowKey="ucaf_id"
        columns={BASE_DETAILS_COLUMN}
        actionIcon="details"
        onPressActionIcon={console.log}
        callOnFirstRender={false}
      />

      <Modal
        width="40%"
        bodyMaxHeight="95%"
        visible={historyModalShown}
        onClose={toggleHistoryModal}
        destroyOnClose
        title="ptnthstry"
        noFooter
      >
        <PatientHistoryWithApiQuery
          maxHeight="100%"
          apiParams={patientHistoryParams}
          skipQuery={!patient_card_no}
          apiId="QUERY_MI_PROVIDERS_APPROVAL_PATIENT_HISTORY"
        />
      </Modal>
    </>
  );
};

export default memo(MiUcafPage);
