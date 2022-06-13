/*
 *
 * `objectIs`: `@exsys-patient-insurance/helpers`
 *
 */
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";
import sortObjectByKeysAndStringify from "./sortObjectByKeysAndStringify";

/**
 * function returns `true` if given objects are equal to each other.
 */
const objectIs = (
  firstObject: RecordTypeWithAnyValue,
  secondObject: RecordTypeWithAnyValue
) => {
  return (
    sortObjectByKeysAndStringify(firstObject) ===
    sortObjectByKeysAndStringify(secondObject)
  );
};

export default objectIs;
