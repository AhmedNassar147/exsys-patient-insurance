/*
 *
 * Package: `@exsys-patient-insurance/find-patient-form`.
 *
 */
import { memo, useCallback } from "react";
import SelectionCheckGroup from "@exsys-patient-insurance/selection-check-group";
import SelectionCheck from "@exsys-patient-insurance/selection-check";
import Flex from "@exsys-patient-insurance/flex";
import Text from "@exsys-patient-insurance/text";
import useFormManager from "@exsys-patient-insurance/form-manager";
import LabeledViewLikeInput from "@exsys-patient-insurance/labeled-view-like-input";
import InputField from "@exsys-patient-insurance/input-field";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import { checkIfThisDateGreaterThanOther } from "@exsys-patient-insurance/helpers";
import { useOpenCloseActionsWithState } from "@exsys-patient-insurance/hooks";
import {
  useGlobalProviderNo,
  useAppConfigStore,
} from "@exsys-patient-insurance/app-config-store";
import Button from "@exsys-patient-insurance/button";
import Modal from "@exsys-patient-insurance/modal";
import Table from "@exsys-patient-insurance/exsys-table";
import Image from "@exsys-patient-insurance/image";
import SelectWithApiQuery from "@exsys-patient-insurance/select-with-api-query";
import DiagnosisModal, {
  OnSelectDiagnosisType,
} from "@exsys-patient-insurance/diagnosis-modal";
import {
  RecordType,
  OnResponseActionType,
  TableBodyRowClickEvent,
} from "@exsys-patient-insurance/types";
import EditOrCreateRequest from "./partials/EditOrCreateRequest";
import {
  initialValues,
  SEARCH_RADIO_OPTIONS,
  TABLE_COLUMNS,
  REQUESTS_TABLE_COLUMNS,
  ATTENDANCE_LIST_PARAMS,
} from "./constants";
import {
  PatientItemRecordType,
  RequestsDataType,
  RequestTableRecordType,
} from "./index.interface";

const { currentPatientData: initialPatientData } = initialValues;
const {
  requestsData: {
    details: {
      attendance_type: defaultAttendence,
      ucafe_type: defaultUcafType,
      claim_flag: defaultClaimType,
      ucafe_date: defaultUcafDate,
    },
  },
} = initialValues;

// open and not (approved - rejected - delivered) can delete + can edit
// can deliver if  approved  (above table)

