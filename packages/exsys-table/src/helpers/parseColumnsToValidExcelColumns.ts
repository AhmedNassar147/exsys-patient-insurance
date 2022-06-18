/*
 *
 * Helper: `parseColumnsToValidExcelColumns`.
 *
 */
import {
  ExcelColProps,
  TableColumnProps,
} from "@exsys-patient-insurance/types";

const parseColumnsToValidExcelColumns = (
  columns: TableColumnProps[]
): ExcelColProps[] =>
  columns
    .filter((item) => !!item.dataIndex)
    .map((item) => ({
      label: item.title as string,
      value: item.dataIndex,
      widthPx: item.width,
      style: {
        font: { bold: true },
        alignment: {
          vertical: "center",
          horizontal: "center",
        },
      },
    }));

export default parseColumnsToValidExcelColumns;
