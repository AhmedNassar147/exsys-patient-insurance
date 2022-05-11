/*
 *
 * Types: `@exsys-clinio/select-field`.
 *
 */
import {
  InputFieldProps,
  InputFieldSizesWithoutAuto,
} from "@exsys-clinio/input-field";
import {
  MenuItemsDataSourceItemType,
  MenuItemsModeType,
} from "@exsys-clinio/menu-items";
import { StringNumber, SelectChangeHandlerType } from "@exsys-clinio/types";

export type SelectModeType = MenuItemsModeType;

export interface SelectFieldProps
  extends Omit<
    InputFieldProps,
    | "type"
    | "addonAfter"
    | "onChange"
    | "value"
    | "defaultValue"
    | "onClickAddOnAfter"
    | "internalInputMinWidth"
    | "onPressEnter"
    | "borderWidth"
    | "customInputComponent"
    | "internalInputHeight"
    | "internalInputMaxHeight"
    | "max"
    | "min"
    | "maxLength"
    | "minLength"
    | "size"
    | "forceLabelToFloat"
    | "pattern"
    | "autoComplete"
  > {
  size?: InputFieldSizesWithoutAuto;
  value?: StringNumber | StringNumber[];
  mode?: SelectModeType;
  options?: MenuItemsDataSourceItemType[];
  showSearch?: boolean;
  disabledKeys?: StringNumber[];
  onChange?: SelectChangeHandlerType;
  firstActiveValue?: StringNumber;
  loading?: boolean;
  dropDownFooter?: React.ReactNode;
  zIndex?: number;
  allowClear?: boolean;
  renderItem?: (option: MenuItemsDataSourceItemType) => React.ReactNode;
  onSearch?: (currentSearchValue: string) => void;
  usePortal?: boolean;
}
