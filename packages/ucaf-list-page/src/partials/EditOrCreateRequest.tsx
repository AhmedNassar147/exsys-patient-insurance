/*
 *
 * Component: `EditOrCreateRequest`
 *
 */
import { memo, useCallback, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import InputNumber from "@exsys-patient-insurance/input-number";
import useFormManager from "@exsys-patient-insurance/form-manager";
import InputField from "@exsys-patient-insurance/input-field";
import Modal from "@exsys-patient-insurance/modal";
import { useCurrentUserType } from "@exsys-patient-insurance/app-config-store";
import ServicesModal, {
  OnSelectServiceType,
} from "@exsys-patient-insurance/services-modal";
import { useOpenCloseActionsWithState } from "@exsys-patient-insurance/hooks";
import Flex from "@exsys-patient-insurance/flex";
import LabeledViewLikeInput from "@exsys-patient-insurance/labeled-view-like-input";
import { CapitalBooleanStringType } from "@exsys-patient-insurance/types";
import FindMedicationProperQuantityView from "./FindMedicationProperQuantityView";
import {
  RequestTableRecordType,
  ServiceItemValuesForPostApiType,
} from "../index.interface";

interface EditOrCreateRequestProps {
  rootOrganizationNo: string;
  patientCardNo: string;
  ucafDate?: string;
  claimFlag?: string;
  ucafType?: string;
  closeEditionModal: () => void;
  recordStatus: string;
  selectedRecord: RequestTableRecordType;
  handleSaveServiceRequest: (
    values: ServiceItemValuesForPostApiType,
    showNotificationAndRefetchData?: boolean
  ) => Promise<void>;
  isSavingCurrentRequest?: boolean;
}

const initialState = {
  ucaf_dtl_pk: "",
  service_code: "",
  delivery_qty: 0,
  qty: 0,
  price: 0,
  delivery_date: "",
  delivery_doc_no: undefined,
  status: "O",
  service_name: "",
  inClinicService: false,
  unit_discount: undefined,
  patientShare: undefined,
  price_disc_prc: undefined,
  patient_share_prc: undefined,
  specialty_type: "",
  approval: "",
  uom: "",
  calc_flag: "N" as CapitalBooleanStringType | undefined,
};

const EditOrCreateRequest = ({
  rootOrganizationNo,
  patientCardNo,
  ucafDate,
  claimFlag,
  ucafType,
  recordStatus,
  closeEditionModal,
  selectedRecord: { provider_no, uom: selectedRecordUom, ...selectedRecord },
  handleSaveServiceRequest,
  isSavingCurrentRequest,
}: EditOrCreateRequestProps) => {
  const { pageType } = useParams();
  const { isDoctorUser } = useCurrentUserType();
  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();

  const onSubmit = useCallback(
    (values: ServiceItemValuesForPostApiType) =>
      handleSaveServiceRequest(
        {
          ...values,
          approved_quantity: recordStatus === "n" ? undefined : values.qty,
        },
        true
      ),
    [handleSaveServiceRequest, recordStatus]
  );

  const { values, handleChange, handleChangeMultipleInputs, handleSubmit } =
    useFormManager({
      initialValues: {
        ...initialState,
        ...selectedRecord,
        inClinicService: !!provider_no,
        record_status: recordStatus,
        uom: selectedRecordUom || "",
      },
      onSubmit,
    });

  const {
    service_name,
    qty,
    price,
    delivery_doc_no,
    inClinicService,
    specialty_type,
    service_code,
    calc_flag,
    uom,
  } = values;

  const isDoctorView = pageType === "D";
  const isNewRecord = recordStatus === "n";

  useLayoutEffect(
    () => {
      if (isNewRecord) {
        handleOpen();
      }
    },
    // eslint-disable-next-line
    [isNewRecord]
  );

  const servicesRequestParams = {
    root_organization_no: rootOrganizationNo,
    patient_card_no: patientCardNo,
    ucaf_date: ucafDate,
    claim_flag: claimFlag,
    attendance_type: ucafType,
  };

  const shouldRenderServiceModal = !!(
    rootOrganizationNo &&
    patientCardNo &&
    ucafDate &&
    claimFlag &&
    ucafType
  );

  const isInPatientUcafType = ucafType === "I";

  const handleSelectService: OnSelectServiceType = useCallback(
    (
      {
        price,
        service_name,
        service_id,
        price_disc_prc,
        copay,
        specialty_type,
        approval,
        calc_flag,
        uom,
      },
      inClinicService
    ) => {
      const nextStateValues = {
        service_code: service_id,
        service_name,
        qty: 1,
        price,
        inClinicService,
        specialty_type,
        price_disc_prc,
        patient_share_prc: copay,
        approval,
        calc_flag,
        uom,
        ...(inClinicService ? null : { delivery_doc_no: undefined }),
      };
      handleChangeMultipleInputs(nextStateValues);
    },
    [handleChangeMultipleInputs, handleSubmit]
  );

  const onProperQtyFound = useCallback(
    (qty: number) =>
      handleChange({
        name: "qty",
        value: qty,
      }),
    [handleChange]
  );

  return (
    <Modal
      width="900px"
      title="edit/add service"
      destroyOnClose
      visible={!!recordStatus}
      onClose={closeEditionModal}
      onOk={handleSubmit}
      disabled={isSavingCurrentRequest}
      loading={isSavingCurrentRequest}
      okText="save"
      maskClosable={false}
    >
      <Flex width="100%" wrap="true" gap="10px">
        <LabeledViewLikeInput
          label="prodctnam"
          width="45%"
          value={service_name}
          onClick={shouldRenderServiceModal ? handleOpen : undefined}
          justify="center"
          ellipsis="true"
        />
        {!!service_name && calc_flag === "Y" && (
          <FindMedicationProperQuantityView
            serviceCode={service_code}
            onProperQtyFound={onProperQtyFound}
          />
        )}
        <InputNumber
          label="qty"
          name="qty"
          width="110px"
          value={qty}
          onChange={handleChange}
          disabled={!service_name}
        />
        {!!uom && (
          <LabeledViewLikeInput
            label="uom"
            minWidth="100px"
            maxWidth="auto"
            width="auto"
            value={uom}
          />
        )}
        <InputNumber
          label="prc"
          width="100px"
          value={price}
          onChange={handleChange}
          name="price"
          disabled={!service_name || specialty_type !== "MED"}
          min={1}
        />
        <LabeledViewLikeInput
          label="totl"
          minWidth="100px"
          width="auto"
          justify="center"
          value={qty * price}
        />
        {inClinicService && (
          <InputField
            name="delivery_doc_no"
            value={delivery_doc_no}
            onChange={handleChange}
            width="200px"
            label="invcid"
          />
        )}

        {shouldRenderServiceModal && (
          <ServicesModal
            visible={visible}
            searchParams={servicesRequestParams}
            onClose={handleClose}
            onSelectService={handleSelectService}
            showInClinicServiceCheckbox={isDoctorView}
            initialInClinicService={
              isInPatientUcafType || !!provider_no || !isDoctorUser
            }
          />
        )}
      </Flex>
    </Modal>
  );
};

export default memo(EditOrCreateRequest);
