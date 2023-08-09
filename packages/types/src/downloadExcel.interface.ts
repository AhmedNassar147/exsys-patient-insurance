/*
 *
 * `downloadExcel`: `@exsys-patient-insurance/types`
 *
 */
import { RecordTypeWithAnyValue } from "./base.interface";

export interface ExcelColumnProps {
  title: string;
  dataIndex: string;
  render?: (
    valueOfDataIndex: string,
    currentRecord: RecordTypeWithAnyValue,
    index: number
  ) => any;
  width?: string | number;
}

export interface DownloadExcelSheet {
  sheetName?: string;
  data: RecordTypeWithAnyValue[] | (() => Promise<RecordTypeWithAnyValue[]>);
  columns: ExcelColumnProps[];
}

export interface ReactExportsExcelProps {
  disabled?: boolean;
  sheets: DownloadExcelSheet[];
  fileName?: string;
}
