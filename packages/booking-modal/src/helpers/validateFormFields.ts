/*
 *
 * Helper: `validateFormFields`.
 *
 */
import { validateFields } from "@exsys-clinio/helpers";
import convertInputDateToNormalFormat from "./convertInputDateToNormalFormat";
import { minimumBirthDate } from "../constants";
import type { FormInitialValuesType } from "../constants";

const checkIfThisDateBeforeThanOther = (date1: Date, date2: Date) =>
  date1 < date2;

type ResultType = Record<keyof FormInitialValuesType, string>;

const validateFormFields = (formValues: FormInitialValuesType) => {
  const {
    patient_name_p,
    patient_name_f_p,
    phone_m,
    date_of_birth,
    gender,
    id_type,
    id_no,
    nationality,
  } = formValues;

  let formErrors = {} as ResultType;

  const idFields = {
    id_type,
    id_no,
  };

  let valuesToValidate = {
    patient_name_p,
    patient_name_f_p,
    phone_m,
    date_of_birth,
    gender,
    nationality,
    ...idFields,
  };

  formErrors = (validateFields(valuesToValidate) || {}) as ResultType;

  if (
    date_of_birth &&
    checkIfThisDateBeforeThanOther(
      new Date(convertInputDateToNormalFormat(date_of_birth)),
      new Date(minimumBirthDate)
    )
  ) {
    formErrors = {
      ...formErrors,
      [date_of_birth]: `* __t__minumnval ${minimumBirthDate} `,
    };
  }

  return formErrors;
};

export default validateFormFields;
