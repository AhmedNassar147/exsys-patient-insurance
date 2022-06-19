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
import { useModalRef } from "@exsys-patient-insurance/hooks";
import { useGlobalProviderNo } from "@exsys-patient-insurance/app-config-store";
import Button from "@exsys-patient-insurance/button";
import Modal from "@exsys-patient-insurance/modal";
import Table from "@exsys-patient-insurance/exsys-table";
import Image from "@exsys-patient-insurance/image";
import SelectWithApiQuery from "@exsys-patient-insurance/select-with-api-query";
import {
  RecordType,
  OnResponseActionType,
  TableBodyRowClickEvent,
} from "@exsys-patient-insurance/types";
import checkIfThisDateGreaterThanOther from "./helpers/checkIfThisDateGreaterThanOther";
import {
  initialValues,
  SEARCH_RADIO_OPTIONS,
  TABLE_COLUMNS,
  REQUESTS_TABLE_COLUMNS,
} from "./constants";
import { PatientItemRecordType, RequestsDataType } from "./index.interface";

const initialPatientData = initialValues.currentPatientData;

const FindPatientForm = () => {
  const { values, handleChange, handleChangeMultipleInputs } = useFormManager({
    initialValues,
  });

  const globalProviderNo = useGlobalProviderNo();
  const { modalRef, toggle } = useModalRef();

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
        toggle();
      }
    },
    [toggle, handleChange]
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
    status,
    subsidiary,
    age,
    organizationUrl,
    patientImgUrl,
    class: patientClass,
    member_of,
    root_organization_no,
  } = currentPatientData;

  const handleRequestsResponse: OnResponseActionType<RequestsDataType[]> =
    useCallback(
      ({ apiValues, error }) => {
        const data =
          error || !apiValues ? initialValues.requestsData : apiValues;

        handleChange({
          name: "requestsData",
          value: data,
        });
      },
      [handleChange]
    );

  const { runQuery: fetchUcafRequests, loading: requestsLoading } =
    useBasicQuery<RequestsDataType[]>({
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

  const searchDisabled = (search_value?.length || 0) < 4;
  const searchRequestsDisabled =
    !isCurrentPatientActive ||
    !root_organization_no ||
    !foundPatientCardNo ||
    !globalProviderNo;

  const {
    details: {
      doctor_provider_no,
      doctor_provider_name,
      complain,
      signs,
      is_chronic,
      primary_diagnosis,
      ucafe_type,
      claim_flag,
      attendance_type,
    },
    data: requestTableDataSource,
  } = requestsData;

  const requestDataLength = requestTableDataSource?.length ?? 0;

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
          label="docprvdrno"
          value={doctor_provider_no}
          width="120px"
        />
        <LabeledViewLikeInput
          label="docprvdrnam"
          value={doctor_provider_name}
          width="260px"
        />
      </Flex>

      <Flex
        width="100%"
        gap="10px"
        bordered
        padding="10px 12px"
        margin="12px 0"
      >
        <Flex wrap="true" width="32%" gap="10px">
          <InputField
            width="49%"
            name="requestsData.details.complain"
            value={complain}
            disabled={!!requestDataLength}
            onChange={handleChange}
            label="cmplns"
          />
          <InputField
            name="requestsData.details.signs"
            value={signs}
            disabled={!!requestDataLength}
            onChange={handleChange}
            label="signs"
            width="49%"
          />
          <InputField
            name="requestsData.details.primary_diagnosis"
            value={primary_diagnosis}
            disabled={!!requestDataLength}
            onChange={handleChange}
            label="dignos"
            width="49%"
          />
          <SelectWithApiQuery
            queryType="u_code"
            apiOrCodeId="ATTENDANCE_TYPES"
            value={attendance_type}
            name="requestsData.details.attendance_type"
            onChange={handleChange}
            width="49%"
            label="atndc"
          />
          <InputField
            name="requestsData.details.ucafe_type"
            value={ucafe_type}
            disabled={!!requestDataLength}
            onChange={handleChange}
            label="ucaftyp"
            width="20%"
          />
          <InputField
            name="requestsData.details.claim_flag"
            value={claim_flag}
            disabled={!!requestDataLength}
            onChange={handleChange}
            label="clmflg"
            width="20%"
          />
          <SelectionCheck
            name="requestsData.details.is_chronic"
            checked={is_chronic || "N"}
            disabled={!!requestDataLength}
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

        <Flex wrap="true" width="52%" gap="10px" height="90px">
          <LabeledViewLikeInput
            label="bnfcryid"
            value={national_id}
            width="120px"
          />
          <LabeledViewLikeInput
            label="bnfcry"
            value={`${patient_name || ""} (${age || ""})`}
            width="270px"
          />
          <LabeledViewLikeInput
            label="cardno"
            value={foundPatientCardNo}
            width="140px"
          />
          <LabeledViewLikeInput label="pln" value={plan} width="220px" />
          <LabeledViewLikeInput label="phn" value={phone_no} width="90px" />
          <LabeledViewLikeInput
            label="strtend"
            value={`${start_date || ""} ~ ${end_date || ""}`}
            width="135px"
            justify="center"
          />
          <LabeledViewLikeInput
            label="rltnship"
            value={relationship}
            width="90px"
          />
          <LabeledViewLikeInput
            label="subsdry"
            value={subsidiary}
            width="110px"
          />
          <LabeledViewLikeInput
            label="class"
            value={patientClass}
            width="80px"
          />
          <LabeledViewLikeInput
            label="membrof"
            value={member_of}
            width="100px"
          />
          <LabeledViewLikeInput label="" width="auto" bordered={false}>
            <SelectionCheck label="stts" checked={status === "A"} />
          </LabeledViewLikeInput>
        </Flex>

        <Image src={patientImgUrl} alt="patient" width="sp15" height="sp17" />
      </Flex>

      {!!requestDataLength && (
        <Table
          dataSource={requestTableDataSource}
          rowKey="ucaf_dtl_pk"
          totalRecordsInDataBase={requestDataLength}
          noPagination
          hideTableHeaderTools
          columns={REQUESTS_TABLE_COLUMNS}
          height="400px"
        />
      )}

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

      <Modal title="wrning" width="200px" noFooter ref={modalRef}>
        <Text>patnotactve</Text>
      </Modal>
    </>
  );
};

export default memo(FindPatientForm);
