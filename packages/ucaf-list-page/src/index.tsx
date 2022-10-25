/*
 *
 * Package: `@exsys-patient-insurance/ucaf-list-page`.
 *
 */
import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import SelectionCheckGroup from "@exsys-patient-insurance/selection-check-group";
import SelectionCheck from "@exsys-patient-insurance/selection-check";
import Flex from "@exsys-patient-insurance/flex";
import useFormManager from "@exsys-patient-insurance/form-manager";
import LabeledViewLikeInput from "@exsys-patient-insurance/labeled-view-like-input";
import InputField from "@exsys-patient-insurance/input-field";
import InputNumber from "@exsys-patient-insurance/input-number";
import SelectWithApiQuery from "@exsys-patient-insurance/select-with-api-query";
import FindPatientForm from "@exsys-patient-insurance/find-patient-form";
import FilesGalleryWithModalCarousel from "@exsys-patient-insurance/files-gallery-with-modal-carousel";
import MiPreviewPatientData from "@exsys-patient-insurance/mi-preview-patient-data";
import { PatientHistoryWithApiQuery } from "@exsys-patient-insurance/patient-history-components";
import Modal from "@exsys-patient-insurance/modal";
import {
  useBasicQuery,
  useUploadFilesMutation,
  useBasicMutation,
} from "@exsys-patient-insurance/network-hooks";
import {
  checkIfThisDateGreaterThanOther,
  normalizeNativeInputFile,
} from "@exsys-patient-insurance/helpers";
import {
  useOpenCloseActionsWithState,
  useCurrentPagePrivileges,
} from "@exsys-patient-insurance/hooks";
import {
  useGlobalProviderNo,
  useAppConfigStore,
  useCurrentUserType,
} from "@exsys-patient-insurance/app-config-store";
import Button from "@exsys-patient-insurance/button";
import Table from "@exsys-patient-insurance/exsys-table";
import Image from "@exsys-patient-insurance/image";
import FileUploadInputField from "@exsys-patient-insurance/file-upload-input-field";
import DiagnosisModal, {
  OnSelectDiagnosisType,
} from "@exsys-patient-insurance/diagnosis-modal";
import { UPLOAD_ACCEPTED_EXTENSIONS } from "@exsys-patient-insurance/global-app-constants";
import {
  RecordType,
  OnResponseActionType,
  TableBodyRowClickEvent,
  TableSelectionChangeActionType,
  onChangeEvent,
  RecordTypeWithAnyValue,
  SelectChangeHandlerType,
} from "@exsys-patient-insurance/types";
import EditOrCreateRequest from "./partials/EditOrCreateRequest";
import useSaveServiceRequest from "./hooks/useSaveServiceRequest";
import useDeliverRequest from "./hooks/useDeliverRequest";
import {
  initialValues,
  REQUESTS_TABLE_COLUMNS,
  UCAF_TYPES_RADIO_OPTIONS,
  CLAIM_TYPES_RADIO_OPTIONS,
} from "./constants";
import {
  PatientItemRecordType,
  RequestsDataType,
  RequestTableRecordType,
  SaveAttachmentEventType,
} from "./index.interface";

const { IMAGES_AND_FILES } = UPLOAD_ACCEPTED_EXTENSIONS;

const { currentPatientData: initialPatientData } = initialValues;
const {
  requestsData: {
    details: {
      ucafe_type: defaultUcafType,
      claim_flag: defaultClaimType,
      ucafe_date: defaultUcafDate,
      stamped: defaultStamped,
      agreed: defaultAgreed,
      expected_days: defaultNoOfDays,
      expected_amount: defaultAmount,
    },
  },
} = initialValues;

