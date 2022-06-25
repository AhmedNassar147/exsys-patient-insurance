/*
 *
 * Package: `@exsys-patient-insurance/input-field`.
 *
 */
import { memo, forwardRef, useMemo } from "react";
import { useTranslateIdFactory } from "@exsys-patient-insurance/labels-provider";
import LabeledInput from "@exsys-patient-insurance/labeled-input";
import FieldErrorHint from "@exsys-patient-insurance/field-error-hint";
import { useMakeSelectIsRTLLayout } from "@exsys-patient-insurance/app-config-store";
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
    backgroundColor,
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
    forceFloatingLabel,
    ...inputProps
  } = { ...INPUT_FIELD_DEFAULT_PROPS, ...props };

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

  const fieldDisabled = disabled;
  const isFieldRequired = required;
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
      backgroundColor={backgroundColor}
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
          forceFloatingLabel={forceFloatingLabel}
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
