/*
 *
 * Constants: `@exsys-patient-insurance/mi-batches-page`.
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
    title: "inptnt",
    dataIndex: "inpatient",
    width: "20%",
    totalCellProps: {
      isFragment: true,
    },
    children: [
      {
        title: "noofclms",
        dataIndex: "adt_no_of_clms",
        width: "33.3%",
      },
      {
        title: "clmdgrss",
        dataIndex: "adt_clmd_grss",
        width: "33.3%",
      },
      {
        title: "clmdnet",
        dataIndex: "adt_clmd_net",
        width: "33.3%",
      },
    ],
  },
  {
    title: "outptnt",
    dataIndex: "outptnt",
    width: "20%",
    totalCellProps: {
      isFragment: true,
    },
    children: [
      {
        title: "noofclms",
        dataIndex: "opd_no_of_clms",
        width: "33.3%",
      },
      {
        title: "clmdgrss",
        dataIndex: "opd_clmd_grss",
        width: "33.3%",
      },
      {
        title: "clmdnet",
        dataIndex: "opd_clmd_net",
        width: "33.3%",
      },
    ],
  },
  {
    title: "ttol",
    dataIndex: "total",
    width: "13%",
    totalCellProps: {
      isFragment: true,
    },
    children: [
      {
        title: "clmdgrss",
        dataIndex: "clmd_amt_grss",
        width: "50%",
      },
      {
        title: "clmdnet",
        dataIndex: "clmd_amt_net",
        width: "50%",
      },
    ],
  },
];
