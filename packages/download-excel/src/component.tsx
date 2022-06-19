/*
 *
 * `DownloadExcel`: `@exsys-patient-insurance/download-excel`.
 *
 */
import { memo, useMemo } from "react";
// @ts-ignore ignore for now.
import { modules } from "react-export-excel";
import FileExcelIcon from "@exsys-patient-insurance/file-excel-icon";
import { DownloadExcelProps } from "@exsys-patient-insurance/types";

const ExcelFile = modules.ExcelFile;
const ExcelSheet = modules.ExcelSheet;
const ExcelColumn = modules.ExcelColumn;

const DownloadExcel = ({
  disabled,
  sheets,
  filename,
  buttonElement,
}: DownloadExcelProps) => {
  const downloadEl = useMemo(
    () =>
      buttonElement || <FileExcelIcon useDisabledColor disabled={disabled} />,
    [disabled, buttonElement]
  );

  if (disabled) {
    return null;
  }

  return (
    <ExcelFile element={downloadEl} filename={filename}>
      {sheets &&
        sheets.map(
          ({ dataSet, sheetName, columns = [] }, idx) =>
            dataSet && (
              <ExcelSheet data={dataSet} name={sheetName} key={idx.toString()}>
                {columns.map(({ label, value }) => (
                  <ExcelColumn label={label} value={value} key={label} />
                ))}
              </ExcelSheet>
            )
        )}
    </ExcelFile>
  );
};
DownloadExcel.defaultProps = {
  sheets: [{ dataSet: [], sheetName: "file", columns: [] }],
};

export default memo(DownloadExcel);
