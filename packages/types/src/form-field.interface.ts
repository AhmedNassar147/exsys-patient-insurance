/*
 *
 * Types: `form-field`.
 *
 */
import {
  RecordTypeWithAnyValue,
  BooleanStringType,
  StringNumber,
} from "./base.interface";

export interface SelectListProps<ValueType = string> {
  key: number | string;
  value: ValueType;
  [x: string]: any;
}

export declare type ChangeEventParams<T = any> = {
  name: string;
  value: T;
};

export type onChangeEvent<T = any> = (data: ChangeEventParams<T>) => void;

export type SelectChangeParams = ChangeEventParams & {
  option: RecordTypeWithAnyValue;
  itemOptionData: RecordTypeWithAnyValue;
};

export type SelectChangeHandlerType = (data: SelectChangeParams) => void;

export type SelectionCheckOrSwitchValueType = BooleanStringType | boolean;
export type SelectionCheckOrSwitchEventType =
  ChangeEventParams<SelectionCheckOrSwitchValueType>;
export type SelectionCheckOrSwitchChangeHandlerType =
  onChangeEvent<SelectionCheckOrSwitchValueType>;

export type RadioModeType = "radio";
export type SelectionCheckModes = RadioModeType | undefined;

export interface BaseSelectionCheckProps {
  checked?: SelectionCheckOrSwitchValueType;
  mode?: SelectionCheckModes;
  disabled?: boolean;
  height?: string;
  margin?: string;
  block?: "true" | "";
  width?: string;
  wrapperMarginEnd?: string;
  overflow?: string;
}

export type ClientSelectAddedItemOptions = {
  description_p: string;
  description_s: string;
};

export type ClientSelectDataOptions = {
  canInsert?: boolean;
  multi?: boolean;
  lines?: number;
  data?: SelectListProps[];
};

export interface SelectionCheckProps extends BaseSelectionCheckProps {
  label?: string;
  onChange?: SelectionCheckOrSwitchChangeHandlerType;
  name?: string;
  className?: string;
  fontWeight?: string;
  readonly?: boolean;
}

export type SelectionCheckGroupItemPropType = {
  label: string;
  value: StringNumber;
  disabled?: boolean;
};

export type MultipleSelectedValuesPropType = StringNumber[];

export type GetSelectionCheckGroupValueType<T extends SelectionCheckModes> =
  | (T extends RadioModeType ? StringNumber : MultipleSelectedValuesPropType)
  | undefined;

export interface SelectionCheckGroupProps<T extends SelectionCheckModes> {
  onChange: onChangeEvent<GetSelectionCheckGroupValueType<T>> | onChangeEvent;
  name?: string;
  value?: GetSelectionCheckGroupValueType<T>;
  disabled?: boolean;
  options: SelectionCheckGroupItemPropType[];
  mode?: SelectionCheckModes;
  vertical?: boolean;
  spaceBetweenItems?: string;
  margin?: string;
  padding?: string;
  height?: string;
  width?: string;
  itemFontWeight?: string;
  label?: string;
  labelType?: "inlined";
  className?: string;
}
