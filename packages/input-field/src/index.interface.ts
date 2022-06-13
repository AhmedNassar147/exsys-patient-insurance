/*
 *
 * Types: `@exsys-patient-insurance/input-field`.
 *
 */
import {
  KeysOfRecord,
  onChangeEvent,
  StringNumber,
} from "@exsys-patient-insurance/types";
import {
  LabeledInputPropType,
  LabeledInputProps,
} from "@exsys-patient-insurance/labeled-input";
import {
  INPUT_FIELD_SIZES,
  INPUT_FIELD_TYPES,
  INTERNAL_INPUT_FIELD_SIZES,
} from "./constants";

export type InputFieldSize = KeysOfRecord<typeof INPUT_FIELD_SIZES>;

export type InputFieldSizesWithoutAuto = KeysOfRecord<
  typeof INTERNAL_INPUT_FIELD_SIZES
>;

export type InputFieldType = KeysOfRecord<typeof INPUT_FIELD_TYPES>;

export type InputFieldRefType =
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null;

export interface BaseInputFieldProps
  extends Omit<LabeledInputProps, "type" | "label"> {
  size?: InputFieldSize;
  disabled?: boolean;
  internalInputMinWidth?: string;
  autoFocus?: boolean;
  borderWidth?: string;
  inputWrapperPadding?: string;
  internalInputHeight?: string;
  internalInputMaxHeight?: string;
  useShadow?: boolean;
  color?: string;
  useRedBorderWhenError?: boolean;
  borderColor?: string;
  labelType?: LabeledInputPropType;
  label?: string;
  fontWeight?: string;
  addonAfterWidth?: string;
  internalInputMaxWidth?: string;
  height?: string;
  inputWrapperWrapContent?: boolean;
  required?: boolean;
  backgroundColor?: string;
}

export interface AddonAfterWrapperProps {
  righttoleft: string;
  addonAfterWidth?: string;
}

export interface InputFieldProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      | "defaultValue"
      | "value"
      | "onChange"
      | "type"
      | "size"
      | "width"
      | "form"
      | "multiple"
      | "accept"
      | "alt"
      | "capture"
      | "checked"
      | "crossOrigin"
      | "formAction"
      | "formEncType"
      | "formMethod"
      | "formNoValidate"
      | "formTarget"
      | "about"
      | "autoCapitalize"
      | "list"
      | "children"
      | "height"
    >,
    BaseInputFieldProps {
  defaultValue?: StringNumber;
  onChange?: onChangeEvent;
  onPressEnter?: onChangeEvent;
  name: string;
  type?: InputFieldType;
  addonAfter?: React.ReactNode;
  addonBefore?: React.ReactNode;
  tabIndex?: number;
  customInputComponent?: React.ReactNode;
  autoCapitalize?: boolean;
  forceLabelToFloat?: boolean;
  forceRedBorderToWrapInput?: boolean;
  valueMatchPattern?: string;
  forceShowPlaceholder?: boolean;
  upperCaseFirstCharacter?: boolean;
  onClickAddOnAfter?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
}
