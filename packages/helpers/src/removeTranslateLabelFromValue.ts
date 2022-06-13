/*
 *
 * Helper: `removeTranslateLabelFromValue`.
 *
 */
import { StringNumber } from "@exsys-patient-insurance/types";
import { T_TRANSLATE_REGEXP } from "@exsys-patient-insurance/global-app-constants";

const removeTranslateLabelFromValue = (value: StringNumber) => {
  let curriedValue = value;

  const doesCurrentItemValueHasLabel =
    typeof curriedValue === "string" && T_TRANSLATE_REGEXP.test(curriedValue);
  if (doesCurrentItemValueHasLabel) {
    curriedValue = (curriedValue as string)
      .replace(T_TRANSLATE_REGEXP, "")
      .replace(/[\s|/]/g, "");
  }

  return curriedValue;
};

export default removeTranslateLabelFromValue;
