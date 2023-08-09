/*
 *
 * Constants: `@exsys-patient-insurance/tpa-members-page`.
 *
 */
import type { PatientItemRecordType } from "@exsys-patient-insurance/find-patient-form";
import {
  getCurrentDateString,
  getGivenDateParts,
} from "@exsys-patient-insurance/helpers";

const { firstDayDate, lastDayDate } = getGivenDateParts();

export const initialFormFilterValues = {
  date_from: getCurrentDateString({ day: firstDayDate.getDate() }),
  date_to: getCurrentDateString({ day: lastDayDate.getDate() }),
  root_organization_no: "",
  provider_no: "",
  paper_serial: "",
  currentPatientData: {} as PatientItemRecordType,
};

export const PROVIDER_NAME_COLUMN = [
  {
    title: "prvdr",
    dataIndex: "provider_name",
    width: "16.3%",
    totalCellProps: {
      isFragment: true,
    },
  },
];

export const initialNewBatchValues = {
  policy_no: "SSW",
  organization_no: "001",
  class: "SSGL",
  patient_card_no: "",
  patient_name_p: "",
  patient_name_s: "",
  date_of_birth: "",
  gender: "",
  phone_m: "",
  start_from: "",
  end_at: "",
  branch_no: "",
  status: "",
};

export const TABLE_COLUMNS = [
  // {
  //   title: "provider_name",
  //   dataIndex: "provider_name",
  //   width: "16%",
  // },
  {
    title: "crdno",
    dataIndex: "patient_card_no",
    width: "9%",
    sorter: true,
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "ptntnm",
    dataIndex: "patient_name",
    width: "20%",
    sorter: true,
    totalCellProps: {
      isFragment: true,
    },
  },

  {
    title: "gndr",
    dataIndex: "gender_name",
    width: "5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "strtfrm",
    dataIndex: "start_from",
    width: "7%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "endat",
    dataIndex: "end_at",
    width: "7%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "stts",
    dataIndex: "status_name",
    width: "5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "dob",
    dataIndex: "date_of_birth",
    width: "7%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "cncldat",
    dataIndex: "cancel_date",
    width: "9%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "addtndt",
    dataIndex: "addition_date",
    width: "9%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "phn",
    dataIndex: "phone_m",
    width: "10%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "clss",
    dataIndex: "class_name",
    width: "10%",
    totalCellProps: {
      isFragment: true,
    },
  },
];

export const defaultNewRecord = Object.freeze({
  record_status: "q",
  policy_no: "",
  from_date: "",
  to_date: "",
  class: "",
  medical_insurance_id: "",
  client_id: "",
});
