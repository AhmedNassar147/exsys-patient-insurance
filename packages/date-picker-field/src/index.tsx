/*
 *
 * Package: `@exsys-patient-insurance/date-picker-field`.
 *
 */
import { memo, useMemo, useCallback } from "react";
import InputField from "@exsys-patient-insurance/input-field";
import {
  convertNormalFormattedDateToInputDate,
  convertInputDateToNormalFormat,
} from "@exsys-patient-insurance/helpers";
import { onChangeEvent } from "@exsys-patient-insurance/types";
import { StyledDateInput } from "./styled";

interface DatePickerFieldProps {
  name: string;
  label?: string;
  width?: string;
  value?: string;
  error?: string;
  onChange?: onChangeEvent;
  min?: string;
  max?: string;
  disabled?: boolean;
}

const nonNativeDateRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;

const DatePickerField = ({
  value,
  onChange,
  min,
  max,
  ...props
}: DatePickerFieldProps) => {
  const normalizedValue = useMemo(() => {
    if (value && nonNativeDateRegex.test(value)) {
      return convertNormalFormattedDateToInputDate(value);
    }

    return value || undefined;
  }, [value]);

  const handleChange: onChangeEvent = useCallback(
    ({ name, value }) =>
      onChange?.({
        name,
        value: convertInputDateToNormalFormat(value),
      }),
    [onChange]
  );

  const inputMinMaxProps = useMemo(
    () => ({
      min:
        min && nonNativeDateRegex.test(min)
          ? convertNormalFormattedDateToInputDate(min)
          : min || undefined,
      max:
        max && nonNativeDateRegex.test(max)
          ? convertNormalFormattedDateToInputDate(max)
          : max || undefined,
    }),
    [min, max]
  );

  return (
    <InputField
      customInputComponent={StyledDateInput}
      type="date"
      forceFloatingLabel
      value={normalizedValue}
      onChange={handleChange}
      {...props}
      {...inputMinMaxProps}
    />
  );
};

export default memo(DatePickerField);
