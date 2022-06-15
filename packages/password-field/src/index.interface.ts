/*
 *
 * Types: `@exsys-patient-insurance/password-field`.
 *
 */
import {
  InputFieldProps,
  InputFieldSizesWithoutAuto,
} from "@exsys-patient-insurance/input-field";

export default interface PasswordFieldProps
  extends Omit<
    InputFieldProps,
    | "type"
    | "addonAfter"
    | "addonBefore"
    | "internalInputMinWidth"
    | "size"
    | "borderWidth"
    | "onClickAddOnAfter"
    | "inputWrapperPadding"
    | "customInputComponent"
    | "internalInputHeight"
    | "internalInputMaxHeight"
  > {
  size?: InputFieldSizesWithoutAuto;
}
