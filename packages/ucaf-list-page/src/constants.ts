/*
 *
 * Constants: `@exsys-patient-insurance/ucaf-list-page`.
 *
 */
import type { PatientItemRecordType } from "@exsys-patient-insurance/find-patient-form";
import { getCurrentDateString } from "@exsys-patient-insurance/helpers";
import { RecordType } from "@exsys-patient-insurance/types";
import {
  RequestsDataType,
  RequestTableRecordType,
  ServiceItemValuesForPostApiType,
} from "./index.interface";

export const initialValues = {
  historyModalShown: false,
  currentPatientData: {} as PatientItemRecordType,
  paper_serial: "",
  isCurrentPatientActive: false,
  editionModalType: "",
  selectedTableRecord: {} as RequestTableRecordType,
  requestsData: {
    isNewConsultation: false,
    hasPatientExceededLimits: false,
    details: {
      ucafe_type: "O",
      claim_flag: "A",
      stamped: "N",
      agreed: "N",
      expected_days: 1,
      expected_amount: 1,
      written_by_doctor: undefined,
      ucafe_date: "",
    },
    data: [] as RequestTableRecordType[],
  } as RequestsDataType,
  tableSelectionRows: {
    selectedKeys: [] as string[],
    selectedRows: [] as RequestTableRecordType[],
  },
  attachments: [] as RecordType[],
};

export const initialDeliveryFormState = {
  admission_date: getCurrentDateString(),
  discharge_date: getCurrentDateString(),
};

export const CHANGE_MEDICATION_RADIO_OPTIONS = [
  {
    label: "chngalt",
    value: "M",
  },
  {
    label: "chngprc",
    value: "P",
  },
];

export const changeMedicationDataInitialState = {
  new_request_price: undefined,
  newServiceData: {} as ServiceItemValuesForPostApiType,
  viewType: "M",
};

export const doctorsProviderListParams = {
  doctor_only: "Y",
};

export const REQUESTS_TABLE_COLUMNS = [
  {
    title: "prdctcde",
    dataIndex: "service_code",
    width: "5%",
    titleDataIndex: "original_service_code",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "prodctnam",
    dataIndex: "service_name",
    width: "19%",
    titleDataIndex: "original_service_code_name",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "qty",
    dataIndex: "qty",
    width: "4%",
    titleDataIndex: "original_qty",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "apprvdqntty",
    dataIndex: "approved_quantity",
    width: "4.5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "unitprice",
    dataIndex: "price",
    titleDataIndex: "original_price",
    width: "4%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "totalprc",
    dataIndex: "total_price",
    width: "4.5%",
  },
  {
    title: "totdiscount",
    dataIndex: "total_patient_discount",
    width: "6%",
  },
  {
    title: "totptntshr",
    dataIndex: "total_patient_share",
    width: "4.5%",
  },
  {
    title: "dlvydat",
    dataIndex: "delivery_date",
    width: "6%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "apprvl",
    dataIndex: "approval_reply_name",
    width: "6%",
    titleDataIndex: "internal_notes",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "rjctrson",
    dataIndex: "rejection_reason",
    width: "12%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "stts",
    dataIndex: "status_name",
    width: "4%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "lstdlvydat",
    dataIndex: "last_delivery_date",
    width: "6%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "duedlvydat",
    dataIndex: "due_delivery_date",
    width: "6%",
    totalCellProps: {
      isFragment: true,
    },
  },
];

export const UCAF_TYPES_RADIO_OPTIONS = [
  {
    label: "outptnt",
    value: "O",
  },
  {
    label: "inptnt",
    value: "I",
  },
  {
    label: "emrgncy",
    value: "E",
  },
];

export const CLAIM_TYPES_RADIO_OPTIONS = [
  {
    label: "isacute",
    value: "A",
  },
  {
    label: "prexst",
    value: "P",
  },
  {
    label: "chrnc",
    value: "C",
  },
  {
    label: "excptnal",
    value: "E",
  },
];
