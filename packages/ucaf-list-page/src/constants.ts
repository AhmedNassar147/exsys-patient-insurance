/*
 *
 * Constants: `@exsys-patient-insurance/ucaf-list-page`.
 *
 */
import { getCurrentDateString } from "@exsys-patient-insurance/helpers";
import { RecordType } from "@exsys-patient-insurance/types";
import {
  PatientItemRecordType,
  RequestsDataType,
  RequestTableRecordType,
} from "./index.interface";

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
    width: "5%",
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

export const ATTENDANCE_LIST_PARAMS = Object.freeze({
  pwhere: "('I','O','E')",
});
