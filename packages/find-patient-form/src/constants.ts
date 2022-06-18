/*
 *
 * Constants: `@exsys-patient-insurance/find-patient-form`.
 *
 */
export const SEARCH_RADIO_OPTIONS = [
  {
    label: "cardno",
    value: "C",
  },
  {
    label: "bnfcryid",
    value: "N",
  },
  {
    label: "phn",
    value: "P",
  },
];

export const initialValues = {
  search_type: "C",
  search_value: "",
};
