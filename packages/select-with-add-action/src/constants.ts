/*
 *
 * Constants: `@exsys-patient-insurance/select-with-add-action`.
 *
 */
import {
  ClientSelectDataOptions,
  ValuesOfRecordAsOptions,
} from "@exsys-patient-insurance/types";

export const DEFAULT_CLIENT_SELECT_DATA_OPTIONS: ClientSelectDataOptions =
  Object.freeze({
    data: [],
    lines: 1,
    canInsert: false,
    multi: false,
  });

export const FORM_KEYS_NAMES = Object.freeze({
  EN_INPUT: "enInputValue",
  AR_INPUT: "arInputValue",
} as const);

export const INITIAL_FORM_STATE = Object.keys(FORM_KEYS_NAMES).reduce(
  (previous, key) => ({
    ...previous,
    [key]: "",
  }),
  {} as Record<ValuesOfRecordAsOptions<typeof FORM_KEYS_NAMES>, string>
);
