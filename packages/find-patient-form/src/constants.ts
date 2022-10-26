/*
 *
 * Constants: `@exsys-patient-insurance/find-patient-form`.
 *
 */
import { PatientItemRecordType } from "./index.interface";

export const initialState = {
  search_type: "C",
  search_value: "",
  patientsDataList: [] as PatientItemRecordType[],
};

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
    width: "16.5%",
  },
];

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

export const initialPatientData = {};
