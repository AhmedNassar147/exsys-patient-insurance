/*
 *
 * Constants: `@exsys-patient-insurance/services-modal`.
 *
 */
export const initialState = {
  search_word: "",
};

export const TABLE_COLUMNS = [
  {
    title: "srvcod",
    dataIndex: "service_id",
    width: "12%",
  },
  {
    title: "prodctnam",
    dataIndex: "service_name",
    width: "40%",
  },
  {
    title: "prc",
    dataIndex: "price",
    width: "10%",
  },
  {
    title: "copay",
    dataIndex: "copay",
    width: "12%",
  },
  {
    title: "spec",
    dataIndex: "specialty_type",
    width: "10%",
  },
  {
    title: "apprvl",
    dataIndex: "approval",
    width: "10%",
  },
];
