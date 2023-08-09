/*
 *
 * Hook: `useCreateExcelSheet`.
 *
 */
import { getPageNameFromPathName } from "@exsys-patient-insurance/helpers";
import {
  TableRowRecordType,
  TableColumnProps,
  UseCreateExcelSheetBasePropType,
} from "@exsys-patient-insurance/types";
import parseColumnsToValidExcelColumns from "../helpers/parseColumnsToValidExcelColumns";

export type UseCreateExcelSheetPropType<T = TableRowRecordType> =
  UseCreateExcelSheetBasePropType & {
    columns: TableColumnProps<T>[];
    dataSource: TableRowRecordType[];
    shouldProcessColumnsAndData?: boolean;
    hasActionColumn?: boolean;
    extraExcelColumns?: TableColumnProps[];
  };

const useCreateExcelSheet = <T = TableRowRecordType>({
  columns,
  dataSource,
  sheetName,
  shouldProcessColumnsAndData,
  hasActionColumn,
  extraExcelColumns,
}: UseCreateExcelSheetPropType<T>) => {
  if (!shouldProcessColumnsAndData) {
    return undefined;
  }

  const hasDataSource = typeof dataSource === "function" || !!dataSource.length;

  if (!columns?.length || !hasDataSource) {
    return undefined;
  }

  const sheetFileName = sheetName || getPageNameFromPathName();
  let finalColumns = (
    hasActionColumn ? columns.slice(0, -1) : columns
  ) as TableColumnProps[];

  if (extraExcelColumns?.length) {
    finalColumns = finalColumns.concat(...extraExcelColumns);
  }

  return {
    filename: sheetFileName,
    sheets: [
      {
        data: dataSource,
        columns: parseColumnsToValidExcelColumns(finalColumns),
        sheetName: sheetFileName,
      },
    ],
  };
};

export default useCreateExcelSheet;
