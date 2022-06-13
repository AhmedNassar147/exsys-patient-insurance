/*
 *
 * Constants: `@exsys-patient-insurance/language-select-field`.
 *
 */
import { LANGUAGE_IDS } from "@exsys-patient-insurance/global-app-constants";

export const LANGUAGE_SELECT_FIELD_NAME = "languageId";

export const LANGUAGE_SELECT_FIELD_DEFAULT_PROPS = {
  label: "lng",
  width: "150px",
  name: LANGUAGE_SELECT_FIELD_NAME,
};

export const LANGUAGE_LIST_OPTIONS = [
  {
    key: LANGUAGE_IDS.PRIMARY,
    value: "English",
  },
  {
    key: LANGUAGE_IDS.SECONDARY,
    value: "عربي",
  },
];
