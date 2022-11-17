/*
 *
 * Helper: `getBooleanValueFromMaybeNonOne`.
 *
 */
import isTruthyBooleanString from "./isTruthyBooleanString";
import { BooleanStringType } from "@exsys-patient-insurance/types";

//  backend can't send `true` | `false` booleans.
// so we parse them.
const getBooleanValueFromMaybeNonOne = (
  value?: boolean | BooleanStringType
) => {
  let isStringValue = typeof value === "string";
  let isActiveBooleanStringValue = ["A", "I"].includes(value as string);
  let actualValue = value as boolean;

  if (isStringValue && value) {
    actualValue = isTruthyBooleanString(value as BooleanStringType);
  }

  return { actualValue, isStringValue, isActiveBooleanStringValue };
};

export default getBooleanValueFromMaybeNonOne;
