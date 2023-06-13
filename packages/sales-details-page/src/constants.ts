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

const { firstDayDate, lastDayDate } = getGivenDateParts();

export const initialFormFilterValues = {
  date_from: getCurrentDateString({ day: firstDayDate.getDate() }),
  date_to: getCurrentDateString({ day: lastDayDate.getDate() }),
  root_organization_no: "",
  provider_no: "",
  paper_serial: "",
  qty: "",
  currentPatientData: {} as PatientItemRecordType,
};

export const PROVIDER_NAME_COLUMN = [
  {
    title: "prvdr",
    dataIndex: "provider_name",
    width: "13%",
    totalCellProps: {
      isFragment: true,
    },
  },
];

export const TABLE_COLUMNS = [
  // {
  //   title: "batchno",
  //   dataIndex: "batch_no",
  //   width: "7%",
  //   totalCellProps: {
  //     isFragment: true,
  //   },
  // },
  // {
  //   title: "ptntnm",
  //   dataIndex: "patient_name",
  //   width: "15%",
  //   render: (patient_name: string, { card_no }: SalesDetailsRecordType) =>
  //     `${card_no} ${patient_name}`,
  //   totalCellProps: {
  //     isFragment: true,
  //   },
  // },
  // {
  //   title: "ucafid",
  //   dataIndex: "ucaf_id",
  //   width: "7%",
  //   totalCellProps: {
  //     isFragment: true,
  //   },
  // },
  // {
  //   title: "prodctnam",
  //   dataIndex: "service_name",
  //   width: "19%",
  //   render: (service_name: string, { service_code }: SalesDetailsRecordType) =>
  //     `${service_code} ${service_name}`,
  //   totalCellProps: {
  //     isFragment: true,
  //   },
  // },
  {
    title: "provider_name",
    dataIndex: "provider_name",
    width: "16%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "batchno",
    dataIndex: "batch_no",
    width: "3%",
    totalCellProps: {
      isFragment: true,
    },
  },

  {
    title: "patientname",
    dataIndex: "patient_name",
    width: "17%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "form_no",
    dataIndex: "form_no",
    width: "8%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "ucaf_id",
    dataIndex: "ucaf_id",
    width: "8%",
    totalCellProps: {
      isFragment: true,
    },
  },

  {
    title: "gross_price",
    dataIndex: "gross_price",
    width: "8%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "copay",
    dataIndex: "copay",
    width: "6%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "disc",
    dataIndex: "disc",
    width: "7%",
  },
  {
    title: "providershare",
    dataIndex: "provider_share",
    width: "8%",
    ellipsis: true,
  },
];

export const detailsTableColumns = [
  {
    title: "-",
    dataIndex: "-",
    width: "27.3%",
  },
  {
    title: "service_code",
    dataIndex: "service_code",
    width: "7.61%",
  },
  {
    title: "service_name",
    dataIndex: "service_name",
    width: "26.3%",
  },
  {
    title: "qty",
    dataIndex: "qty",
    width: "8.2%",
  },
  {
    title: "unit_price",
    dataIndex: "unit_price",
    width: "8.3%",
  },
  {
    title: "unit_disc",
    dataIndex: "unit_disc",
    width: "6.3%",
  },
  {
    title: "unit_copay",
    dataIndex: "unit_copay",
    width: "7.4%",
  },
  // {
  //   title: "total_price",
  //   dataIndex: "total_price",
  //   width: "13.4%",
  // },
  {
    title: "provider_share",
    dataIndex: "provider_share",
    width: "8%",
  },
];
