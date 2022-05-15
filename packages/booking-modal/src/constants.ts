/*
 *
 * Constants: `@exsys-clinio/booking-modal`.
 *
 */
export const FORM_INITIAL_VALUES = {
  patient_name_p: "",
  patient_name_2_p: "",
  patient_name_3_p: "",
  patient_name_f_p: "",
  phone_m: "",
  gender: "",
  where_find: "",
  id_type: "",
  id_no: "",
  date_of_birth: "",
  nationality: "",
} as const;

export type FormInitialValuesType = typeof FORM_INITIAL_VALUES;

export const minimumBirthDate = "1900-01-01";

const to2Digits = (value: string) =>
  !value || value.length === 1 ? `0${value || 0}` : value;

const [day, month, year] = new Intl.DateTimeFormat(["ban", "id"])
  .format(new Date())
  .split("/");
export const maximumBirthDate = `${year}-${to2Digits(month)}-${to2Digits(day)}`;
