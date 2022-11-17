/*
 *
 * Constants: `@exsys-patient-insurance/users-list-page`.
 *
 */
import { UserRecordType } from "./index.interface";

export const initialFormFilterValues = {
  provider_no: "",
  mobile_no: "",
  job_id: "",
  selectedUser: {} as UserRecordType,
};

export const initialUserCreationFormState = {
  user_id: "",
  user_full_name_s: "",
  user_full_name_p: "",
  mobile_no: "",
  provider_no: "",
  user_type: "",
  job_id: "",
};

export const userTypeList = [
  { key: "A", value: "admn" },
  { key: "H", value: "hospital" },
  { key: "P", value: "frmcy" },
  { key: "D", value: "dctr" },
  { key: "L", value: "labs" },
  { key: "M", value: "mdcalcntr" },
  { key: "R", value: "rad" },
  { key: "O", value: "optcs" },
  { key: "S", value: "cstmrsuprt" },
  { key: "T", value: "fysosrpy" },
  { key: "C", value: "clnt" },
];

export const TABLE_COLUMNS = [
  {
    title: "plcyusrcd",
    dataIndex: "user_id",
    width: "10%",
  },
  {
    title: "engname",
    dataIndex: "user_full_name_p",
    width: "17%",
  },
  {
    title: "arname",
    dataIndex: "user_full_name_s",
    width: "17%",
  },
  {
    title: "phn",
    dataIndex: "mobile_no",
    width: "8%",
  },
  {
    title: "providername",
    dataIndex: "provider_name",
    width: "19%",
  },
  {
    title: "jobdesc",
    dataIndex: "job_description",
    width: "10%",
  },
  {
    title: "stts",
    dataIndex: "status_name",
    width: "8%",
  },
  {
    title: "dash",
    dataIndex: "dashboard",
    width: "9%",
  },
];
