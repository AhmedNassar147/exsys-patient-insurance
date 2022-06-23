/*
 *
 * Component: `EditOrCreateRequest`
 *
 */
import { memo, useCallback } from "react";
import InputNumber from "@exsys-patient-insurance/input-number";
import useFormManager from "@exsys-patient-insurance/form-manager";
import InputField from "@exsys-patient-insurance/input-field";
import Modal from "@exsys-patient-insurance/modal";
import ServicesModal, {
  OnSelectServiceType,
} from "@exsys-patient-insurance/services-modal";
import { useOpenCloseActionsWithState } from "@exsys-patient-insurance/hooks";
import Flex from "@exsys-patient-insurance/flex";
import LabeledViewLikeInput from "@exsys-patient-insurance/labeled-view-like-input";
import {
  RequestTableRecordType,
  ServiceItemValuesForPostApiType,
} from "../index.interface";

interface EditOrCreateRequestProps {
  rootOrganizationNo: string;
  patientCardNo: string;
  ucafDate?: string;
  claimFlag?: string;
  attendanceType?: string;
  closeEditionModal: () => void;
  recordStatus: string;
  selectedRecord: RequestTableRecordType;
  handleSaveServiceRequest: (values: ServiceItemValuesForPostApiType) => void;
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
};

const EditOrCreateRequest = ({
  rootOrganizationNo,
  patientCardNo,
  ucafDate,
  claimFlag,
  attendanceType,
  recordStatus,
  closeEditionModal,
  selectedRecord,
  handleSaveServiceRequest,
  isSavingCurrentRequest,
}: EditOrCreateRequestProps) => {
  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();

  const { values, handleChange, handleChangeMultipleInputs, handleSubmit } =
    useFormManager({
      initialValues: {
        ...initialState,
        ...selectedRecord,
        record_status: recordStatus,
      },
      onSubmit: handleSaveServiceRequest,
    });

  const servicesRequestParams = {
    root_organization_no: rootOrganizationNo,
    patient_card_no: patientCardNo,
    ucaf_date: ucafDate,
    claim_flag: claimFlag,
    attendance_type: attendanceType,
  };

  const shouldRenderServiceModal = !!(
    rootOrganizationNo &&
    patientCardNo &&
    ucafDate &&
    claimFlag &&
    attendanceType
  );

  const { service_name, qty, price, delivery_doc_no } = values;

  const handleSelectService: OnSelectServiceType = useCallback(
    ({ price, service_name, service_id }) =>
      handleChangeMultipleInputs({
        service_code: service_id,
        service_name,
        price,
        qty: 1,
      }),
    [handleChangeMultipleInputs]
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
    >
      <Flex width="100%" wrap="true" gap="10px">
        <LabeledViewLikeInput
          label="prodctnam"
          width="55%"
          value={service_name}
          onClick={shouldRenderServiceModal ? handleOpen : undefined}
          justify="center"
          ellipsis="true"
        />
        <InputNumber
          label="qty"
          name="qty"
          width="calc(21% - 5px)"
          value={qty}
          onChange={handleChange}
          disabled={!service_name}
        />
        <LabeledViewLikeInput
          label="prc"
          minWidth="100px"
          width="auto"
          justify="center"
          value={price}
        />
        <LabeledViewLikeInput
          label="totl"
          minWidth="100px"
          width="auto"
          justify="center"
          value={qty * price}
        />
        <InputField
          name="delivery_doc_no"
          value={delivery_doc_no}
          onChange={handleChange}
          width="200px"
          label="invcid"
        />

        {shouldRenderServiceModal && (
          <ServicesModal
            visible={visible}
            searchParams={servicesRequestParams}
            onClose={handleClose}
            onSelectService={handleSelectService}
          />
        )}
      </Flex>
    </Modal>
  );
};

export default memo(EditOrCreateRequest);
