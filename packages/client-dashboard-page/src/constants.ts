/*
 *
 * Constants: `@exsys-patient-insurance/client-dashboard-page`.
 *
 */
import { getCurrentDateString } from "@exsys-patient-insurance/helpers";

export const initialState = {
  date_from: getCurrentDateString({
    day: 1,
    month: 0,
  }),
  date_to: getCurrentDateString({
    day: 31,
    month: 11,
  }),
  no_of_visit: 1,
};

export const TABLE_COLUMNS = [
  {
    title: "cardno",
    dataIndex: "patient_card_no",
    width: "13%",
  },
  {
    title: "ptntnm",
    dataIndex: "patient_name",
    width: "54.5%",
  },
  {
    title: "startdate",
    dataIndex: "start_from",
    width: "20%",
  },
  {
    title: "ttlvists",
    dataIndex: "total_visit",
    width: "12%",
  },
];

export const CARD_HEIGHT = "200px";
