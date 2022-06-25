/*
 *
 * Package: `@exsys-patient-insurance/select-field`.
 *
 */
import { memo, useCallback, useRef, useState, useMemo } from "react";
import InputField, {
  INPUT_FIELD_DEFAULT_PROPS,
} from "@exsys-patient-insurance/input-field";
import { useStopPropagation } from "@exsys-patient-insurance/hooks";
import { removeTranslateLabelFromValue } from "@exsys-patient-insurance/helpers";
import DropDown, { useDropdownRef } from "@exsys-patient-insurance/drop-down";
import ArrowIcon from "@exsys-patient-insurance/arrow-icon";
import LoadingIcon from "@exsys-patient-insurance/loading-icon";
import CloseIcon from "@exsys-patient-insurance/close-icon";
import { colors, zIndices } from "@exsys-patient-insurance/theme-values";
import Tag from "@exsys-patient-insurance/tag";
import MenuItems, {
  MenuItemsChangeEvent,
  useMenuItemsScrollControllers,
  GetSelectedKeysProp,
  MenuItemsDataSourceItemType,
} from "@exsys-patient-insurance/menu-items";
import { StringNumber, onChangeEvent } from "@exsys-patient-insurance/types";
import { SelectFieldProps, SelectModeType } from "./index.interface";

const { inputBorderColor, lighterBlack } = colors;
const { type, ...defaultSelectFieldProps } = INPUT_FIELD_DEFAULT_PROPS;

