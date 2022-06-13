/*
 *
 * `isObjectHasKey`: `@exsys-patient-insurance/helpers`.
 *
 */
import { isObjHasData } from "./isThereData";
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";

const isObjectHasKey = (
  source: RecordTypeWithAnyValue,
  key: string
): boolean => {
  if (!isObjHasData(source) || !key) {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(source, key);
};

export default isObjectHasKey;
