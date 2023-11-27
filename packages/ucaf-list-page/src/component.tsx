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
import TextAreaField from "@exsys-patient-insurance/textarea-field";
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
import CloseIcon from "@exsys-patient-insurance/close-icon";
import {
  getCurrentUserType,
  checkIfThisDateGreaterThanOther,
  addAmountToDate,
} from "@exsys-patient-insurance/helpers";
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
import SelectWithAddActionAndQuery from "@exsys-patient-insurance/select-with-add-action";
import {
  TableBodyRowClickEvent,
  TableSelectionChangeActionType,
  onChangeEvent,
  SelectChangeHandlerType,
  TableRowClassNameType,
  RecordTypeWithAnyValue,
  TableRowCellClassNameType,
} from "@exsys-patient-insurance/types";
import EditOrCreateRequest from "./partials/EditOrCreateRequest";
import useSaveServiceRequest from "./hooks/useSaveServiceRequest";
import useRequestUcafBySerialNo from "./hooks/useRequestUcafBySerialNo";
import useAttachmentsHandlers from "./hooks/useAttachmentsHandlers";
import useLinkServices from "./hooks/useLinkServices";
import useLoadDefaultServices from "./hooks/useLoadDefaultServices";
import useCancelDispensedItem from "./hooks/useCancelDispensedItem";
import useCreatePaperSerialFromAdmission from "./hooks/useCreatePaperSerialFromAdmission";
import useCreateAdmissionBasedSerial from "./hooks/useCreateAdmissionBasedSerial";
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
const { red, appPrimary } = colors;
const { requestsData: defaultRequestsData } = initialValues;
const { details: defaultRequestsDataDetails } = defaultRequestsData;

