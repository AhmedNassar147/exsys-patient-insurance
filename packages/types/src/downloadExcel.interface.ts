/*
 *
 * `downloadExcel`: `@exsys-patient-insurance/types`
 *
 */
export interface ExcelColProps {
  label: string;
  value: string | number;
  widthPx?: string | number;
  // style: {
  //   fill: { patternType: "solid" | "none", fgColor: { rgb: "FFFF0000" } },
  // },
}

export interface PartialDownloadExcelSheet {
  dataSet?: Record<string, any>[];
  columns: ExcelColProps[];
}

export interface DownloadExcelSheet extends PartialDownloadExcelSheet {
  sheetName: string;
}

export interface DownloadExcelProps {
  disabled?: boolean;
  sheets?: DownloadExcelSheet[];
  filename?: string;
  buttonElement?: React.ReactNode;
}
