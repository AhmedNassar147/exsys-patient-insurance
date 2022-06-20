/*
 *
 * Helper: `clearObjectFields`.
 *
 */
import { RecordType } from "@exsys-patient-insurance/types";

const clearObjectFields = <T = RecordType>(valuesObject: T) => {
  const clearedValues = Object.keys(valuesObject).reduce(
    (previous, key) => ({
      ...valuesObject,
      ...previous,
      [key]: "",
    }),
    {}
  );

  return clearedValues;
};

export default clearObjectFields;
