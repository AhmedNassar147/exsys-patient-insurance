/*
 *
 * Constants: `@exsys-patient-insurance/mi-ucaf-page`.
 *
 */
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";
import { UcafPatientDataPropType } from "./index.interface";

export const initialValues = {
  search_type: "C",
  search_value: "",
  currentPatientData: {} as UcafPatientDataPropType,
  patientsDataList: [] as RecordTypeWithAnyValue[],
  selectionModalOpened: false,
  isCurrentPatientActive: false,
  editionModalType: "",
  selectedTableRecord: {} as RecordTypeWithAnyValue,
  historyModalShown: false,
};

export const BASE_DETAILS_COLUMN = [
  {
    title: "ucafid",
    dataIndex: "ucaf_id",
    width: "6.5%",
  },
  {
    title: "prvdr",
    dataIndex: "provider_name",
    width: "17%",
  },
  {
    title: "ucafdate",
    dataIndex: "ucaf_date",
    width: "9.5%",
  },
  {
    title: "docname",
    dataIndex: "doctor_name",
    width: "13%",
  },
  {
    title: "chrnc",
    dataIndex: "is_chronic",
    width: "5.5%",
  },
  {
    title: "dignos",
    dataIndex: "diagnosis",
    width: "29.5%",
  },
  {
    title: "stts",
    dataIndex: "status_name",
    width: "6%",
  },
  {
    title: "rvwdate",
    dataIndex: "review_date",
    width: "8%",
  },
];
