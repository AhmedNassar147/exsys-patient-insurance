/*
 *
 * `DownloadExcelWithApiQuery`: `@exsys-patient-insurance/download-excel-with-api-query`.
 *
 */

import { memo, useMemo } from "react";
// @ts-ignore ignore for now.
import { modules } from "react-export-excel";
import FileExcelIcon from "@exsys-patient-insurance/file-excel-icon";
import { DownloadExcelWithApiQueryProps } from "@exsys-patient-insurance/types";
import { useTableQuery } from "@exsys-patient-insurance/network-hooks";

const ExcelFile = modules.ExcelFile;
const ExcelSheet = modules.ExcelSheet;
const ExcelColumn = modules.ExcelColumn;

const DownloadExcelWithApiQuery = ({
  disabled,
  sheets,
  filename,
  buttonElement,
  tableQueryApiId,
  tableQueryApiParams,
}: DownloadExcelWithApiQueryProps) => {
  const { data } = useTableQuery({
    apiId: tableQueryApiId,
    params: {
      ...(tableQueryApiParams | null),
      poffset: 0,
      poffset_step: 10000000,
    },
  });
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
DownloadExcelWithApiQuery.defaultProps = {
  sheets: [{ dataSet: [], sheetName: "file", columns: [] }],
};

export default memo(DownloadExcelWithApiQuery);
