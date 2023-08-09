/*
 *
 * Constants: `@exsys-patient-insurance/pharm-batches-page`.
 *
 */

import { generateDefaultMonthAndYear } from "@exsys-patient-insurance/helpers";

const { year, month } = generateDefaultMonthAndYear({
  monthsBeforeOrAfter: 1,
});

export const currentGeneratedMonth = month;

export const initialValues = {
  year,
  month: "",
  type: "T",
  tpa_no: "",
};

export const initialNewBatchValues = {
  start_date: "",
  end_date: "",
  tpa_no: "",
};

export const RADIO_OPTIONS_TYPES = [
  {
    label: "byspcfictpa",
    value: "T",
  },
  {
    label: "byalltpa",
    value: "A",
  },
];

export const TABLE_COLUMNS = [
  {
    title: "tpaname",
    dataIndex: "tpa_name",
    width: "10%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "batchno",
    dataIndex: "batch_no",
    width: "9%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "date",
    dataIndex: "batch_date",
    width: "6.5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "strtdt",
    dataIndex: "start_date",
    width: "6.5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "enddate",
    dataIndex: "end_date",
    width: "6.5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "rcivedat",
    dataIndex: "receive_date",
    width: "6.5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "noofclaims",
    dataIndex: "no_of_claims",
    width: "6.3%",
  },
  {
    title: "local",
    dataIndex: "inpatient",
    width: "10%",
    totalCellProps: {
      isFragment: true,
    },
    children: [
      {
        title: "gross",
        dataIndex: "local_clmd_grss",
        width: "49.3%",
      },
      {
        title: "net",
        dataIndex: "local_clmd_net",
        width: "49.3%",
      },
    ],
  },
  {
    title: "imported",
    dataIndex: "outptnt",
    width: "14%",
    totalCellProps: {
      isFragment: true,
    },
    children: [
      {
        title: "grss",
        dataIndex: "imported_clmd_grss",
        width: "49.3%",
      },
      {
        title: "net",
        dataIndex: "imported_clmd_net",
        width: "49.3%",
      },
    ],
  },
  {
    title: "ttol",
    dataIndex: "total",
    width: "24%",
    totalCellProps: {
      isFragment: true,
    },
    children: [
      {
        title: "grss",
        dataIndex: "clmd_amt_grss",
        width: "33%",
      },
      {
        title: "copay",
        dataIndex: "copayment",
        width: "33%",
      },
      {
        title: "net",
        dataIndex: "clmd_amt_net",
        width: "33%",
      },
    ],
  },
];

export const SPEC_TABLE_COLUMNS = [
  {
    title: "batchno",
    dataIndex: "batch_no",
    width: "9%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "strtdt",
    dataIndex: "start_date",
    width: "6.5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "enddate",
    dataIndex: "end_date",
    width: "6.5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "rcivedat",
    dataIndex: "receive_date",
    width: "6.5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "noofclaims",
    dataIndex: "no_of_claims",
    width: "5%",
  },
  {
    title: "local",
    dataIndex: "local",
    width: "13%",
    totalCellProps: {
      isFragment: true,
    },
    children: [
      {
        title: "gross",
        dataIndex: "local_clmd_grss",
        width: "49.3%",
      },
      {
        title: "net",
        dataIndex: "local_clmd_net",
        width: "49.3%",
      },
    ],
  },
  {
    title: "imported",
    dataIndex: "imported",
    width: "13%",
    totalCellProps: {
      isFragment: true,
    },
    children: [
      {
        title: "grss",
        dataIndex: "imported_clmd_grss",
        width: "46.3%",
      },
      {
        title: "net",
        dataIndex: "imported_clmd_net",
        width: "49.3%",
      },
    ],
  },
  {
    title: "ttol",
    dataIndex: "total",
    width: "28%",
    totalCellProps: {
      isFragment: true,
    },
    children: [
      {
        title: "grss",
        dataIndex: "clmd_amt_grss",
        width: "33%",
      },
      {
        title: "copay",
        dataIndex: "copayment",
        width: "33%",
      },
      {
        title: "net",
        dataIndex: "clmd_amt_net",
        width: "33%",
      },
    ],
  },
  {
    title: "cover",
    dataIndex: "action",
    width: "5%",
    totalCellProps: {
      isFragment: true,
    },
  },
  {
    title: "summary",
    dataIndex: "actionx",
    width: "5%",
    totalCellProps: {
      isFragment: true,
    },
  },
];
