/*
 *
 * Package: `@exsys-patient-insurance/menu-items`.
 *
 */
import {
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { removeTranslateLabelFromValue } from "@exsys-patient-insurance/helpers";
import MenuItem, {
  MENU_ITEM_DEFAULT_PROPS,
} from "@exsys-patient-insurance/menu-item";
import AsyncAwaiter from "@exsys-patient-insurance/async-awaiter";
import { StringNumber } from "@exsys-patient-insurance/types";
import { MenuItemsList } from "./styled";
import {
  MenuItemsDataSourceItemType,
  MenuItemsProps,
  MenuItemsModeType,
  GetSelectedKeysProp,
  MultipleSelectedKeysPropType,
  MenuItemsChangeEvent,
  MenuItemsRefType,
} from "./index.interface";

const { height: defaultMenuItemHeight } = MENU_ITEM_DEFAULT_PROPS;

const MenuItems = <
  T extends MenuItemsDataSourceItemType,
  M extends MenuItemsModeType
>(
  {
    dataSource,
    onChange,
    selectedKeys,
    disabledKeys,
    itemHeight = defaultMenuItemHeight,
    mode,
    maxHeight,
    firstActiveValue: _firstActiveValue,
    loading,
    renderItem,
  }: MenuItemsProps<T, M>,
  ref: MenuItemsRefType
) => {
  const menuItemsRef = useRef<HTMLUListElement>(null);
  // const elmRefs = useRef<Record<string| number, HTMLLIElement | null>>({})

  const hasSelectedKeys = Array.isArray(selectedKeys)
    ? !!selectedKeys.length
    : typeof selectedKeys !== "undefined" && !!selectedKeys;

  const dataSourceLength = dataSource?.length;
  const isMultipleMode = mode === "multiple";

  const firstActiveValue =
    typeof _firstActiveValue === "number" || !!_firstActiveValue
      ? `${_firstActiveValue}`
      : "";

  // const setListItemRef = useCallback((key: number | string) => (instance: HTMLLIElement | null) => {
  //   elmRefs.current[key] = instance
  // }, [])

  const scrollToElementByIndex = useCallback(
    (foundItemIndex: number) => {
      const { current: menuCurrentRef } = menuItemsRef;

      if (foundItemIndex > -1 && menuCurrentRef) {
        const currentListItemElement =
          menuCurrentRef.childNodes[foundItemIndex];

        if (currentListItemElement) {
          const yScrollValue =
            (currentListItemElement as HTMLLIElement).offsetTop || 0;

          menuCurrentRef.scrollTo(0, yScrollValue);
        }
      }
    },
    [menuItemsRef]
  );

  useLayoutEffect(() => {
    const optionsLength = dataSource?.length;

    // we want to scroll when items length is > 5
    if (firstActiveValue && optionsLength > 5 && !hasSelectedKeys) {
      const foundItemIndex = dataSource.findIndex(({ key: _key }: T) => {
        const key = typeof _key === "number" ? `${_key}` : _key;
        return key === firstActiveValue;
      });

      scrollToElementByIndex(foundItemIndex);
    }
  }, [dataSource, firstActiveValue, scrollToElementByIndex, hasSelectedKeys]);

  useLayoutEffect(() => {
    const optionsLength = dataSource.length;

    // we want to scroll when items length is > 5
    if (optionsLength > 5 && hasSelectedKeys) {
      const keysArray = Array.isArray(selectedKeys)
        ? selectedKeys
        : [selectedKeys];

      const lastItemKey = keysArray[keysArray.length - 1];

      const foundItemIndex = dataSource.findIndex(
        ({ key }: T) => key === lastItemKey
      );

      scrollToElementByIndex(foundItemIndex);
    }
  }, [dataSource, scrollToElementByIndex, selectedKeys]);

  useImperativeHandle(ref, () => menuItemsRef.current as HTMLUListElement);

  const handleChange = useCallback(
    (itemValues: T, isSelected: boolean, isDisabled?: boolean) => () => {
      if (isDisabled) {
        return;
      }

      if (onChange) {
        const {
          key: currentKey,
          value: itemValue,
          ...otherItemValues
        } = itemValues;

        let nextSelectedKeys: MultipleSelectedKeysPropType | StringNumber =
          isSelected && isMultipleMode ? "" : currentKey;

        if (isMultipleMode) {
          const currentSelectedKeys =
            selectedKeys as MultipleSelectedKeysPropType;
          nextSelectedKeys = isSelected
            ? currentSelectedKeys?.filter((key) => key !== currentKey)
            : [...(currentSelectedKeys || []), currentKey];
        }

        const nextSelectedItem = !nextSelectedKeys
          ?.toString?.()
          ?.replace(/\s/g, "").length
          ? undefined
          : {
              key: currentKey,
              value: removeTranslateLabelFromValue(itemValue),
              ...otherItemValues,
            };

        onChange({
          selectedKeysOrKey: nextSelectedKeys as GetSelectedKeysProp<M>,
          currentSelectedItem: nextSelectedItem as T,
        });
      }
    },
    [onChange, isMultipleMode, selectedKeys]
  );

  const notDataSource = !dataSourceLength;

  const renderItems = useCallback(() => {
    if (!dataSource?.length) {
      return null;
    }
    return dataSource?.map((itemValues) => {
      const { key, value } = itemValues;

      const actualKey = typeof key === "number" ? `${key}` : key;

      const isFirstActiveValue =
        !hasSelectedKeys && actualKey === firstActiveValue;

      const isSelected = isMultipleMode
        ? (selectedKeys as MultipleSelectedKeysPropType)?.includes(key)
        : selectedKeys === key;

      const disabled = disabledKeys?.includes(key);

      return (
        <MenuItem
          key={key}
          // ref={setListItemRef(key)}
          disabled={disabled}
          selected={isSelected || isFirstActiveValue}
          height={itemHeight}
          onClick={handleChange(itemValues, isSelected, disabled)}
          hideCheckIcon={isFirstActiveValue}
          title={`${value}`}
        >
          {renderItem ? renderItem(itemValues) : value}
        </MenuItem>
      );
    });
  }, [
    dataSource,
    hasSelectedKeys,
    isMultipleMode,
    selectedKeys,
    disabledKeys,
    firstActiveValue,
    handleChange,
    renderItem,
  ]);

  const computedMaxHeight = notDataSource ? "60px" : maxHeight;

  return (
    <MenuItemsList
      ref={menuItemsRef}
      maxHeight={computedMaxHeight}
      tabIndex={1}
    >
      <AsyncAwaiter
        noData={notDataSource}
        loading={loading}
        noWrapper={!notDataSource}
        height="50px"
      >
        {renderItems()}
      </AsyncAwaiter>
    </MenuItemsList>
  );
};

// @ts-ignore ignore react "forwardRef" misleading types.
export default memo(forwardRef(MenuItems));
export { default as useMenuItemsScrollControllers } from "./hooks/useMenuItemsScrollControllers";
export type {
  MenuItemsDataSourceItemType,
  MenuItemsModeType,
  MenuItemsChangeEvent,
  GetSelectedKeysProp,
};