const FindPatientForm = () => {
  const { values, handleChange, handleChangeMultipleInputs } = useFormManager({
    initialValues,
  });

  const globalProviderNo = useGlobalProviderNo();
  const { addNotification } = useAppConfigStore();

  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();

  const skipQuery = useCallback(
    ({ search_value }: RecordType<string>) => (search_value?.length || 0) < 4,
    []
  );

  const {
    search_type,
    search_value,
    currentPatientData,
    patientsDataList,
    selectionModalOpened,
    paper_serial,
    isCurrentPatientActive,
    requestsData,
    editionModalType,
    selectedTableRecord,
  } = values;

  const setPatientStatus = useCallback(
    (endDate: string, status: string) => {
      const isDefaultInActive = status === "A";
      const isCurrentDateGreaterThanEndDate = checkIfThisDateGreaterThanOther(
        new Date(),
        endDate
      );

      const isActive = !isCurrentDateGreaterThanEndDate && isDefaultInActive;

      handleChange({
        name: "isCurrentPatientActive",
        value: isActive,
      });

      if (!isActive) {
        addNotification({
          type: "warning",
          message: "patnotactve",
        });
      }
    },
    [handleChange, addNotification]
  );

  const handlePatientsResponse: OnResponseActionType<
    RecordType<PatientItemRecordType[]>
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

      if (!isMultiPatients && !!length) {
        const { end_date, status } = firstRecord;
        setPatientStatus(end_date, status);
      }
    },
    [handleChangeMultipleInputs]
  );

  const { runQuery, loading: patientSearchLoading } = useBasicQuery<
    RecordType<PatientItemRecordType[]>
  >({
    apiId: "QUERY_PATIENT_DATA",
    disableParamsChangeCheck: true,
    skipQuery,
    onResponse: handlePatientsResponse,
    params: {
      search_type,
      search_value,
    },
  });

  const onSearchPatients = useCallback(() => {
    runQuery();
  }, []);

  const {
    national_id,
    patient_name,
    phone_no,
    plan,
    patient_card_no: foundPatientCardNo,
    start_date,
    end_date,
    relationship,
    subsidiary,
    age,
    organizationUrl,
    patientImgUrl,
    class: patientClass,
    member_of,
    root_organization_no,
  } = currentPatientData;

  const handleRequestsResponse: OnResponseActionType<RequestsDataType> =
    useCallback(
      ({ apiValues, error }) => {
        const { details } = apiValues || {};

        const data =
          error || !apiValues
            ? initialValues.requestsData
            : {
                ...apiValues,
                details: {
                  ...details,
                  attendance_type: details.attendance_type || defaultAttendence,
                  ucafe_type: details.ucafe_type || defaultUcafType,
                  claim_flag: details.claim_flag || defaultClaimType,
                  ucafe_date: details.ucafe_date || defaultUcafDate,
                },
              };

        handleChange({
          name: "requestsData",
          value: data,
        });
      },
      [handleChange]
    );

  const { runQuery: fetchUcafRequests, loading: requestsLoading } =
    useBasicQuery<RequestsDataType>({
      apiId: "QUERY_UCAF_REQUESTS_DATA",
      disableParamsChangeCheck: true,
      onResponse: handleRequestsResponse,
      checkAllParamsValuesToQuery: true,
      params: {
        root_organization_no,
        patient_card_no: foundPatientCardNo,
        paper_serial,
        provider_no: globalProviderNo,
      },
    });

  const closeSelectionModal = useCallback(
    () =>
      handleChange({
        name: "selectionModalOpened",
        value: false,
      }),
    []
  );

  const onSearchRequests = useCallback(() => {
    fetchUcafRequests();
  }, []);

  const onDoubleClickPatientRecord: TableBodyRowClickEvent<PatientItemRecordType> =
    useCallback(
      (currentRecord) => {
        handleChangeMultipleInputs({
          currentPatientData: currentRecord,
          selectionModalOpened: false,
        });

        const { end_date, status } = currentRecord;
        setPatientStatus(end_date, status);
      },
      [setPatientStatus, handleChangeMultipleInputs]
    );

  const onSelectDiagnosis: OnSelectDiagnosisType = useCallback(
    ({ diag_code, diage_name }) =>
      handleChangeMultipleInputs({
        "requestsData.details.primary_diag_code": diag_code,
        "requestsData.details.primary_diagnosis": diage_name,
      }),
    [handleChangeMultipleInputs]
  );

  const setEditionModalState = useCallback(
    (value?: string) => () => {
      handleChange({
        name: "editionModalType",
        value,
      });
    },
    [handleChange]
  );

  const onSelectTableRow: TableBodyRowClickEvent<RequestTableRecordType> =
    useCallback(
      (selectedTableRecord) =>
        handleChange({
          name: "selectedTableRecord",
          value: selectedTableRecord,
        }),
      [handleChange]
    );

  const searchDisabled = (search_value?.length || 0) < 4;
  const searchRequestsDisabled =
    !isCurrentPatientActive ||
    !root_organization_no ||
    !foundPatientCardNo ||
    !globalProviderNo;

  const {
    details: {
      doctor_department_name,
      doctor_provider_name,
      doctor_department_id,
      complain,
      signs,
      is_chronic,
      primary_diagnosis,
      // ucafe_type,
      claim_flag,
      ucafe_date,
      attendance_type,
      ucaf_id,
    },
    data: requestTableDataSource,
  } = requestsData;

  const requestDataLength = requestTableDataSource?.length ?? 0;

  const isEditableFieldsDisabled =
    !foundPatientCardNo || !paper_serial || !!ucaf_id;
  const canRenderDiagnosisModal =
    !!foundPatientCardNo && !!doctor_department_id && !ucaf_id;

  const tableActionsAllowed = !!(
    foundPatientCardNo &&
    doctor_department_id &&
    paper_serial
  );

  return (
    <>
      <Flex width="100%" gap="10px" bordered padding="10px 12px" align="center">
        <Text margin="0">fndpat</Text>
        <SelectionCheckGroup
          options={SEARCH_RADIO_OPTIONS}
          name="search_type"
          value={search_type}
          onChange={handleChange}
          mode="radio"
        />

        <InputField
          width="200px"
          value={search_value}
          name="search_value"
          onChange={handleChange}
          onPressEnter={onSearchPatients}
        />

        <Button
          label="srch"
          disabled={searchDisabled}
          onClick={onSearchPatients}
          type="primary"
          loading={patientSearchLoading}
        />

        <InputField
          width="120px"
          value={paper_serial}
          name="paper_serial"
          label="serial"
          onChange={handleChange}
          disabled={searchRequestsDisabled}
          onPressEnter={onSearchRequests}
        />

        <Button
          label="srchucafreqs"
          onClick={onSearchRequests}
          type="primary"
          loading={requestsLoading}
          disabled={
            !paper_serial || patientSearchLoading || searchRequestsDisabled
          }
        />

        <LabeledViewLikeInput
          label="docprvdrnam"
          value={doctor_provider_name}
          minWidth="200px"
          width="auto"
        />
        <LabeledViewLikeInput
          label="spec"
          value={doctor_department_name}
          minWidth="120px"
          width="auto"
        />
      </Flex>

      <Flex
        width="100%"
        gap="10px"
        bordered
        padding="10px 12px"
        margin="12px 0"
      >
        <Flex wrap="true" width="30%" gap="10px">
          <InputField
            width="48.5%"
            name="requestsData.details.complain"
            value={complain}
            disabled={isEditableFieldsDisabled}
            onChange={handleChange}
            label="cmplns"
          />
          <InputField
            name="requestsData.details.signs"
            value={signs}
            disabled={isEditableFieldsDisabled}
            onChange={handleChange}
            label="signs"
            width="48.5%"
          />
          <LabeledViewLikeInput
            label="dignos"
            width="100%"
            value={primary_diagnosis}
            onClick={
              !canRenderDiagnosisModal || isEditableFieldsDisabled
                ? undefined
                : handleOpen
            }
          />
          <SelectWithApiQuery
            queryType="u_code"
            apiOrCodeId="ATTENDANCE_TYPES"
            value={attendance_type}
            name="requestsData.details.attendance_type"
            onChange={handleChange}
            width="38%"
            label="atndc"
            disabled={isEditableFieldsDisabled}
            apiParams={ATTENDANCE_LIST_PARAMS}
            allowClear={false}
          />
          {/* <InputField
            name="requestsData.details.ucafe_type"
            value={ucafe_type}
            disabled={isEditableFieldsDisabled}
            onChange={handleChange}
            label="ucaftyp"
            width="20%"
          />
          <InputField
            name="requestsData.details.claim_flag"
            value={claim_flag}
            disabled={isEditableFieldsDisabled}
            onChange={handleChange}
            label="clmflg"
            width="20%"
          /> */}
          <SelectionCheck
            name="requestsData.details.is_chronic"
            checked={is_chronic || "N"}
            disabled={isEditableFieldsDisabled}
            onChange={handleChange}
            label="chrnc"
          />
        </Flex>

        <Image
          src={organizationUrl}
          alt="organization"
          width="sp18"
          height="sp17"
        />

        <Flex wrap="true" width="54%" gap="10px" height="90px">
          <LabeledViewLikeInput
            label="cardno"
            value={foundPatientCardNo}
            width="140px"
            ellipsis="true"
          />
          <LabeledViewLikeInput
            label="class"
            value={patientClass}
            width="80px"
            ellipsis="true"
          />
          <LabeledViewLikeInput
            label="bnfcryid"
            value={national_id}
            minWidth="100px"
            width="120px"
            ellipsis="true"
          />
          <LabeledViewLikeInput
            label="bnfcry"
            value={`${patient_name || ""} (${age || ""})`}
            width="270px"
            ellipsis="true"
          />
          <LabeledViewLikeInput
            label="phn"
            value={phone_no}
            minWidth="90px"
            width="auto"
          />
          <LabeledViewLikeInput label="pln" value={plan} width="220px" />
          <LabeledViewLikeInput
            label="strtend"
            value={`${start_date || ""} ~ ${end_date || ""}`}
            width="160px"
            ellipsis="true"
            justify="center"
          />
          <LabeledViewLikeInput
            label="rltnship"
            value={relationship}
            width="90px"
            ellipsis="true"
          />
          <LabeledViewLikeInput
            label="subsdry"
            value={subsidiary}
            width="110px"
            ellipsis="true"
          />
          <LabeledViewLikeInput
            label="membrof"
            value={member_of}
            width="220px"
          />
        </Flex>

        <Image src={patientImgUrl} alt="patient" width="sp15" height="sp17" />
      </Flex>

      <Table
        dataSource={requestTableDataSource}
        rowKey="ucaf_dtl_pk"
        totalRecordsInDataBase={requestDataLength}
        noPagination
        canInsert={tableActionsAllowed}
        canDelete={tableActionsAllowed}
        canEdit={tableActionsAllowed}
        withPdf={false}
        withExcel={false}
        withInfo={false}
        columns={REQUESTS_TABLE_COLUMNS}
        height="400px"
        onPressAdd={setEditionModalState("n")}
        onPressSaveOrEdit={setEditionModalState("u")}
        onSelectRow={onSelectTableRow}
      />

      <Modal
        title="slctpat"
        width="1100px"
        visible={selectionModalOpened}
        onClose={closeSelectionModal}
        maskClosable={false}
        noCancelButton
      >
        <Table
          dataSource={patientsDataList}
          rowKey="rowKey"
          totalRecordsInDataBase={patientsDataList?.length}
          noPagination
          hideTableHeaderTools
          columns={TABLE_COLUMNS}
          onDoubleClick={onDoubleClickPatientRecord}
        />
      </Modal>

      {canRenderDiagnosisModal && (
        <DiagnosisModal
          visible={visible}
          onClose={handleClose}
          departmentId={doctor_department_id}
          onSelectDiagnosis={onSelectDiagnosis}
        />
      )}

      {!!editionModalType && (
        <EditOrCreateRequest
          rootOrganizationNo={root_organization_no}
          patientCardNo={foundPatientCardNo}
          ucafDate={ucafe_date}
          claimFlag={claim_flag}
          attendanceType={attendance_type}
          recordStatus={editionModalType}
          closeEditionModal={setEditionModalState("")}
          selectedRecord={selectedTableRecord}
        />
      )}
    </>
  );
};

export default memo(FindPatientForm);
