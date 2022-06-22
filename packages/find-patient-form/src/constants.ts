/*
 *
 * Constants: `@exsys-patient-insurance/find-patient-form`.
 *
 */
import { getCurrentDateString } from "@exsys-patient-insurance/helpers";
import {
  PatientItemRecordType,
  RequestsDataType,
  RequestTableRecordType,
} from "./index.interface";

export const SEARCH_RADIO_OPTIONS = [
  {
    label: "cardno",
    value: "C",
  },
  {
    label: "bnfcryid",
    value: "N",
  },
  {
    label: "phn",
    value: "P",
  },
];

export const initialValues = {
  search_type: "C",
  search_value: "",
  currentPatientData: {} as PatientItemRecordType,
  patientsDataList: [] as PatientItemRecordType[],
  selectionModalOpened: false,
  paper_serial: "",
  isCurrentPatientActive: false,
  editionModalType: "",
  selectedTableRecord: {} as RequestTableRecordType,
  requestsData: {
    details: {
      attendance_type: "O",
      ucafe_type: "N",
      claim_flag: "A",
      ucafe_date: getCurrentDateString(),
    },
    data: [] as RequestTableRecordType[],
  } as RequestsDataType,
};

export const REQUESTS_TABLE_COLUMNS = [
  {
    title: "prdctcde",
    dataIndex: "service_code",
    width: "8%",
  },
  {
    title: "prodctnam",
    dataIndex: "service_name",
    width: "16%",
  },
  {
    title: "qty",
    dataIndex: "qty",
    width: "11%",
  },
  {
    title: "apprvdqntty",
    dataIndex: "approved_quantity",
    width: "10%",
  },
  {
    title: "prc",
    dataIndex: "price",
    width: "10%",
  },
  {
    title: "dlvryqty",
    dataIndex: "delivery_qty",
    width: "10%",
  },
  {
    title: "dlvydat",
    dataIndex: "delivery_date",
    width: "10%",
  },
  {
    title: "apprvl",
    dataIndex: "approval_reply_name",
    width: "10%",
  },
  {
    title: "stts",
    dataIndex: "status_name",
    width: "10%",
  },
];

export const TABLE_COLUMNS = [
  {
    title: "bnfcry",
    dataIndex: "patient_name",
    width: "21%",
  },
  {
    title: "cardno",
    dataIndex: "patient_card_no",
    width: "14%",
  },
  {
    title: "bnfcryid",
    dataIndex: "national_id",
    width: "11%",
  },
  {
    title: "phn",
    dataIndex: "phone_no",
    width: "10%",
  },
  {
    title: "strtdate",
    dataIndex: "start_date",
    width: "10%",
  },
  {
    title: "enddate",
    dataIndex: "end_date",
    width: "10%",
  },
  {
    title: "class",
    dataIndex: "class",
    width: "10%",
  },
  {
    title: "membrof",
    dataIndex: "member_of",
    width: "10%",
  },
];

export const ATTENDANCE_LIST_PARAMS = Object.freeze({
  pwhere: "('I','O','E')",
});

export const TABLE_ACTION_ICON = [
  {
    type: "button",
    label: "dlvr",
    buttonSize: "small",
    buttonType: "primary",
  },
];
