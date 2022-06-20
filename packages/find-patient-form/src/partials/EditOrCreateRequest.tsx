/*
 *
 * Component: `EditOrCreateRequest`
 *
 */
import { memo, useCallback } from "react";
import DatePickerField from "@exsys-patient-insurance/date-picker-field";
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
import { RequestTableRecordType } from "../index.interface";

interface EditOrCreateRequestProps {
  rootOrganizationNo: string;
  patientCardNo: string;
  ucafDate?: string;
  claimFlag?: string;
  attendanceType?: string;
  closeEditionModal: () => void;
  recordStatus: string;
  selectedRecord: RequestTableRecordType;
}

const initialState = {
  ucaf_dtl_pk: "",
  service_code: "",
  service_name: "",
  price: 0,
  qty: 0,
  delivery_qty: 0,
  status: "O",
  delivery_date: "",
  delivery_doc_no: undefined,
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
}: EditOrCreateRequestProps) => {
  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();

  const { values, handleChange, handleChangeMultipleInputs } = useFormManager({
    initialValues: {
      ...initialState,
      ...selectedRecord,
    },
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

  const {
    service_name,
    qty,
    delivery_qty,
    price,
    delivery_date,
    delivery_doc_no,
  } = values;

  const handleSelectService: OnSelectServiceType = useCallback(
    ({ price, service_name, service_id }) =>
      handleChangeMultipleInputs({
        service_code: service_id,
        service_name,
        price,
        delivery_qty: 0,
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
    >
      <Flex width="100%" wrap="true" gap="10px">
        <LabeledViewLikeInput
          label="prodctnam"
          width="55%"
          value={service_name}
          onClick={shouldRenderServiceModal ? handleOpen : undefined}
          justify="center"
        />
        <InputNumber
          label="qty"
          name="qty"
          width="calc(21% - 5px)"
          value={qty}
          onChange={handleChange}
        />
        <InputNumber
          label="dlvryqty"
          name="delivery_qty"
          width="calc(21% - 5px)"
          value={delivery_qty}
          onChange={handleChange}
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
        <DatePickerField
          name="delivery_date"
          value={delivery_date}
          onChange={handleChange}
          width="200px"
          label="dlvydat"
        />
        <InputField
          name="delivery_doc_no"
          value={delivery_doc_no}
          onChange={handleChange}
          width="200px"
          label="dlvydocno"
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

// USE POST http://207.180.237.36:9090/ords/exsys_api/mi_ucaf_request/mi_provider_ucaf_dml
// FROM json_table(p_body FORMAT JSON, '$'
//            COLUMNS (
//               authorization                 Number    PATH    '$.authorization',
//               root_organization_no          VARCHAR2  PATH    '$.root_organization_no',
//               insurance_company_no          Number    PATH    '$.insurance_company_no',
//               patient_card_no               VARCHAR2  PATH    '$.patient_card_no',
//               paper_serial                  VARCHAR2  PATH    '$.paper_serial',
//               ucaf_id                       Number    PATH    '$.ucaf_id',
//               ucafe_date                    VARCHAR2  PATH    '$.ucafe_date',
//               claim_flag                    VARCHAR2  PATH    '$.claim_flag',
//               attendance_type               VARCHAR2  PATH    '$.attendance_type',
//               provider_no                   VARCHAR2  PATH    '$.provider_no',
//               provider_notes                VARCHAR2  PATH    '$.provider_notes',
//               doctor_provider_no            VARCHAR2  PATH    '$.doctor_provider_no',
//               doctor_provider_name          VARCHAR2  PATH    '$.doctor_provider_name',
//               doctor_department_id          VARCHAR2  PATH    '$.doctor_department_id',
//               complain                      VARCHAR2  PATH    '$.complain',
//               signs                         VARCHAR2  PATH    '$.signs',
//                primary_diag_code            VARCHAR2  PATH    '$.primary_diag_code',
//                primary_diagnosis            VARCHAR2  PATH    '$.primary_diagnosis',
//                ucafe_type                   VARCHAR2  PATH    '$.ucafe_type',
//                is_chronic                   VARCHAR2  PATH    '$.is_chronic',
//                NESTED             PATH '$.data[*]'
//              COLUMNS (
//               ucaf_dtl_pk                   NUMBER  PATH    '$.ucaf_dtl_pk',
//               service_code                  VARCHAR2  PATH    '$.service_code',
//               qty                           NUMBER  PATH    '$.qty',
//               price                         NUMBER  PATH    '$.price',
//               total                         NUMBER  PATH    '$.total',
//               delivery_qty                  NUMBER  PATH    '$.delivery_qty',
//               delivery_date                 VARCHAR2  PATH    '$.delivery_date',
//               delivery_doc_no               VARCHAR2  PATH    '$.delivery_doc_no',
//               status                        VARCHAR2  PATH    '$.status',
//               record_status                 VARCHAR2  PATH    '$.record_status'
//            ))) ;