const UcafListPage = () => {
  const { isDoctorUser, isPharmacyUser } = useCurrentUserType();
  const globalProviderNo = useGlobalProviderNo();
  const {
    addNotification,
    state: { tpa_use_emergency, tpa_use_inpatient, tpa_use_outpatient },
  } = useAppConfigStore();
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
      initialValues: {
        ...initialValues,
        requestsData: {
          ...defaultRequestsData,
          details: {
            ...defaultRequestsDataDetails,
            doctor_provider_no: globalProviderNo as unknown as number,
          },
        },
      },
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
    paper_serial_search_value,
    requestsData: {
      details: {
        doctor_department_id,
        doctor_provider_no,
        doctor_provider_name,
        doctor_provider_type,
        doctor_name,
        admission_reason,
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
        isInpatientUcaf,
        provider_cancelation_days,
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
      paper_serial_search_value: "",
    });
    fetchUcafRequests({
      shouldSetUcafTypeInpatient: "N",
    });
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

  const baseOnAfterSaveRequest = useCallback(
    (searchRequests?: boolean) => {
      if (editionModalType) {
        setEditionModalState("")();
      }
      if (moreDetailsModalShown) {
        closeMoreDetailsModal();
      }
      fetchSerialNoList();
      if (searchRequests) {
        onSearchRequests();
      }
    },
    [
      onSearchRequests,
      setEditionModalState,
      moreDetailsModalShown,
      closeMoreDetailsModal,
      fetchSerialNoList,
    ]
  );

  const onAfterSaveRequest = useCallback(
    () => baseOnAfterSaveRequest(true),
    [baseOnAfterSaveRequest]
  );

  const handleChangeUcafType: onChangeEvent = useCallback(
    ({ name, value }) => {
      const isNotInpatient = value !== "I";
      const { expected_days, expected_amount, admission_reason } =
        defaultRequestsDataDetails;

      handleChangeMultipleInputs({
        [name]: value,
        "requestsData.details.expected_days": isNotInpatient
          ? undefined
          : expected_days,
        "requestsData.details.expected_amount": isNotInpatient
          ? undefined
          : expected_amount,
        "requestsData.details.admission_reason": isNotInpatient
          ? undefined
          : admission_reason,
      });
    },
    [handleChangeMultipleInputs]
  );

  const { loading: isSavingRequest, handleSaveServiceRequest } =
    useSaveServiceRequest({
      root_organization_no,
      doctor_provider_no,
      doctor_provider_name,
      doctor_name,
      ucafe_date,
      ucafe_type,
      claim_flag,
      ucaf_id,
      doctor_department_id,
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
      admission_reason,
      onSuccess: onAfterSaveRequest,
    });

  const handleAfterCreatePaperSerialFromAdmission = useCallback(
    (paperSerial: string) => {
      baseOnAfterSaveRequest();
      handleChangeMultipleInputs({
        tableSelectionRows: initialValues.tableSelectionRows,
        selectedTableRecord: initialValues.selectedTableRecord,
        paper_serial_search_value: paperSerial,
        paper_serial: paperSerial,
      });
      fetchUcafRequests({
        shouldSetUcafTypeInpatient: "Y",
        paper_serial: paperSerial,
      });
    },
    [baseOnAfterSaveRequest, handleChangeMultipleInputs, fetchUcafRequests]
  );

  const { isCreatePaperSerialFromAdmission, createPaperSerialFromAdmission } =
    useCreatePaperSerialFromAdmission({
      root_organization_no,
      doctor_provider_no,
      doctor_department_id,
      doctor_name,
      onSuccess: handleAfterCreatePaperSerialFromAdmission,
    });

  const { handleCancelDispensedItem, isCancelingDispendItem } =
    useCancelDispensedItem(ucaf_id, onAfterSaveRequest);

  const baseShouldLoadDefaultConsultation =
    isCurrentPatientActive &&
    isNewConsultation &&
    !hasPatientExceededLimits &&
    canInsert &&
    !!primary_diagnosis &&
    agreed === "Y" &&
    !reviwed_date;

  const shouldLoadDefaultConsultation =
    baseShouldLoadDefaultConsultation && ucafe_type === "O";

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

  const showAdmissionRequestButton = tpa_use_inpatient === "Y";

  const hasNoAdmissionReason =
    !!doctor_department_id && !admission_reason?.length;
  const shouldPerformNewAdmissionRequest =
    showAdmissionRequestButton &&
    !!paper_serial &&
    !hasNoAdmissionReason &&
    baseShouldLoadDefaultConsultation &&
    isInPatientUcafType;

  const { isPerformingAdmissionRequest } = useCreateAdmissionBasedSerial({
    rootOrganizationNo: root_organization_no,
    patientCardNo: foundPatientCardNo,
    ucafDate: ucafe_date,
    claimFlag: claim_flag,
    ucafType: ucafe_type,
    providerNo: globalProviderNo,
    shouldPerformNewAdmissionRequest,
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
              isSendingToTPA: true,
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
        fetchUcafRequests({
          paper_serial: value,
          shouldSetUcafTypeInpatient: "N",
        });
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
            {
              last_delivery_date,
              ucaf_dtl_pk,
              service_code,
            }: RequestTableRecordType
          ) => {
            if (last_delivery_date && provider_cancelation_days) {
              const lastDeliveryDateWithDays = addAmountToDate(
                last_delivery_date,
                provider_cancelation_days
              );

              const isNowGreaterThanLastDeliveryDateWithDays =
                checkIfThisDateGreaterThanOther(
                  new Date(),
                  lastDeliveryDateWithDays
                );

              return !isNowGreaterThanLastDeliveryDateWithDays ? (
                <Flex width="100%" justify="center">
                  <CloseIcon
                    width="1.8em"
                    size="25px"
                    onClick={handleCancelDispensedItem(
                      ucaf_dtl_pk,
                      service_code
                    )}
                    color={appPrimary}
                  />
                </Flex>
              ) : null;
            }
            const isMeds = specialty_type === "MED";
            return isMeds && !last_delivery_date ? (
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
  }, [openChangeMedicationModalVisible, provider_cancelation_days]);

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
    isPerformingAdmissionRequest ||
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

  const areBaseFieldsDisabled =
    defaultServicesLoading ||
    isPerformingAdmissionRequest ||
    !doctor_provider_no ||
    !doctor_department_id ||
    !foundPatientCardNo ||
    !paper_serial;

  const isEditableFieldsDisabled =
    hasPatientExceededLimits ||
    !!reviwed_date ||
    canNotUserInsert ||
    isDataWrittenByDoctorAndProviderView ||
    hasPatientExceededLimits ||
    areBaseFieldsDisabled;

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

  const filteredUcafTypesOptions = useMemo(
    () =>
      UCAF_TYPES_RADIO_OPTIONS.filter(({ label, value }) => {
        const isEmergency = value === "E";
        const isInpatient = value === "I";
        const shouldRemove = isInpatient
          ? !showAdmissionRequestButton || !isInpatientUcaf
          : isEmergency
          ? tpa_use_emergency !== "Y"
          : tpa_use_outpatient !== "Y";

        return shouldRemove
          ? false
          : {
              label,
              value,
            };
      }).filter(Boolean),
    [
      showAdmissionRequestButton,
      tpa_use_emergency,
      isInpatientUcaf,
      tpa_use_outpatient,
    ]
  );

  const dispenseItemsRowsLength = dispenseItemsRows?.length ?? 0;
  const linkItemsRowsLength = linkItemsRows?.length ?? 0;
  const postItemsRowsLength = postItemsRows?.length ?? 0;
  // const hasDepartmentId = !!doctor_department_id;

  const isHospitalUserFromCurrentProvider = useMemo(
    () => getCurrentUserType(doctor_provider_type).isHospitalUser,
    [doctor_provider_type]
  );

  const doctorProviderNoDisabled =
    !isHospitalUserFromCurrentProvider ||
    !foundPatientCardNo ||
    !doctor_provider_no ||
    !paper_serial;

  const doctorDepartmentDisabled =
    (!!doctor_provider_type && !isHospitalUserFromCurrentProvider) ||
    !foundPatientCardNo ||
    !paper_serial;

  const tableLoading =
    requestsLoading ||
    defaultServicesLoading ||
    isPerformingAdmissionRequest ||
    isSavingRequest ||
    isCancelingDispendItem;

  const rowCellClassName: TableRowCellClassNameType<RequestTableRecordType> =
    useCallback(({ internal_notes }, dataIndex) => {
      if (dataIndex === "approval_reply_name" && !!internal_notes) {
        return "yellow-bg";
      }

      return "";
    }, []);

  // const doctorNameErrorShown = doctorProviderNoDisabled
  //   ? false
  //   : !doctor_name;

  // const doctorProviderNoErrorShown = doctorProviderNoDisabled
  //   ? false
  //   : !doctor_provider_no;

  // const doctorDepartmentErrorShown = doctorDepartmentDisabled
  //   ? false
  //   : !doctor_department_id;

  return (
    <>
      <Flex
        width="100%"
        gap="7px"
        wrap="true"
        bordered
        padding="8px"
        align="center"
      >
        <FindPatientForm
          onChangeSearchFields={handleMainFieldsChangeAndResetFrom}
          handleChangeMultipleInputs={handleChangeMultipleInputs}
        />

        <SelectWithApiQuery
          ref={serialNoListRef}
          queryType="query"
          apiOrCodeId="QUERY_UCAF_SERIAL_LIST"
          width="120px"
          value={paper_serial}
          name="paper_serial"
          label="serial"
          disabled={searchRequestsDisabled}
          onPressEnter={handleMainFieldsChangeAndResetFrom}
          onChange={handleMainFieldsChangeAndResetFrom}
          checkAllParamsValuesToQuery
          searchValue={paper_serial_search_value}
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

        {!paper_serial &&
          showAdmissionRequestButton &&
          !!foundPatientCardNo && (
            <Button
              label="admsion"
              type="primary"
              onClick={createPaperSerialFromAdmission}
              loading={isCreatePaperSerialFromAdmission}
              disabled={isCreatePaperSerialFromAdmission}
            />
          )}

        {isHospitalUserFromCurrentProvider ? (
          <InputField
            label="docnam"
            width="260px"
            name="requestsData.details.doctor_name"
            value={doctor_name}
            onChange={handleChange}
            disabled={doctorProviderNoDisabled}
            // error={doctorNameErrorShown ? " " : ""}
            // useErrorHint={false}
            // useRedBorderWhenError
          />
        ) : (
          <SelectWithApiQuery
            label="docprvdrnam"
            value={doctor_provider_no}
            width="260px"
            apiOrCodeId="QUERY_PROVIDER_NAMES_LIST"
            queryType="query"
            name="requestsData.details.doctor_provider_no"
            onChange={handleChangeDoctorDepartmentOrProviderNo}
            allowClear={false}
            apiParams={doctorsProviderListParams}
            disabled={doctorProviderNoDisabled}
            // error={doctorProviderNoErrorShown ? " " : ""}
            // useErrorHint={false}
            // useRedBorderWhenError
          />
        )}

        <SelectWithApiQuery
          label="spec"
          value={doctor_department_id}
          width="200px"
          apiOrCodeId="QUERY_MI_DEPARTMENTS_LIST"
          queryType="query"
          name="requestsData.details.doctor_department_id"
          onChange={handleChangeDoctorDepartmentOrProviderNo}
          allowClear={false}
          disabled={doctorDepartmentDisabled}
          // error={doctorDepartmentErrorShown ? " " : ""}
          // useErrorHint={false}
          // useRedBorderWhenError
        />

        {isDoctorUser && (
          <Button
            label="ptnthstry"
            type="primary"
            onClick={toggleHistoryModal}
            disabled={!foundPatientCardNo}
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
        <Flex wrap="true" width="30%" gap="7px">
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
            options={filteredUcafTypesOptions}
            label="ucaftype"
            labelType="inlined"
            name="requestsData.details.ucafe_type"
            value={ucafe_type}
            onChange={handleChangeUcafType}
            disabled={isInpatientUcaf || isEditableFieldsDisabled}
            mode="radio"
            width={isInPatientUcafType ? "calc(100% - 150px)" : "100%"}
          />
          {isInPatientUcafType && (
            <>
              <InputNumber
                name="requestsData.details.expected_days"
                width="60px"
                label="daysno"
                value={expected_days}
                min={0}
                onChange={handleChange}
                disabled={isEditableFieldsDisabled}
                useRedBorderWhenError
                error={
                  !isEditableFieldsDisabled &&
                  typeof expected_days === "undefined"
                    ? " "
                    : ""
                }
              />

              <InputNumber
                name="requestsData.details.expected_amount"
                width="76px"
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

          <TextAreaField
            name="requestsData.details.provider_notes"
            value={provider_notes}
            disabled={isEditableFieldsDisabled}
            onChange={handleChange}
            label="nots"
            initialInputHeight="40px"
            width="100%"
          />
        </Flex>

        <Flex column="true" gap="5px">
          <Image
            src={organizationUrl}
            alt="organization"
            width="sp18"
            height="sp15"
          />

          <LabeledViewLikeInput
            width="100%"
            value={ucafe_date}
            label="ucafdate"
          />

          <FileUploadInputField
            dashed
            width="100%"
            height="40px"
            onChange={handleAddAttachment}
            messageLabelId="attachmnt"
            name="fileUrl"
            accept={IMAGES_AND_FILES}
            disabled={canNotInsertAttachment}
          />
        </Flex>

        <Flex width="58%" wrap="true" gap="8px">
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

          {showAdmissionRequestButton &&
            !!paper_serial &&
            isInPatientUcafType && (
              <SelectWithAddActionAndQuery
                width="100%"
                label="admrsn"
                name="requestsData.details.admission_reason"
                value={admission_reason}
                onChange={handleChange}
                disabled={isEditableFieldsDisabled}
                codeId="MI_ADMISSION_REASON_LIST"
                error={hasNoAdmissionReason ? " " : ""}
                useErrorHint={false}
                useRedBorderWhenError
              />
            )}

          <Flex width="100%" wrap="true" align="center" gap="10px">
            <Flex
              width="calc(50% - 5px)"
              align="center"
              justify="flex-start"
              gap="10px"
            >
              {isInPatientUcafType && (
                <>
                  <LabeledViewLikeInput
                    width="45%"
                    value={admission_date}
                    label="admtiondate"
                    fontWeight="bold"
                    fontSize="ff6"
                    justify="center"
                  />

                  <LabeledViewLikeInput
                    width="45%"
                    value={discharge_date}
                    label="dischdate"
                    fontWeight="bold"
                    fontSize="ff6"
                    justify="center"
                  />
                </>
              )}
            </Flex>

            <Flex
              width="calc(50% - 5px)"
              align="center"
              justify="flex-start"
              gap="10px"
            >
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
          loop={false}
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

      <Table<RequestTableRecordType>
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
        loading={tableLoading}
        selectionKeys={selectedKeys}
        onSelectionChanged={onSelectionChanged}
        disabledRowsSelection={disabledRowsSelection}
        onDoubleClick={onTableDoubleClick}
        useAlignedTotalCells
        rowClassName={tableRowClassName}
        rowCellClassName={rowCellClassName}
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
