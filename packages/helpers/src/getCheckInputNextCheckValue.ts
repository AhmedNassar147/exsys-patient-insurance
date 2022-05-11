/*
 *
 * Helper: `getCheckInputNextCheckValue`.
 *
 */
import { BooleanStringType } from "@exsys-clinio/types";

const getCheckInputNextCheckValue = (
  checkedState: boolean,
  usingBooleanString?: boolean,
  capitalizeBooleanString?: boolean
) => {
  let value: boolean | BooleanStringType = checkedState;

  if (usingBooleanString) {
    value = checkedState ? "y" : "n";
    return (capitalizeBooleanString
      ? value.toUpperCase()
      : value) as BooleanStringType;
  }

  return value;
};

export default getCheckInputNextCheckValue;
