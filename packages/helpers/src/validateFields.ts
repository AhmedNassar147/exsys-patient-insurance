/*
 *
 * `validateFields`: : `@exsys-patient-insurance/helpers`.
 *
 */
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";

const DEFAULT_OPTIONS = Object.freeze({
  excludedFields: [],
  stopWhenFirstError: false,
});

type Options<T = RecordTypeWithAnyValue> = {
  excludedFields: (keyof T)[];
  stopWhenFirstError?: boolean;
};

const validateFields = <T = RecordTypeWithAnyValue>(
  source: T,
  options?: Options<T>
) => {
  const { excludedFields, stopWhenFirstError } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  let errors: RecordTypeWithAnyValue | undefined;

  if (source) {
    let keys = Object.keys(source) as (keyof T)[];

    if (excludedFields?.length) {
      // @ts-ignore we need to ignore the typescript here
      // because we already know it always be key one the given object.
      keys = keys.filter((key) => !excludedFields.includes(key));
    }

    keys.forEach((key) => {
      const value = source[key];

      if (!value) {
        errors = { ...(errors || null), [key]: "* Required" };

        if (stopWhenFirstError) {
          keys.length = 0;
        }
      }
    });
  }

  return errors;
};

export default validateFields;
