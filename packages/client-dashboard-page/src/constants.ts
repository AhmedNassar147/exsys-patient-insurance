/*
 *
 * Constants: `@exsys-patient-insurance/client-dashboard-page`.
 *
 */
import { getCurrentDateString } from "@exsys-patient-insurance/helpers";

export const initialState = {
  date_form: getCurrentDateString(),
  date_to: getCurrentDateString(),
  client_id: "",
  no_of_visit: undefined,
};

export const NO_OF_VISITS_OPTIONS = [5, 10, 15].map((value) => ({
  key: value,
  value,
}));

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
