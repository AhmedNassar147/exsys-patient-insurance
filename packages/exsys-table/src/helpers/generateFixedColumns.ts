/*
 *
 * Helper: `generateFixedColumns`.
 *
 */
import {
  TableRowRecordType,
  TableColumnProps,
} from "@exsys-patient-insurance/types";
import calculateCellStringWidthToPixelNumber from "./calculateCellStringWidthToPixelNumber";
import getCheckableInputRenderedValue from "./getCheckableInputRenderedValue";
import getSelectRenderedValue from "./getSelectRenderedValue";
import { SELECTION_COLUMN_WIDTH, EXPAND_COLUMN_WIDTH } from "../constants";

interface GenerateFixedColumnsProps<T extends TableRowRecordType> {
  containerWidthNumber: number;
  columnsFromProps: TableColumnProps<T>[];
  hasSelectionColumn?: boolean;
  hasExpandableColumn?: boolean;
  showExpandColumn?: boolean;
}

const generateFixedColumns = <T extends TableRowRecordType>({
  containerWidthNumber,
  columnsFromProps,
  hasSelectionColumn,
  showExpandColumn,
}: GenerateFixedColumnsProps<T>) => {
  const columnsCount = columnsFromProps?.length ?? 0;
  let doesAnyColumnHasInputType = false;

  if (!columnsCount) {
    return {
      doesAnyColumnHasInputType,
      adjustedColumns: [],
    };
  }

  const eachCellWidthAmountFromSelectionColumn = hasSelectionColumn
    ? columnsCount / SELECTION_COLUMN_WIDTH
    : 0;
  const eachCellWidthAmountFromExpandColumn = showExpandColumn
    ? columnsCount / EXPAND_COLUMN_WIDTH
    : 0;

  const adjustedColumns = columnsFromProps.map(
    ({ width, inputProps, render, title, ...column }) => {
      const { selectOptions, inputType } = inputProps || {};

      if (!doesAnyColumnHasInputType) {
        doesAnyColumnHasInputType = !!inputType;
      }

      const isCheckBox = inputType === "checkbox";
      const isSelectField = inputType === "select";

      const actualRenderMethod = render
        ? render
        : isCheckBox
        ? getCheckableInputRenderedValue
        : isSelectField
        ? // @ts-ignore ignore this for now
          getSelectRenderedValue(selectOptions)
        : undefined;

      let fixedWidth = calculateCellStringWidthToPixelNumber(
        containerWidthNumber,
        width
      );

      fixedWidth = fixedWidth
        ? fixedWidth -
          eachCellWidthAmountFromSelectionColumn -
          eachCellWidthAmountFromExpandColumn
        : fixedWidth;

      return {
        ...column,
        title,
        inputProps,
        render: actualRenderMethod,
        width: fixedWidth,
      };
    }
  );

  return {
    doesAnyColumnHasInputType,
    adjustedColumns: adjustedColumns,
  };
};

export default generateFixedColumns;
