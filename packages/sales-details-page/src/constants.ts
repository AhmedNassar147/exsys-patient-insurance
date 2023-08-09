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

export const TABLE_COLUMNS = [
  // {
  //   title: "provider_name",
  //   dataIndex: "provider_name",
  //   width: "16%",
  //   totalCellProps: {
  //     isFragment: true,
  //   },
  // },
  {
    title: "batchno",
    dataIndex: "batch_no",
    width: "6.5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "ucaf_date",
    dataIndex: "ucaf_date",
    width: "7%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "card_no",
    dataIndex: "card_no",
    width: "7%",
    totalCellProps: {
      isFragment: true,
    },
  },

  {
    title: "patientname",
    dataIndex: "patient_name",
    width: "16.5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "form_no",
    dataIndex: "form_no",
    width: "5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "ucaf_id",
    dataIndex: "ucaf_id",
    width: "5%",
    totalCellProps: {
      isFragment: true,
    },
  },

  {
    title: "gross_price",
    dataIndex: "gross_price",
    width: "7%",
  },
  {
    title: "disc",
    dataIndex: "disc",
    width: "6%",
  },
  {
    title: "copay",
    dataIndex: "copay",
    width: "6%",
  },

  {
    title: "cmpnyshre",
    dataIndex: "provider_share",
    width: "7%",
    ellipsis: true,
  },
];

export const detailsTableColumns = [
  {
    title: "-",
    dataIndex: "-",
    width: "24%",
  },
  {
    title: "service_code",
    dataIndex: "service_code",
    width: "9.2%",
  },
  {
    title: "service_name",
    dataIndex: "service_name",
    width: "32.5%",
  },
  {
    title: "qty",
    dataIndex: "qty",
    width: "7.2%",
  },
  {
    title: "unit_price",
    dataIndex: "unit_price",
    width: "7.3%",
  },
  {
    title: "unit_disc",
    dataIndex: "unit_disc",
    width: "6.4%",
  },
  {
    title: "unit_copay",
    dataIndex: "unit_copay",
    width: "6%",
  },
  // {
  //   title: "total_price",
  //   dataIndex: "total_price",
  //   width: "13.4%",
  // },
  {
    title: "cmpnyshre",
    dataIndex: "provider_share",
    width: "7%",
  },
];