const SelectField = ({
  margin,
  width,
  options,
  mode,
  disabledKeys,
  onChange,
  disabled,
  name,
  showSearch,
  value,
  autoCapitalize,
  firstActiveValue,
  tabIndex,
  size,
  loading,
  dropDownFooter,
  zIndex,
  allowClear,
  onSearch,
  addonBefore,
  placeholder,
  className,
  renderItem,
  onKeyDown,
  required,
  usePortal,
  ...props
}: SelectFieldProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisibilityState] = useState(false);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const preventOpenModal = useStopPropagation();

  const fieldDisabled = disabled;
  const isFieldRequired = required;

  const [dropdownRef, { openDropdown, closeDropdown }] = useDropdownRef();

  const { unRegisterKeyDownScroll, registerKeyDownScroll } =
    useMenuItemsScrollControllers(menuItemsRef, !!options?.length);

  const isMultipleMode = mode === "multiple";
  const inputSize = isMultipleMode ? "auto" : size;
  const internalInputMinWidth = isMultipleMode ? "20px" : "auto";

  const onMenuItemsChanged: MenuItemsChangeEvent = useCallback(
    ({ selectedKeysOrKey, currentSelectedItem }) => {
      const fieldName = name || "";

      setSearchValue("");
      setIsFocused(() => false);

      if (!isMultipleMode) {
        closeDropdown();
      }

      if (!onChange) {
        return;
      }

      // this means we are in the clear state or removing a tag.
      if (!currentSelectedItem) {
        onChange({
          name: fieldName,
          value: selectedKeysOrKey || "",
          option: currentSelectedItem || {},
          itemOptionData: {},
        });

        return;
      }

      if (typeof selectedKeysOrKey === "string" && autoCapitalize) {
        selectedKeysOrKey = selectedKeysOrKey.toUpperCase();
      }

      onChange({
        name: fieldName,
        value: selectedKeysOrKey,
        option: currentSelectedItem,
        itemOptionData: currentSelectedItem,
      });
    },
    [onChange, name, closeDropdown, isMultipleMode, autoCapitalize]
  );

  const onOpen = useCallback(() => {
    setVisibilityState(true);
    if (showSearch) {
      setIsFocused(true);
    }

    registerKeyDownScroll();
  }, [registerKeyDownScroll, showSearch]);

  const onBeforeClose = useCallback(() => {
    unRegisterKeyDownScroll();
    setVisibilityState(false);
    setIsFocused(() => false);
  }, [unRegisterKeyDownScroll, setIsFocused]);

  const forceLabelToFloat = useMemo(() => {
    if (searchValue || typeof value === "number") {
      return true;
    }

    return !!(value || "").length;
  }, [value, searchValue]);

  const handleClearAll = useCallback(() => {
    onMenuItemsChanged({
      selectedKeysOrKey: isMultipleMode ? [] : "",
    });

    setTimeout(closeDropdown, 10);
  }, [onMenuItemsChanged, isMultipleMode, closeDropdown]);

  const renderAddonAfter = useCallback(() => {
    if (loading) {
      return <LoadingIcon color={inputBorderColor} />;
    }

    const showClearIcon = allowClear && !fieldDisabled && forceLabelToFloat;

    return (
      <>
        {showClearIcon && (
          <CloseIcon
            color={lighterBlack}
            onClick={handleClearAll}
            size="0.8em"
          />
        )}
        {isMultipleMode || showClearIcon ? null : (
          <ArrowIcon
            height="1em"
            width="1em"
            direction={visible ? "up" : "down"}
            color={inputBorderColor}
            onClick={openDropdown}
          />
        )}
      </>
    );
  }, [
    openDropdown,
    isMultipleMode,
    loading,
    allowClear,
    forceLabelToFloat,
    visible,
    fieldDisabled,
    handleClearAll,
  ]);

  const handleDeselectTag = useCallback(
    (currentKey: StringNumber) =>
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const valuesKeys = (value || []) as GetSelectedKeysProp<"multiple">;

        preventOpenModal(event);

        onMenuItemsChanged({
          selectedKeysOrKey: valuesKeys.filter((key) => key !== currentKey),
        });
      },
    [value, preventOpenModal, onMenuItemsChanged]
  );

  const renderTags = useCallback(() => {
    const valuesKeys = (value || []) as GetSelectedKeysProp<"multiple">;
    const computedOptions = options || [];

    if (valuesKeys?.length && computedOptions?.length) {
      const optionsThoseMatchKeys = computedOptions.filter(({ key }) =>
        valuesKeys.includes(key)
      );

      if (!optionsThoseMatchKeys?.length) {
        return null;
      }

      return optionsThoseMatchKeys.map(({ key, value }) => (
        <Tag
          key={key}
          children={value}
          margin="0"
          onClose={handleDeselectTag(key)}
        />
      ));
    }
    return null;
  }, [value, handleDeselectTag, options]);

  const handleSearchChange: onChangeEvent<string> = useCallback(
    ({ value }) => {
      setSearchValue(() => value);
      onSearch?.(value);
    },
    [onSearch]
  );

  const computedOptions = useMemo(() => {
    const computedOptions = options || [];
    if (computedOptions?.length && searchValue) {
      return computedOptions.filter(({ value }) => {
        const stringifiedValue = `${value}`.toLowerCase();
        return stringifiedValue.includes(searchValue.toLowerCase());
      });
    }

    return computedOptions;
  }, [options, searchValue]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Tab") {
        setIsFocused(() => false);
        closeDropdown();

        const optionsLength = computedOptions?.length;
        const isOneOptionOnly = optionsLength === 1;

        if (searchValue) {
          if (isOneOptionOnly) {
            const [foundItem] = computedOptions;
            onMenuItemsChanged({
              selectedKeysOrKey: foundItem.key,
              currentSelectedItem: foundItem,
            });
          } else {
            setSearchValue(() => "");
          }
        }
      }

      onKeyDown?.(event);
    },
    [closeDropdown, computedOptions, onKeyDown, onMenuItemsChanged, searchValue]
  );

  const renderedInputValue = useMemo(() => {
    if (searchValue || isMultipleMode) {
      return searchValue;
    }

    const currentValueKey =
      typeof value === "number" ? value : ((value || "") as string);

    if (currentValueKey || typeof currentValueKey === "number") {
      const computedOptions = options || [];
      const { value: actualKeyValue } =
        computedOptions.find(
          (item) => `${item.key}` === `${currentValueKey}`
        ) || ({} as MenuItemsDataSourceItemType);

      return removeTranslateLabelFromValue(actualKeyValue);
    }

    return "";
  }, [options, value, searchValue, isMultipleMode]);

  return (
    <DropDown
      ref={dropdownRef}
      margin={margin}
      triggerWidth={width}
      tabIndex={tabIndex}
      disabled={fieldDisabled}
      className={className}
      onOpen={onOpen}
      onBeforeClose={onBeforeClose}
      usePortal={usePortal}
      trigger={
        <InputField
          tabIndex={tabIndex}
          margin="0"
          onFocus={openDropdown}
          size={inputSize}
          internalInputMinWidth={internalInputMinWidth}
          addonBefore={isMultipleMode ? renderTags() : addonBefore}
          addonAfter={renderAddonAfter()}
          onClickAddOnAfter={preventOpenModal}
          disabled={fieldDisabled}
          contentEditable={showSearch}
          role={showSearch ? "input" : "div"}
          onChange={showSearch ? handleSearchChange : undefined}
          forceLabelToFloat={forceLabelToFloat}
          value={isFocused ? searchValue : renderedInputValue}
          placeholder={isFocused ? (renderedInputValue as string) : placeholder}
          inputWrapperWrapContent={isMultipleMode}
          name={name}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          required={isFieldRequired}
          {...props}
        />
      }
    >
      <MenuItems
        ref={menuItemsRef}
        mode={mode}
        loading={loading}
        dataSource={computedOptions}
        disabledKeys={disabledKeys}
        selectedKeys={value}
        onChange={onMenuItemsChanged}
        firstActiveValue={firstActiveValue}
        maxHeight="145px"
        renderItem={renderItem}
      />
      {dropDownFooter}
    </DropDown>
  );
};
SelectField.defaultProps = {
  ...defaultSelectFieldProps,
  showSearch: true,
  zIndex: zIndices.dropDown,
  inputWrapperPadding: "3px",
  addonBefore: null,
  allowClear: true,
};
export default memo(SelectField);
export type { SelectFieldProps, SelectModeType };
