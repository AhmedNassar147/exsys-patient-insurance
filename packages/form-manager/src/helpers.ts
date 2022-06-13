/*
 *
 * Helpers: `@exsys-patient-insurance/form-manager`.
 *
 */
import { isObjHasData } from "@exsys-patient-insurance/helpers";
import { Validate, ErrorType } from "./index.interface";

type ValidationOptions<T> = {
  values: T;
  validate?: Validate<T>;
};

export const runValidators = <T extends Record<string, any>>({
  values,
  validate,
}: ValidationOptions<T>): ErrorType<T> => {
  // @ts-ignore
  let errors: ErrorType<T> = {};

  if (typeof validate === "function") {
    const formErrors = validate(values);

    if (formErrors && typeof formErrors === "object") {
      errors = formErrors as T;
    }
  }

  return errors;
};

const isThereErrors = (obj: Record<string, string>): boolean =>
  isObjHasData(obj) &&
  Object.keys(obj).some((key) => !!(obj[key] || "").trim());

export const checkCanSubmit = <T>({
  values,
  validate,
}: ValidationOptions<T>) => {
  const errors = runValidators({
    values,
    validate,
  });

  const isErrors = isThereErrors(errors);

  return { canSubmit: !isErrors, finalErrors: errors };
};