const UcafListPage = () => {
  const { pageType } = useParams();
  const { isDoctorUser } = useCurrentUserType();
  const { values, handleChange, handleChangeMultipleInputs, resetForm } =
    useFormManager({
      initialValues,
    });

  const globalProviderNo = useGlobalProviderNo();
  const { addNotification } = useAppConfigStore();
  const { handleUploadOneFile, uploading } = useUploadFilesMutation();
  const { loading: isSavingAttachment, mutate: saveAttachment } =
    useBasicMutation({
      apiId: "POST_UCAF_ATTACHMENT",
    });

  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();

  const skipQuery = useCallback(
    ({ search_value }: RecordType<string>) => (search_value?.length || 0) < 3,
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
    tableSelectionRows,
    attachments,
    historyModalShown,
  } = values;

  const { selectedKeys, selectedRows } = tableSelectionRows;

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
    insurance_company_no,
    gender,
    status,
    declaration_file_path,
    declaration_req,
  } = currentPatientData;

  const {
    details: {
      doctor_department_id,
      doctor_provider_no,
      doctor_provider_name,
      complain,
      signs,
      primary_diagnosis,
      primary_diag_code,
      ucafe_type,
      claim_flag,
      ucafe_date,
      ucaf_id,
      provider_notes,
      reviwed_date,
      stamped,
      agreed,
      expected_days,
      expected_amount,
    },
    data: requestTableDataSource,
  } = requestsData;

  const isChronic = claim_flag === "C" ? "Y" : "N";

  const toggleHistoryModal = useCallback(
    () =>
      handleChange({
        name: "historyModalShown",
        value: !historyModalShown,
      }),
    [handleChange, historyModalShown]
  );

  const handleChangeDoctorDepartmentOrProviderNo: SelectChangeHandlerType =
    useCallback(
      ({ name, value, itemOptionData }) =>
        handleChangeMultipleInputs({
          [name]: value,
          [name.replace(/_no|_id/, "_name")]: itemOptionData?.value,
        }),
      [handleChangeMultipleInputs]
    );

  const setEditionModalState = useCallback(
    (value?: string) => () =>
      handleChange({
        name: "editionModalType",
        value,
      }),
    [handleChange]
  );

  const handleRequestsResponse: OnResponseActionType<RequestsDataType> =
    useCallback(
      ({ apiValues, error }) => {
        const { details } = apiValues || {};
        const { doctor_provider_no, doctor_department_id } = details || {};

        if (!doctor_provider_no || !doctor_department_id) {
          addNotification({
            type: "error",
            message: "invldsrialno",
          });
        }

        const data =
          error || !apiValues
            ? initialValues.requestsData
            : {
                ...apiValues,
                details: {
                  ...details,
                  ucafe_type: details.ucafe_type || defaultUcafType,
                  claim_flag: details.claim_flag || defaultClaimType,
                  ucafe_date: details.ucafe_date || defaultUcafDate,
                  stamped: details.stamped || defaultStamped,
                  agreed: details.agreed || defaultAgreed,
                  expected_days: details.expected_days || defaultNoOfDays,
                  expected_amount: details.expected_amount || defaultAmount,
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
        pageType,
      },
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

  const closeSelectionModal = useCallback(
    () =>
      handleChange({
        name: "selectionModalOpened",
        value: false,
      }),
    []
  );

  const onSearchRequests = useCallback(
    () => fetchUcafRequests(),
    [fetchUcafRequests]
  );

  const onAfterSaveRequest = useCallback(() => {
    if (editionModalType) {
      setEditionModalState("")();
    }
    onSearchRequests();
  }, [onSearchRequests, setEditionModalState]);

  const handleChangeUcafType: onChangeEvent = useCallback(
    ({ name, value }) =>
      handleChangeMultipleInputs({
        [name]: value,
        ...(value !== "I"
          ? {
              no_of_days: undefined,
            }
          : null),
      }),
    [handleChangeMultipleInputs]
  );

  const { loading: isSavingRequest, handleSaveServiceRequest } =
    useSaveServiceRequest(
      {
        root_organization_no,
        doctor_provider_no,
        doctor_provider_name,
        ucafe_date,
        ucafe_type,
        claim_flag,
        ucaf_id,
        doctor_department_id,
        complain,
        signs,
        primary_diag_code,
        primary_diagnosis,
        is_chronic: isChronic,
        patient_card_no: foundPatientCardNo,
        insurance_company_no,
        provider_notes,
        paper_serial,
        agreed,
        stamped,
        expected_amount,
        expected_days,
      },
      onAfterSaveRequest
    );

  const handleDeliverySuccess = useCallback(() => {
    handleChange({
      name: "tableSelectionRows",
      value: initialValues.tableSelectionRows,
    });

    onSearchRequests();
  }, [handleChange, onSearchRequests]);

  const { handleDeliverItem, loading: isDeliveringItem } = useDeliverRequest(
    {
      root_organization_no,
      ucaf_id,
      patient_card_no: foundPatientCardNo,
      paper_serial,
      is_chronic: isChronic,
    },
    handleDeliverySuccess
  );

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

  const onSelectTableRow: TableBodyRowClickEvent<RequestTableRecordType> =
    useCallback(
      (selectedTableRecord) =>
        handleChange({
          name: "selectedTableRecord",
          value: selectedTableRecord,
        }),
      [handleChange]
    );

  const canDeleteOrEdit = useCallback(
    (status: string, approvalReplay: string) =>
      status === "O" && !["R", "A"].includes(approvalReplay),
    []
  );

  const handleUpdateRecord = useCallback(() => {
    const { status, approval_reply } = selectedTableRecord;

    if (!canDeleteOrEdit(status, approval_reply)) {
      addNotification({
        type: "error",
        message: "cantupdateslctedrecord",
      });
      return;
    }

    setEditionModalState("u")();
  }, [canDeleteOrEdit, setEditionModalState]);

  const onDeleteTableRecord = useCallback(() => {
    const { ucaf_dtl_pk, status, approval_reply } = selectedTableRecord;

    if (!canDeleteOrEdit(status, approval_reply)) {
      addNotification({
        type: "error",
        message: "cantdeletslctedrecord",
      });

      return;
    }

    if (!ucaf_dtl_pk) {
      addNotification({
        type: "warning",
        message: "norecordslcted",
      });
      return;
    }

    handleSaveServiceRequest({
      record_status: "d",
      ...selectedTableRecord,
    });
  }, [handleSaveServiceRequest, addNotification, canDeleteOrEdit]);

  const onSaveRequestedProductsToDelivery = useCallback(() => {
    const filteredServices = selectedRows.filter(
      ({ approval_reply }) => approval_reply === "A"
    );
    const filteredServicesLength = filteredServices.length;

    if (filteredServicesLength < selectedRows.length) {
      addNotification({
        type: "warning",
        message: "cantdlvrallrequests",
        description: "somereqsnotaprovdyet",
      });
    }

    if (filteredServicesLength) {
      handleDeliverItem(filteredServices);
    }
  }, [addNotification, handleDeliverItem]);

  const onSelectionChanged: TableSelectionChangeActionType<RequestTableRecordType> =
    useCallback(
      (selectedKeys, selectedRows) => {
        handleChange({
          name: "tableSelectionRows",
          value: {
            selectedKeys,
            selectedRows,
          },
        });
      },
      [handleChange]
    );

  const handleMainFieldsChangeAndResetFrom: onChangeEvent = useCallback(
    ({ name, value }) => {
      resetForm();
      handleChangeMultipleInputs({
        [name]: value,
        ...(name === "search_value" ? { search_type } : null),
        ...(name === "paper_serial"
          ? {
              search_type,
              search_value,
              currentPatientData,
              patientsDataList,
              selectionModalOpened,
              isCurrentPatientActive,
            }
          : null),
      });
    },
    [
      resetForm,
      handleChangeMultipleInputs,
      search_type,
      search_value,
      currentPatientData,
      patientsDataList,
      selectionModalOpened,
      isCurrentPatientActive,
    ]
  );

  const disabledRowsSelection = useCallback(
    ({ approval_reply, canDeliverRequest }: RequestTableRecordType) =>
      canDeliverRequest !== "Y" || approval_reply !== "A",
    [reviwed_date]
  );

  const handleSaveAttachment = useCallback(
    async ({ imageType, imageID, onSuccess }: SaveAttachmentEventType) => {
      const isDelete = !!imageID;
      await saveAttachment({
        body: {
          root_organization_no,
          patient_card_no: foundPatientCardNo,
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
      foundPatientCardNo,
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

  const isInPatientUcafType = ucafe_type === "I";

  const searchRequestsDisabled =
    !isCurrentPatientActive ||
    !root_organization_no ||
    !foundPatientCardNo ||
    !globalProviderNo;

  const requestDataLength = requestTableDataSource?.length ?? 0;

  const tableActionsAllowed = !!(
    foundPatientCardNo &&
    doctor_department_id &&
    paper_serial
  );

  const { f_insert } = useCurrentPagePrivileges();
  const areFieldsDisabled = !!reviwed_date || f_insert === "N";

  const canRenderDiagnosisModal =
    !areFieldsDisabled && !!foundPatientCardNo && !!doctor_department_id;

  const isEditableFieldsDisabled =
    areFieldsDisabled || !foundPatientCardNo || !paper_serial;

  const patientHistoryParams = {
    organization_no: root_organization_no,
    patientfileno: foundPatientCardNo,
  };

  return (
    <>
      <Flex width="100%" gap="10px" bordered padding="10px 12px" align="center">
        <FindPatientForm
          searchType={search_type}
          searchValue={search_value}
          onSearchPatients={onSearchPatients}
          handleChange={handleMainFieldsChangeAndResetFrom}
          selectionModalOpened={selectionModalOpened}
          closeSelectionModal={closeSelectionModal}
          patientsDataList={patientsDataList}
          onDoubleClickPatientRecord={onDoubleClickPatientRecord}
          patientSearchLoading={patientSearchLoading}
        />

        <InputField
          width="120px"
          value={paper_serial}
          name="paper_serial"
          label="serial"
          onChange={handleMainFieldsChangeAndResetFrom}
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

        <SelectWithApiQuery
          label="docprvdrnam"
          value={doctor_provider_no}
          width="250px"
          apiOrCodeId="QUERY_PROVIDER_NAMES_LIST"
          queryType="query"
          name="requestsData.details.doctor_provider_no"
          onChange={handleChangeDoctorDepartmentOrProviderNo}
          allowClear={false}
          disabled={
            isDoctorUser ||
            !doctor_provider_no ||
            !foundPatientCardNo ||
            !paper_serial
          }
          apiParams={{
            doctor_only: "Y",
          }}
        />
        <SelectWithApiQuery
          label="spec"
          value={doctor_department_id}
          width="180px"
          apiOrCodeId="QUERY_INVOICE_DEPARTMENT_LIST"
          queryType="query"
          name="requestsData.details.doctor_department_id"
          onChange={handleChangeDoctorDepartmentOrProviderNo}
          allowClear={false}
          disabled={
            isDoctorUser ||
            !doctor_provider_no ||
            !foundPatientCardNo ||
            !paper_serial
          }
        />

        <Button
          label="ptnthstry"
          type="primary"
          onClick={toggleHistoryModal}
          disabled={!foundPatientCardNo}
        />
      </Flex>

      <Flex
        width="100%"
        gap="10px"
        bordered
        padding="10px 12px"
        margin="12px 0"
        wrap="true"
      >
        <Flex wrap="true" width="30%" gap="10px">
          <InputField
            width="48.5%"
            name="requestsData.details.complain"
            value={complain}
            disabled={isEditableFieldsDisabled || !doctor_provider_no}
            onChange={handleChange}
            label="cmplns"
          />
          <InputField
            name="requestsData.details.signs"
            value={signs}
            disabled={isEditableFieldsDisabled || !doctor_provider_no}
            onChange={handleChange}
            label="signs"
            width="48.5%"
          />
          <LabeledViewLikeInput
            label="dignos"
            width="100%"
            value={primary_diagnosis}
            ellipsis="true"
            onClick={
              !canRenderDiagnosisModal || isEditableFieldsDisabled
                ? undefined
                : handleOpen
            }
          />

          <SelectionCheckGroup
            options={UCAF_TYPES_RADIO_OPTIONS}
            label="ucaftype"
            labelType="inlined"
            name="requestsData.details.ucafe_type"
            value={ucafe_type}
            onChange={handleChangeUcafType}
            disabled={isEditableFieldsDisabled || !doctor_provider_no}
            width="100%"
            mode="radio"
          />
          <SelectionCheckGroup
            options={CLAIM_TYPES_RADIO_OPTIONS}
            label="clmtype"
            labelType="inlined"
            name="requestsData.details.claim_flag"
            value={claim_flag}
            onChange={handleChange}
            disabled={isEditableFieldsDisabled || !doctor_provider_no}
            width="100%"
            mode="radio"
          />

          {isInPatientUcafType && (
            <>
              <InputNumber
                name="requestsData.details.expected_days"
                width="70px"
                label="daysno"
                value={expected_days}
                min={1}
                onChange={handleChange}
                disabled={isEditableFieldsDisabled || !doctor_provider_no}
              />

              <InputNumber
                name="requestsData.details.expected_amount"
                width="70px"
                label="amnt"
                value={expected_amount}
                min={1}
                onChange={handleChange}
                disabled={isEditableFieldsDisabled || !doctor_provider_no}
              />
            </>
          )}

          <InputField
            name="requestsData.details.provider_notes"
            value={provider_notes}
            disabled={isEditableFieldsDisabled || !doctor_provider_no}
            onChange={handleChange}
            label="nots"
            width={isInPatientUcafType ? "calc(100% - 165px)" : "100%"}
          />

          <Flex width="100%" wrap="true" align="center" gap="10px">
            <SelectionCheck
              name="requestsData.details.stamped"
              label="stmpd"
              checked={stamped}
              onChange={handleChange}
              disabled={isEditableFieldsDisabled || !doctor_provider_no}
            />

            <SelectionCheck
              name="requestsData.details.agreed"
              label="weagreflowcntrctmedclnots"
              checked={agreed}
              disabled={isEditableFieldsDisabled || !doctor_provider_no}
              onChange={handleChange}
            />
          </Flex>
        </Flex>

        <Flex column="true" gap="5px">
          <Image
            src={organizationUrl}
            alt="organization"
            width="sp18"
            height="sp17"
          />

          <FileUploadInputField
            dashed
            width="100%"
            height="60px"
            onChange={handleAddAttachment}
            messageLabelId="attachmnt"
            name="fileUrl"
            accept={IMAGES_AND_FILES}
            disabled={
              uploading ||
              isSavingAttachment ||
              attachmentsLoading ||
              !isEditableFieldsDisabled
            }
          />
        </Flex>

        <MiPreviewPatientData
          width="60%"
          height="fit-content"
          patientCardNo={foundPatientCardNo}
          patientName={patient_name}
          age={age}
          phone={phone_no}
          nationalId={national_id}
          start_date={start_date}
          end_date={end_date}
          class={patientClass}
          relationship={relationship}
          plan={plan}
          subsidiary={subsidiary}
          member_of={member_of}
          patientImgUrl={patientImgUrl}
          gender={gender}
          status={status}
          declaration_file_path={declaration_file_path}
          declaration_req={declaration_req}
        />

        <FilesGalleryWithModalCarousel
          shouldMountChunk={!!attachments?.length}
          dataSource={attachments}
          itemKeyPropName="image_id"
          fileUrlKeyPropName="image"
          itemHeight="60px"
          itemWidth="120px"
          bordered={false}
          padding="0"
          margin="0px"
          onDeleteFile={onDeleteAttachment}
        />
      </Flex>
      {!!selectedKeys?.length && (
        <Flex width="100%" margin="0 0 12px">
          <Button
            type="primary"
            loading={isDeliveringItem}
            disabled={isDeliveringItem}
            onClick={onSaveRequestedProductsToDelivery}
            label="dlvr"
          />
        </Flex>
      )}

      <Table
        dataSource={requestTableDataSource}
        rowKey="ucaf_dtl_pk"
        totalRecordsInDataBase={requestDataLength}
        hideTableHeaderTools={
          agreed !== "Y" || !!reviwed_date || !tableActionsAllowed
        }
        noPagination
        columns={REQUESTS_TABLE_COLUMNS}
        height="320px"
        onPressAdd={setEditionModalState("n")}
        onPressSaveOrEdit={handleUpdateRecord}
        onSelectRow={onSelectTableRow}
        onPressDelete={onDeleteTableRecord}
        loading={requestsLoading || isSavingRequest || isDeliveringItem}
        selectionKeys={selectedKeys}
        onSelectionChanged={onSelectionChanged}
        disabledRowsSelection={disabledRowsSelection}
        useAlignedTotalCells
      />

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
          ucafType={ucafe_type}
          recordStatus={editionModalType}
          closeEditionModal={setEditionModalState("")}
          selectedRecord={selectedTableRecord}
          handleSaveServiceRequest={handleSaveServiceRequest}
          isSavingCurrentRequest={isSavingRequest}
        />
      )}

      <Modal
        width="40%"
        bodyMaxHeight="95%"
        visible={historyModalShown}
        onClose={toggleHistoryModal}
        destroyOnClose
        title="ptnthstry"
        noFooter
        maskClosable={false}
      >
        <PatientHistoryWithApiQuery
          maxHeight="100%"
          apiParams={patientHistoryParams}
          skipQuery={!foundPatientCardNo}
          apiId="QUERY_MI_PROVIDERS_APPROVAL_PATIENT_HISTORY"
        />
      </Modal>
    </>
  );
};

export default memo(UcafListPage);
