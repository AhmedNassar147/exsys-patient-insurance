/*
 *
 * Component: `BodyCellInputNode`.
 *
 */
import { memo, useMemo, useCallback } from "react";
// import DatePicker from "@exsys-patient-insurance/date-picker-field";
import Checkbox from "@exsys-patient-insurance/selection-check";
import SelectField from "@exsys-patient-insurance/select-field";
import InputField from "@exsys-patient-insurance/input-field";
// import InputNumber from "@exsys-patient-insurance/input-number";
import {
  onChangeEvent,
  TableRowRecordType,
  OnTableCellInputChange,
  TableCellInputFunctionsType,
  ColumnInputProps,
} from "@exsys-patient-insurance/types";
import { TABLE_EDITABLE_CELL_TYPES } from "../constants";

interface BodyCellInputNodeProps<T extends TableRowRecordType>
  extends TableCellInputFunctionsType<T> {
  dataIndex: string;
  currentRecord: T;
  rowIndex: number;
  disabled?: boolean;
  onInputChange: OnTableCellInputChange;
  inputProps?: ColumnInputProps<T>;
}

const BodyCellInputNode = <T extends TableRowRecordType>({
  inputProps,
  dataIndex,
  currentRecord,
  rowIndex,
  onInputChange,
  recordInputsDisabled,
}: BodyCellInputNodeProps<T>) => {
  const {
    min,
    max,
    numberFormatterShape,
    name,
    // dateMode,
    // dateInputShowTime,
    // dateFormat,
    selectOptions,
    inputType,
    allowSelectClear,
  } = inputProps || {};

  const inputName = name || dataIndex;
  const value = currentRecord[inputName];

  const fieldDisabled = useMemo(() => {
    if (recordInputsDisabled instanceof Function) {
      return recordInputsDisabled({
        record: currentRecord,
        index: rowIndex,
        dataIndex,
      });
    }

    return !!recordInputsDisabled?.includes?.(dataIndex);
  }, [currentRecord, dataIndex, recordInputsDisabled, rowIndex]);

  const onChange: onChangeEvent = useCallback(
    (event) =>
      onInputChange?.({
        ...event,
        rowIndex,
      }),
    [onInputChange, rowIndex]
  );

  const baseProps = {
    name: inputName,
    onChange,
    value,
    disabled: fieldDisabled,
  };

  const isNumberInput = inputType === TABLE_EDITABLE_CELL_TYPES.number;

  const minMaxValuesProps = useMemo(() => {
    const minValue = min instanceof Function ? min(currentRecord) : min;
    const maxValue = max instanceof Function ? max(currentRecord) : max;
    const isMaxExceeded = typeof maxValue === "number" && +value > maxValue;

    return {
      [isNumberInput ? "min" : "minLength"]: minValue,
      [isNumberInput ? "max" : "maxLength"]: maxValue,
      ...(isNumberInput
        ? {
            useErrorHint: false,
            useRedBorderWhenError: isMaxExceeded,
            useTooltip: false,
            error: isMaxExceeded ? `max value is ${maxValue}` : "",
          }
        : null),
    };
  }, [min, currentRecord, max, value, isNumberInput]);

  const memoizedSelectOptions = useMemo(
    () =>
      selectOptions instanceof Function
        ? selectOptions(currentRecord)
        : selectOptions,
    [currentRecord, selectOptions]
  );

  switch (inputType) {
    //   case TABLE_EDITABLE_CELL_TYPES.date:
    //     return (
    //       <DatePicker
    //         {...baseProps}
    //         mode={dateMode}
    //         showTime={dateInputShowTime}
    //         format={dateFormat}
    //       />
    //     );

    case TABLE_EDITABLE_CELL_TYPES.checkbox:
      return <Checkbox {...baseProps} width="auto" checked={value} />;

    case TABLE_EDITABLE_CELL_TYPES.select:
      return (
        <SelectField
          {...baseProps}
          options={memoizedSelectOptions}
          width="95%"
          height="30px"
          allowClear={allowSelectClear}
        />
      );

    default:
      const Component = InputField;
      // const Component = isNumberInput ? InputNumber : InputField;
      const defaultInputProps = {
        ...baseProps,
        width: "95%",
        ...minMaxValuesProps,
        ...(isNumberInput && numberFormatterShape
          ? {
              formatShape: numberFormatterShape,
            }
          : null),
      };

      return <Component {...defaultInputProps} />;
  }
};

export default memo(BodyCellInputNode);
