/*
 *
 * Types: `@exsys-clinio/menu-items`.
 *
 */
import { SelectListProps, StringNumber } from "@exsys-clinio/types";

export type MenuItemsRefType =
  | React.MutableRefObject<HTMLUListElement | undefined>
  | null
  | undefined;

export interface MenuItemsBaseProps {
  maxHeight?: string;
}

export type MenuItemsDataSourceItemType = SelectListProps<StringNumber>;
export type MenuItemsModeType = "multiple" | undefined;

export interface MenuItemProps {
  height?: string;
  disabled?: boolean;
  selected?: boolean;
  isFirstActiveValue?: boolean;
}

export type GetSelectedKeysProp<M = MenuItemsModeType> = M extends "multiple"
  ? StringNumber[]
  : StringNumber | undefined;

export type MultipleSelectedKeysPropType = GetSelectedKeysProp<"multiple">;

type MenuItemsChangeEventParams<
  T = MenuItemsDataSourceItemType,
  M = MenuItemsModeType
> = {
  selectedKeysOrKey: GetSelectedKeysProp<M>;
  currentSelectedItem?: T;
};

export type MenuItemsChangeEvent<
  T = MenuItemsDataSourceItemType,
  M = MenuItemsModeType
> = (data: MenuItemsChangeEventParams<T, M>) => void;

export interface MenuItemsProps<
  T extends MenuItemsDataSourceItemType,
  M extends MenuItemsModeType
> extends MenuItemsBaseProps {
  dataSource: T[];
  itemHeight?: string;
  disabledKeys?: StringNumber[];
  onChange: MenuItemsChangeEvent<T, M>;
  selectedKeys?: GetSelectedKeysProp<M>;
  mode?: M;
  firstActiveValue?: StringNumber;
  loading?: boolean;
  renderItem?: (option: T) => React.ReactNode;
}
