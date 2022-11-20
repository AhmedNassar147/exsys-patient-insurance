/*
 *
 * Types: `@exsys-patient-insurance/textarea-field`.
 *
 */
import { InputFieldProps } from "@exsys-patient-insurance/input-field";

export default interface TextAreaFieldProps
  extends Omit<
    InputFieldProps,
    | "type"
    | "size"
    | "inputWrapperPadding"
    | "customInputComponent"
    | "internalInputHeight"
  > {
  initialInputHeight?: string;
}
