/*
 *
 * Constants: `@exsys-patient-insurance/sales-details-page`.
 *
 */
import type { PatientItemRecordType } from "@exsys-patient-insurance/find-patient-form";
import {
  getCurrentDateString,
  getGivenDateParts,
} from "@exsys-patient-insurance/helpers";
import { SalesDetailsRecordType } from "./index.interface";

const { firstDayDate, lastDayDate } = getGivenDateParts();

export const initialFormFilterValues = {
  date_from: getCurrentDateString({ day: firstDayDate.getDate() }),
  date_to: getCurrentDateString({ day: lastDayDate.getDate() }),
  root_organization_no: "",
  provider_no: "",
  paper_serial: "",
  currentPatientData: {} as PatientItemRecordType,
};

export const TABLE_COLUMNS = [
  {
    title: "batchno",
    dataIndex: "batch_no",
    width: "9%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "ptntnm",
    dataIndex: "patient_name",
    width: "20%",
    render: (patient_name: string, { card_no }: SalesDetailsRecordType) =>
      `${card_no} ${patient_name}`,
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "ucafdate",
    dataIndex: "ucafe_date",
    width: "8%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "prodctnam",
    dataIndex: "service_name",
    width: "25%",
    render: (service_name: string, { service_code }: SalesDetailsRecordType) =>
      `${service_code} ${service_name}`,
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
    title: "unitprice",
    dataIndex: "unit_price",
    width: "6%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "untdscnt",
    dataIndex: "unit_disc",
    width: "6%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "untcpay",
    dataIndex: "unit_copay",
    width: "6%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "totalprc",
    dataIndex: "total_price",
    width: "7%",
  },
  {
    title: "prvdrshare",
    dataIndex: "provider_share",
    width: "7%",
  },
];
