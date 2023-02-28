/*
 *
 * Package: `@exsys-patient-insurance/ucaf-list-page`.
 *
 */
import { memo, useCallback, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import SelectionCheckGroup from "@exsys-patient-insurance/selection-check-group";
import SelectionCheck from "@exsys-patient-insurance/selection-check";
import Flex from "@exsys-patient-insurance/flex";
import useFormManager from "@exsys-patient-insurance/form-manager";
import LabeledViewLikeInput from "@exsys-patient-insurance/labeled-view-like-input";
import InputField from "@exsys-patient-insurance/input-field";
import InputNumber from "@exsys-patient-insurance/input-number";
import SelectWithApiQuery, {
  SelectWithApiQueryRefValuesType,
} from "@exsys-patient-insurance/select-with-api-query";
import FindPatientForm from "@exsys-patient-insurance/find-patient-form";
import FilesGalleryWithModalCarousel from "@exsys-patient-insurance/files-gallery-with-modal-carousel";
import MiPreviewPatientData from "@exsys-patient-insurance/mi-preview-patient-data";
import { PatientHistoryWithApiQuery } from "@exsys-patient-insurance/patient-history-components";
import Modal from "@exsys-patient-insurance/modal";
import {
  useOpenCloseActionsWithState,
  useCurrentPagePrivileges,
} from "@exsys-patient-insurance/hooks";
import DetailIcon from "@exsys-patient-insurance/details-icon";
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
import { colors } from "@exsys-patient-insurance/theme-values";
import { PdfDocumentModal } from "@exsys-patient-insurance/document-modal";
import {
  TableBodyRowClickEvent,
  TableSelectionChangeActionType,
  onChangeEvent,
  SelectChangeHandlerType,
  TableRowClassNameType,
  RecordTypeWithAnyValue,
} from "@exsys-patient-insurance/types";
import EditOrCreateRequest from "./partials/EditOrCreateRequest";
import useSaveServiceRequest from "./hooks/useSaveServiceRequest";
import useRequestUcafBySerialNo from "./hooks/useRequestUcafBySerialNo";
import useAttachmentsHandlers from "./hooks/useAttachmentsHandlers";
import useLinkServices from "./hooks/useLinkServices";
import useLoadDefaultServices from "./hooks/useLoadDefaultServices";
import MoreDetailsModal from "./partials/MoreDetailsModal";
import ChangeMedicationModal from "./partials/ChangeMedicationModal";
import DeliverForm from "./partials/DeliverForm";
import {
  initialValues,
  REQUESTS_TABLE_COLUMNS,
  UCAF_TYPES_RADIO_OPTIONS,
  CLAIM_TYPES_RADIO_OPTIONS,
  doctorsProviderListParams,
} from "./constants";
import { RequestTableRecordType } from "./index.interface";

const { IMAGES_AND_FILES } = UPLOAD_ACCEPTED_EXTENSIONS;

const { red } = colors;

const UcafListPage = () => {
  const { isDoctorUser, isPharmacyUser } = useCurrentUserType();

  const globalProviderNo = useGlobalProviderNo();
  const { addNotification } = useAppConfigStore();
  const serialNoListRef = useRef<SelectWithApiQueryRefValuesType>();

  const {
    f_insert,
    f_delete,
    // f_update
  } = useCurrentPagePrivileges({
    useFullPathName: true,
  });
  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();
  const {
    visible: changeMedicationModalVisible,
    handleClose: closeChangeMedicationModalVisible,
    handleOpen: openChangeMedicationModalVisible,
  } = useOpenCloseActionsWithState();
  const { pageType } = useParams();

  const {
    visible: moreDetailsModalShown,
    handleClose: closeMoreDetailsModal,
    handleOpen: openMoreDetailsModal,
  } = useOpenCloseActionsWithState();

  const { values, handleChange, handleChangeMultipleInputs, resetForm } =
    useFormManager({
      initialValues,
    });

  const {
    currentPatientData,
    paper_serial,
    isCurrentPatientActive,
    editionModalType,
    selectedTableRecord,
    tableSelectionRows,
    attachments,
    historyModalShown,
    requestsData: {
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
        written_by_doctor,
        admission_date,
        discharge_date,
      },
      isNewConsultation,
      hasPatientExceededLimits,
      data: requestTableDataSource,
    },
  } = values;

  const isProviderView = pageType === "P";
  const isDoctorView = pageType === "D";
  const isChronic = claim_flag === "C" ? "Y" : "N";
  const canInsert = f_insert !== "N";
  const canDelete = f_delete !== "N";
  const isInPatientUcafType = ucafe_type === "I";
  const { selectedKeys, selectedRows } = tableSelectionRows;

  const dispenseItemsRows = useMemo(
    () =>
      selectedRows?.filter(
        ({ approval_reply, status, is_system_approved }) =>
          status !== "F" &&
          // canDeliverRequest === "Y" &&
          (approval_reply === "A" || is_system_approved === "Y")
      ),
    [selectedRows]
  );

  const postItemsRows = useMemo(
    () => selectedRows?.filter(({ status }) => status === "F"),
    [selectedRows]
  );

  const hasSomeDeliveredItems = useMemo(
    () =>
      requestTableDataSource?.some(
        ({ last_delivery_date }) => !!last_delivery_date
      ),
    [requestTableDataSource]
  );

  const linkItemsRows = useMemo(() => {
    if (isDoctorView) {
      return undefined;
    }

    return selectedRows?.filter(
      ({ approval_reply, provider_no, status, is_system_approved }) =>
        !["F", "P"].includes(status) &&
        !provider_no &&
        (!approval_reply || is_system_approved === "Y")
    );
  }, [isDoctorView, selectedRows]);

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

  const fetchSerialNoList = useCallback(
    () => serialNoListRef.current?.runQuery?.(),
    [serialNoListRef]
  );

  const { fetchUcafRequests, requestsLoading } = useRequestUcafBySerialNo({
    handleChange,
    root_organization_no,
    patient_card_no: foundPatientCardNo,
    paper_serial,
  });

  const {
    attachmentsLoading,
    handleAddAttachment,
    onDeleteAttachment,
    uploading,
    isSavingAttachment,
  } = useAttachmentsHandlers({
    handleChange,
    root_organization_no,
    patient_card_no: foundPatientCardNo,
    ucaf_id,
  });

  const onSearchRequests = useCallback(() => {
    handleChangeMultipleInputs({
      tableSelectionRows: initialValues.tableSelectionRows,
      selectedTableRecord: initialValues.selectedTableRecord,
    });
    fetchUcafRequests();
  }, [fetchUcafRequests, handleChange]);

  const { isLinkingServices, makeLinkServicesRequest } = useLinkServices({
    root_organization_no,
    ucaf_id,
    patient_card_no: foundPatientCardNo,
    paper_serial,
    ucafe_date,
    provider_notes,
    insurance_company_no,
    onSuccess: onSearchRequests,
  });

  const handleLinkServices = useCallback(() => {
    if (linkItemsRows?.length) {
      makeLinkServicesRequest(linkItemsRows);
    }
  }, [makeLinkServicesRequest, linkItemsRows]);

  const setEditionModalState = useCallback(
    (value?: string) => () =>
      handleChangeMultipleInputs({
        editionModalType: value,
        ...(value === "n"
          ? {
              selectedTableRecord: initialValues.selectedTableRecord,
            }
          : null),
      }),
    [handleChange]
  );

  const onAfterSaveRequest = useCallback(() => {
    if (editionModalType) {
      setEditionModalState("")();
    }
    if (moreDetailsModalShown) {
      closeMoreDetailsModal();
    }
    onSearchRequests();
    fetchSerialNoList();
  }, [
    onSearchRequests,
    setEditionModalState,
    moreDetailsModalShown,
    closeMoreDetailsModal,
    fetchSerialNoList,
  ]);

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
    useSaveServiceRequest({
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
      onSuccess: onAfterSaveRequest,
    });

  const shouldLoadDefaultConsultation =
    isCurrentPatientActive &&
    isNewConsultation &&
    !hasPatientExceededLimits &&
    canInsert &&
    ucafe_type === "O" &&
    !!primary_diagnosis &&
    !!complain &&
    !!signs &&
    agreed === "Y" &&
    !reviwed_date;

  const { defaultServicesLoading } = useLoadDefaultServices({
    root_organization_no,
    patient_card_no: foundPatientCardNo,
    ucaf_date: ucafe_date,
    ucafe_type,
    claim_flag,
    doctorProviderNo: doctor_provider_no,
    shouldLoadDefaultConsultation,
    handleSaveServiceRequest,
  });

  const handlePostServices = useCallback(async () => {
    const length = postItemsRows?.length ?? 0;
    if (length) {
      const configPromises = postItemsRows.map(
        ({ is_system_approved, ...item }, index) =>
          handleSaveServiceRequest(
            {
              ...item,
              record_status: "u",
              is_system_approved,
              forcedStatus: is_system_approved === "Y" ? "P" : "O",
            },
            index === length - 1
          )
      );

      await Promise.all(configPromises);
    }
  }, [handleSaveServiceRequest, postItemsRows]);

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

  const onTableDoubleClick: TableBodyRowClickEvent<RequestTableRecordType> =
    useCallback(
      (selectedTableRecord) => {
        const { approval_reply } = selectedTableRecord;
        handleChange({
          name: "selectedTableRecord",
          value: selectedTableRecord,
        });
        if (approval_reply === "N") {
          openMoreDetailsModal();
        }
      },
      [handleChange, openMoreDetailsModal]
    );

  const canDeleteOrEdit = useCallback(
    (status: string, approvalReplay: string, provider_no?: number) => {
      const isDraft = status === "F";
      if (isDraft) {
        return true;
      }
      const isOpen = status === "O";
      const isValidApproval = !["R", "A", "N"].includes(approvalReplay);
      const hasNoProviderOrSameAsLogin =
        !provider_no || provider_no === globalProviderNo;
      return isOpen && isValidApproval && hasNoProviderOrSameAsLogin;
    },
    [globalProviderNo]
  );

  const handleUpdateRecord = useCallback(() => {
    const { status, approval_reply, provider_no } = selectedTableRecord;

    if (!canDeleteOrEdit(status, approval_reply, provider_no)) {
      addNotification({
        type: "error",
        message: "cantupdateslctedrecord",
      });
      return;
    }

    setEditionModalState("u")();
  }, [canDeleteOrEdit, setEditionModalState]);

  const onDeleteTableRecord = useCallback(async () => {
    const { ucaf_dtl_pk, status, approval_reply, provider_no } =
      selectedTableRecord;

    if (!canDeleteOrEdit(status, approval_reply, provider_no)) {
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

    await handleSaveServiceRequest(
      {
        ...selectedTableRecord,
        record_status: "d",
      },
      true
    );
  }, [handleSaveServiceRequest, addNotification, canDeleteOrEdit]);

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
      const isSerialNoInput = name === "paper_serial";

      resetForm();
      handleChangeMultipleInputs({
        [name]: value,
        ...(isSerialNoInput
          ? {
              currentPatientData,
              isCurrentPatientActive,
            }
          : null),
      });

      if (isSerialNoInput) {
        fetchUcafRequests({ paper_serial: value });
      }
    },
    [
      resetForm,
      handleChangeMultipleInputs,
      currentPatientData,
      isCurrentPatientActive,
    ]
  );

  const disabledRowsSelection = useCallback(
    ({ approval_reply }: RequestTableRecordType) => approval_reply === "R",
    []
  );

  const tableColumns = useMemo(() => {
    let baseColumns = REQUESTS_TABLE_COLUMNS;

    if (isPharmacyUser) {
      baseColumns = [
        ...baseColumns,
        {
          title: "action",
          dataIndex: "specialty_type",
          // @ts-ignore
          render: (
            specialty_type: string,
            { status, last_delivery_date }: RequestTableRecordType
          ) => {
            const isMeds = specialty_type === "MED";
            const isNotDeliveredAndPosted =
              status === "P" && !last_delivery_date;

            return isMeds &&
              (["O", "F"].includes(status) || isNotDeliveredAndPosted) ? (
              <Flex width="100%" justify="center">
                <DetailIcon
                  width="1.8em"
                  height="1.7em"
                  onClick={openChangeMedicationModalVisible}
                />
              </Flex>
            ) : null;
          },
          totalCellProps: {
            isFragment: true,
          },
        },
      ];
    }

    return baseColumns;
  }, [openChangeMedicationModalVisible]);

  const tableRowClassName: TableRowClassNameType<RequestTableRecordType> =
    useCallback(
      ({ original_price, original_service_code, new_request_price }) => {
        return !!(new_request_price || original_service_code || original_price)
          ? "red"
          : "";
      },
      []
    );

  const searchRequestsDisabled =
    !isCurrentPatientActive ||
    !root_organization_no ||
    !foundPatientCardNo ||
    !globalProviderNo;

  const requestDataLength = requestTableDataSource?.length ?? 0;

  const isDataWrittenByDoctor = written_by_doctor === "Y";
  const isDataWrittenByDoctorAndProviderView =
    isDataWrittenByDoctor && isProviderView;

  const hideTableHeaderTools =
    hasPatientExceededLimits ||
    defaultServicesLoading ||
    !foundPatientCardNo ||
    !doctor_department_id ||
    !paper_serial ||
    agreed !== "Y" ||
    (isInPatientUcafType ? hasSomeDeliveredItems : !!reviwed_date);

  const canUserInsert =
    !primary_diagnosis || isDataWrittenByDoctorAndProviderView
      ? false
      : canInsert;

  const canUserDelete = isDataWrittenByDoctorAndProviderView
    ? false
    : canDelete;

  const canNotUserInsert = f_insert === "N";
  const areFieldsDisabled =
    hasPatientExceededLimits || !!reviwed_date || canNotUserInsert;

  const areBaseFieldsDisabled =
    defaultServicesLoading ||
    !doctor_provider_no ||
    !doctor_department_id ||
    !foundPatientCardNo ||
    !paper_serial;

  const baseIsEditableFieldsDisabled =
    isDataWrittenByDoctorAndProviderView ||
    hasPatientExceededLimits ||
    areBaseFieldsDisabled;

  const isEditableFieldsDisabled =
    areFieldsDisabled || baseIsEditableFieldsDisabled;

  const canNotInsertAttachment =
    uploading ||
    isSavingAttachment ||
    attachmentsLoading ||
    canNotUserInsert ||
    areBaseFieldsDisabled;

  const patientHistoryParams = {
    organization_no: root_organization_no,
    patientfileno: foundPatientCardNo,
  };

  const reportData = useMemo(() => {
    let params = {
      P_UCAF_ID: ucaf_id,
      P_ORGANIZATION_NO: root_organization_no,
    } as RecordTypeWithAnyValue;

    if (!isDoctorUser) {
      params.P_PROVIDER_NO = globalProviderNo;
    }

    return params;
  }, [isDoctorUser, ucaf_id, globalProviderNo, root_organization_no]);

  const dispenseItemsRowsLength = dispenseItemsRows?.length ?? 0;
  const linkItemsRowsLength = linkItemsRows?.length ?? 0;
  const postItemsRowsLength = postItemsRows?.length ?? 0;
  const hasDepartmentId = !!doctor_department_id;

  return (
    <>
      <Flex width="100%" gap="10px" bordered padding="10px 12px" align="center">
        <FindPatientForm
          onChangeSearchFields={handleMainFieldsChangeAndResetFrom}
          handleChangeMultipleInputs={handleChangeMultipleInputs}
        />

        <SelectWithApiQuery
          ref={serialNoListRef}
          queryType="query"
          apiOrCodeId="QUERY_UCAF_SERIAL_LIST"
          width="100px"
          value={paper_serial}
          name="paper_serial"
          label="serial"
          disabled={searchRequestsDisabled}
          onPressEnter={handleMainFieldsChangeAndResetFrom}
          onChange={handleMainFieldsChangeAndResetFrom}
          checkAllParamsValuesToQuery
          apiParams={{
            patient_card_no: foundPatientCardNo,
            provider_no: globalProviderNo,
          }}
        />
        <Button
          label="srchucafreqs"
          onClick={onSearchRequests}
          type="primary"
          padding="0 5px"
          loading={requestsLoading}
          disabled={!paper_serial || searchRequestsDisabled}
        />

        <SelectWithApiQuery
          label="docprvdrnam"
          value={doctor_provider_no}
          width="280px"
          apiOrCodeId="QUERY_PROVIDER_NAMES_LIST"
          queryType="query"
          name="requestsData.details.doctor_provider_no"
          onChange={handleChangeDoctorDepartmentOrProviderNo}
          allowClear={false}
          apiParams={doctorsProviderListParams}
          disabled={
            isDoctorUser ||
            !doctor_provider_no ||
            !foundPatientCardNo ||
            !paper_serial
          }
        />
        <SelectWithApiQuery
          label="spec"
          value={doctor_department_id}
          width="200px"
          apiOrCodeId="QUERY_MI_DEPARTMENTS_LIST"
          queryType="query"
          name="requestsData.details.doctor_department_id"
          onChange={handleChangeDoctorDepartmentOrProviderNo}
          allowClear={false}
          disabled={
            (isDoctorUser && hasDepartmentId) ||
            (!!doctor_provider_no && hasDepartmentId) ||
            !foundPatientCardNo ||
            !paper_serial
          }
        />

        {isDoctorUser && (
          <Button
            label="ptnthstry"
            type="primary"
            onClick={toggleHistoryModal}
            disabled={!foundPatientCardNo}
            padding="0 5px"
          />
        )}

        {!!doctor_provider_no && !!doctor_department_id && (
          <PdfDocumentModal
            usePrintIcon
            documentName="MIUCAF"
            reportData={reportData}
          />
        )}
      </Flex>

      <Flex
        width="100%"
        gap="10px"
        bordered
        padding="10px 8px"
        margin="12px 0"
        wrap="true"
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
            ellipsis="true"
            onClick={isEditableFieldsDisabled ? undefined : handleOpen}
            borderColor={
              !isEditableFieldsDisabled && !primary_diagnosis ? red : undefined
            }
          />

          <SelectionCheckGroup
            options={UCAF_TYPES_RADIO_OPTIONS}
            label="ucaftype"
            labelType="inlined"
            name="requestsData.details.ucafe_type"
            value={ucafe_type}
            onChange={handleChangeUcafType}
            disabled={isEditableFieldsDisabled}
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
            disabled={isEditableFieldsDisabled}
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
                disabled={isEditableFieldsDisabled}
                useRedBorderWhenError
                error={!isEditableFieldsDisabled && !expected_days ? " " : ""}
              />

              <InputNumber
                name="requestsData.details.expected_amount"
                width="70px"
                label="amnt"
                value={expected_amount}
                min={1}
                onChange={handleChange}
                disabled={isEditableFieldsDisabled}
                useRedBorderWhenError
                error={!isEditableFieldsDisabled && !expected_amount ? " " : ""}
              />
            </>
          )}

          <InputField
            name="requestsData.details.provider_notes"
            value={provider_notes}
            disabled={isEditableFieldsDisabled}
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
              disabled={isEditableFieldsDisabled}
            />

            <SelectionCheck
              name="requestsData.details.agreed"
              label="weagreflowcntrctmedclnots"
              checked={agreed}
              disabled={isEditableFieldsDisabled}
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

          <LabeledViewLikeInput
            width="100%"
            value={ucafe_date}
            label="ucafdate"
          />

          <FileUploadInputField
            dashed
            width="100%"
            height="60px"
            onChange={handleAddAttachment}
            messageLabelId="attachmnt"
            name="fileUrl"
            accept={IMAGES_AND_FILES}
            disabled={canNotInsertAttachment}
          />
        </Flex>

        <Flex width="58%" wrap="true" gap="10px">
          <MiPreviewPatientData
            width="100%"
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
            limitsShown={false}
          />

          {isInPatientUcafType && (
            <>
              <LabeledViewLikeInput
                width="20%"
                value={admission_date}
                label="admtiondate"
                fontWeight="bold"
                fontSize="ff6"
                justify="center"
              />

              <LabeledViewLikeInput
                width="20%"
                value={discharge_date}
                label="dischdate"
                fontWeight="bold"
                fontSize="ff6"
                justify="center"
              />
            </>
          )}
        </Flex>

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
          onDeleteFile={
            !!reviwed_date || isDataWrittenByDoctorAndProviderView
              ? undefined
              : onDeleteAttachment
          }
        />
      </Flex>

      {!!(
        linkItemsRowsLength ||
        dispenseItemsRowsLength ||
        postItemsRowsLength
      ) && (
        <Flex width="100%" margin="0 0 12px" gap="10px">
          {!!postItemsRowsLength && (
            <Button
              type="primary"
              loading={isSavingRequest}
              disabled={isSavingRequest}
              onClick={handlePostServices}
              label="sndtotpa"
            />
          )}

          {!!dispenseItemsRowsLength && (
            <DeliverForm
              isInPatientUcafType={isInPatientUcafType}
              rootOrganizationNo={root_organization_no}
              ucafId={ucaf_id}
              foundPatientCardNo={foundPatientCardNo}
              paperSerial={paper_serial}
              isChronic={isChronic}
              ucafeDate={ucafe_date}
              onSearchRequests={onSearchRequests}
              dispenseItemsRows={dispenseItemsRows}
            />
          )}

          {!!linkItemsRowsLength && (
            <Button
              type="primary"
              loading={isLinkingServices}
              onClick={handleLinkServices}
              label="reqaprov"
              disabled={isLinkingServices}
            />
          )}
        </Flex>
      )}

      <Table
        dataSource={requestTableDataSource}
        rowKey="ucaf_dtl_pk"
        totalRecordsInDataBase={requestDataLength}
        hideTableHeaderTools={hideTableHeaderTools}
        noPagination
        columns={tableColumns}
        height="320px"
        canDelete={canUserDelete}
        canInsert={canUserInsert}
        // canEdit={f_update !== "N"}
        canEdit={!isPharmacyUser}
        onPressAdd={setEditionModalState("n")}
        onPressSaveOrEdit={handleUpdateRecord}
        onSelectRow={onSelectTableRow}
        onPressDelete={onDeleteTableRecord}
        loading={requestsLoading || defaultServicesLoading || isSavingRequest}
        selectionKeys={selectedKeys}
        onSelectionChanged={onSelectionChanged}
        disabledRowsSelection={disabledRowsSelection}
        onDoubleClick={onTableDoubleClick}
        useAlignedTotalCells
        rowClassName={tableRowClassName}
      />

      {!isEditableFieldsDisabled && (
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
          servicesDataLength={requestDataLength}
          recordStatus={editionModalType}
          closeEditionModal={setEditionModalState("")}
          selectedRecord={selectedTableRecord}
          handleSaveServiceRequest={handleSaveServiceRequest}
          isSavingCurrentRequest={isSavingRequest}
        />
      )}

      {moreDetailsModalShown && (
        <MoreDetailsModal
          visible={moreDetailsModalShown}
          onClose={closeMoreDetailsModal}
          selectedRecord={selectedTableRecord}
          handleSaveServiceRequest={handleSaveServiceRequest}
          isSavingRequest={isSavingRequest}
        />
      )}

      {historyModalShown && (
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
      )}

      {changeMedicationModalVisible && (
        <ChangeMedicationModal
          rootOrganizationNo={root_organization_no}
          patientCardNo={foundPatientCardNo}
          ucafDate={ucafe_date}
          claimFlag={claim_flag}
          ucafType={ucafe_type}
          selectedRecord={selectedTableRecord}
          changeMedicationModalVisible={changeMedicationModalVisible}
          closeChangeMedicationModalVisible={closeChangeMedicationModalVisible}
          isSavingRequest={isSavingRequest}
          handleSaveServiceRequest={handleSaveServiceRequest}
        />
      )}
    </>
  );
};

export default memo(UcafListPage);
