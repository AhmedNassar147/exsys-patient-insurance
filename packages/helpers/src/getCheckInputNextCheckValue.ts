/*
 *
 * Helper: `getCheckInputNextCheckValue`.
 *
 */
import { BooleanStringType } from "@exsys-patient-insurance/types";

const config = {
  active: ["A", "I"] as BooleanStringType[],
  normal: ["y", "n"] as BooleanStringType[],
};

interface GetCheckInputNextCheckValueOptions {
  checkedState: boolean;
  usingBooleanString?: boolean;
  capitalizeBooleanString?: boolean;
  isActiveBooleanStringValue?: boolean;
}

const getCheckInputNextCheckValue = ({
  checkedState,
  usingBooleanString,
  capitalizeBooleanString,
  isActiveBooleanStringValue,
}: GetCheckInputNextCheckValueOptions) => {
  let value: boolean | BooleanStringType = checkedState;

  if (usingBooleanString) {
    const [yes, no] = config[isActiveBooleanStringValue ? "active" : "normal"];

    value = checkedState ? yes : no;
    return (
      capitalizeBooleanString ? value.toUpperCase() : value
    ) as BooleanStringType;
  }

  return value;
};

export default getCheckInputNextCheckValue;
