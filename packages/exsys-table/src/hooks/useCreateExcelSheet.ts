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
  UseCreateExcelSheetBasePropType<T> & {
    columns: TableColumnProps<T>[];
    dataSource: TableRowRecordType[];
    shouldProcessColumnsAndData?: boolean;
    hasActionColumn?: boolean;
  };

const useCreateExcelSheet = <T = TableRowRecordType>({
  columns,
  dataSource,
  transformDataSourceToExcelSheetDataSet,
  sheetName,
  shouldProcessColumnsAndData,
  hasActionColumn,
}: UseCreateExcelSheetPropType<T>) => {
  if (!shouldProcessColumnsAndData) {
    return undefined;
  }

  const dataSet =
    transformDataSourceToExcelSheetDataSet?.(dataSource as T[]) ?? dataSource;

  if (!columns || !columns.length || !dataSet || !dataSet?.length) {
    return undefined;
  }

  const sheetFileName = sheetName || getPageNameFromPathName();
  const finalColumns = (
    hasActionColumn ? columns.slice(0, -1) : columns
  ) as TableColumnProps[];

  return {
    filename: sheetFileName,
    sheets: [
      {
        dataSet,
        columns: parseColumnsToValidExcelColumns(finalColumns),
        sheetName: sheetFileName,
      },
    ],
  };
};

export default useCreateExcelSheet;
