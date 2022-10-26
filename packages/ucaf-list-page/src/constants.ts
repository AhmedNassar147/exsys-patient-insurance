/*
 *
 * Constants: `@exsys-patient-insurance/ucaf-list-page`.
 *
 */
import { getCurrentDateString } from "@exsys-patient-insurance/helpers";
import type { PatientItemRecordType } from "@exsys-patient-insurance/find-patient-form";
import { RecordType } from "@exsys-patient-insurance/types";
import { RequestsDataType, RequestTableRecordType } from "./index.interface";

export const initialValues = {
  historyModalShown: false,
  currentPatientData: {} as PatientItemRecordType,
  paper_serial: "",
  isCurrentPatientActive: false,
  editionModalType: "",
  selectedTableRecord: {} as RequestTableRecordType,
  requestsData: {
    details: {
      ucafe_type: "O",
      claim_flag: "A",
      stamped: "N",
      agreed: "N",
      expected_days: 1,
      expected_amount: 1,
      ucafe_date: getCurrentDateString(),
    },
    data: [] as RequestTableRecordType[],
  } as RequestsDataType,
  tableSelectionRows: {
    selectedKeys: [] as string[],
    selectedRows: [] as RequestTableRecordType[],
  },
  attachments: [] as RecordType[],
};

export const REQUESTS_TABLE_COLUMNS = [
  {
    title: "prdctcde",
    dataIndex: "service_code",
    width: "6%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "prodctnam",
    dataIndex: "service_name",
    width: "21.8%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "qty",
    dataIndex: "qty",
    width: "4%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "apprvdqntty",
    dataIndex: "approved_quantity",
    width: "4.5%",
  },
  {
    title: "prc",
    dataIndex: "price",
    width: "4%",
  },
  {
    title: "patshr",
    dataIndex: "patientShare",
    width: "4.5%",
  },
  {
    title: "dlvydat",
    dataIndex: "delivery_date",
    width: "8%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "apprvl",
    dataIndex: "approval_reply_name",
    width: "6%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "rjctrson",
    dataIndex: "rejection_reason",
    width: "17%",
  },
  {
    title: "stts",
    dataIndex: "status_name",
    width: "4.5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "lstdlvydat",
    dataIndex: "last_delivery_date",
    width: "8%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "duedlvydat",
    dataIndex: "due_delivery_date",
    width: "8%",
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
  // {
  //   label: "rmbrsmnt",
  //   value: "R",
  // },
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
