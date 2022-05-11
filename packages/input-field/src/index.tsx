/*
 *
 * Package: `@exsys-clinio/input-field`.
 *
 */
import { memo, forwardRef, useMemo } from "react";
import { useTranslateIdFactory } from "@exsys-clinio/labels-provider";
import LabeledInput from "@exsys-clinio/labeled-input";
import FieldErrorHint from "@exsys-clinio/field-error-hint";
import { useMakeSelectIsRTLLayout } from "@exsys-clinio/app-config-store";
import { RecordTypeWithAnyValue } from "@exsys-clinio/types";
import useCreateChangeEventFromDomInput from "./hooks/useCreateChangeEventFromDomInput";
import {
  inputCssHelper,
  InputFieldWrapper,
  StyledInput,
  AddonAfterWrapper,
  InputFieldContainer,
} from "./styled";
import {
  INPUT_FIELD_DEFAULT_PROPS,
  INTERNAL_INPUT_FIELD_SIZES,
} from "./constants";
import {
  InputFieldProps,
  BaseInputFieldProps,
  InputFieldSizesWithoutAuto,
  InputFieldRefType,
} from "./index.interface";

const usePageControls = () => ({
  fieldsData: {} as RecordTypeWithAnyValue,
});

const InputField = (props: InputFieldProps, inputRef?: InputFieldRefType) => {
  const {
    margin,
    width,
    value,
    size,
    onChange,
    addonAfter,
    addonBefore,
    tabIndex,
    disabled,
    className,
    onClickAddOnAfter,
    autoFocus,
    onPressEnter,
    onKeyDown,
    borderWidth,
    placeholder,
    forceShowPlaceholder,
    inputWrapperPadding,
    customInputComponent,
    useShadow,
    autoCapitalize,
    color,
    error,
    borderColor,
    useRedBorderWhenError,
    label,
    labelType,
    hidden,
    forceLabelToFloat,
    labelmarginstart,
    useErrorHint,
    fontWeight,
    addonAfterWidth,
    forceRedBorderToWrapInput,
    height,
    inputWrapperWrapContent,
    valueMatchPattern,
    required,
    name,
    upperCaseFirstCharacter,
    ...inputProps
  } = { ...INPUT_FIELD_DEFAULT_PROPS, ...props };

  const {
    fieldsData: { [name]: fieldOptions },
  } = usePageControls();

  const translateLabelId = useTranslateIdFactory();
  const isRightToLeft = useMakeSelectIsRTLLayout();

  const { handleEventChange, handleKeyDown } = useCreateChangeEventFromDomInput(
    {
      onChange,
      onPressEnter,
      onKeyDown,
      autoCapitalize,
      valueMatchPattern,
      upperCaseFirstCharacter,
    }
  );

  // const inputDir = useMemo(() => {
  //   return (!value && isRightToLeft) || isThisTextContainsArabicValue(value) ? "rtl" : dir
  // }, [value, dir, isRightToLeft]);

  const isLabeledInput = !!label;

  const computedPlaceholder = useMemo(() => {
    return isLabeledInput && !forceShowPlaceholder
      ? ""
      : placeholder
      ? (translateLabelId(placeholder) as string)
      : placeholder;
  }, [placeholder, translateLabelId, isLabeledInput, forceShowPlaceholder]);

  const InputComponent = useMemo(
    () => (customInputComponent || StyledInput) as React.ElementType,
    [customInputComponent]
  );

  const {
    displayed,
    required: fieldRequiredFromOptions,
    enabled,
  } = fieldOptions || {};

  if (displayed === "N") {
    return null;
  }

  const fieldDisabled = disabled || enabled === "N";
  const isFieldRequired = required || fieldRequiredFromOptions === "Y";
  const inputValue = typeof value === "undefined" ? "" : value;

  const inputNode = (
    <InputFieldWrapper
      size={size}
      color={color}
      tabIndex={tabIndex}
      disabled={fieldDisabled}
      autoFocus={!fieldDisabled && autoFocus}
      inputWrapperPadding={inputWrapperPadding}
      useShadow={useShadow}
      borderWidth={borderWidth}
      borderColor={borderColor}
      height={height}
      inputWrapperWrapContent={inputWrapperWrapContent}
      required={isFieldRequired}
      useRedBorderWhenError={
        (!!error || forceRedBorderToWrapInput) && useRedBorderWhenError
      }
    >
      {addonBefore}
      <InputComponent
        ref={inputRef}
        disabled={fieldDisabled}
        placeholder={computedPlaceholder}
        onChange={fieldDisabled ? undefined : handleEventChange}
        onKeyDown={fieldDisabled ? undefined : handleKeyDown}
        value={inputValue}
        fontWeight={fontWeight}
        addonAfterWidth={!!addonAfter ? addonAfterWidth : "0px"}
        tabIndex={tabIndex ? tabIndex + 1 : 2}
        name={name}
        // autoFocus={autoFocus}
        {...inputProps}
      />
      {!!addonAfter && (
        <AddonAfterWrapper
          onClick={fieldDisabled ? undefined : onClickAddOnAfter}
          righttoleft={`${isRightToLeft}`}
          addonAfterWidth={addonAfterWidth}
        >
          {addonAfter}
        </AddonAfterWrapper>
      )}
    </InputFieldWrapper>
  );

  switch (isLabeledInput) {
    case true:
      return (
        <LabeledInput
          width={width}
          margin={margin}
          labelmarginstart={labelmarginstart}
          label={label || placeholder || ""}
          error={error}
          value={forceLabelToFloat ? "  " : value}
          type={labelType}
          hidden={hidden}
          useErrorHint={useErrorHint}
        >
          {inputNode}
        </LabeledInput>
      );

    default:
      return (
        <InputFieldContainer
          margin={margin}
          width={width}
          className={className}
        >
          {inputNode}

          {useErrorHint && (
            <FieldErrorHint errorLabelId={error} alignself="flex-start" />
          )}
        </InputFieldContainer>
      );
  }
};

export default memo(forwardRef(InputField));
export {
  INPUT_FIELD_DEFAULT_PROPS,
  INTERNAL_INPUT_FIELD_SIZES,
  inputCssHelper,
};
export type {
  InputFieldProps,
  BaseInputFieldProps,
  InputFieldSizesWithoutAuto,
};
