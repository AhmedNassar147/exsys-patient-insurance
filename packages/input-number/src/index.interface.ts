/*
 *
 * Types: `@exsys-patient-insurance/input-number`.
 *
 */
import {
  InputFieldProps,
  InputFieldSizesWithoutAuto,
} from "@exsys-patient-insurance/input-field";

export default interface InputNumberFieldProps
  extends Omit<
    InputFieldProps,
    | "type"
    | "addonBefore"
    | "addonAfter"
    | "size"
    | "borderWidth"
    | "onClickAddOnAfter"
    | "inputWrapperPadding"
    | "customInputComponent"
    | "internalInputHeight"
    | "internalInputMaxHeight"
    | "value"
    | "defaultValue"
    | "autoCapitalize"
    | "children"
    | "autoComplete"
    | "minLength"
    | "max"
    | "min"
  > {
  size?: InputFieldSizesWithoutAuto;
  value?: number;
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
  formatShape?: string;
  formatBeforeValue?: boolean;
}

export type CounterActionTypes = "increase" | "decrease";
