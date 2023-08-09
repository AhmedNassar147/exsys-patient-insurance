/*
 *
 * Package: `@exsys-patient-insurance/react-exports-excel`.
 *
 */
import { memo, useCallback } from "react";
import XLSX, { BookType } from "xlsx";
import FileExcelIcon from "@exsys-patient-insurance/file-excel-icon";
import {
  downloadFileWithData,
  getCurrentDatePartials,
} from "@exsys-patient-insurance/helpers";
import { useAppConfigStore } from "@exsys-patient-insurance/app-config-store";
import {
  ReactExportsExcelProps,
  DownloadExcelSheet,
  RecordTypeWithAnyValue,
  RecordType,
} from "@exsys-patient-insurance/types";
import stringToArrayBuffer from "./helpers/stringToArrayBuffer";
import createExcelSheetFromAoA from "./helpers/createExcelSheetFromAoA";

const DEFAULT_FILE_NAME = "Exsys-Excel-File";
const DEFAULT_FILE_EXTENSION = "xlsx";

const ReactExportsExcel = ({
  disabled,
  fileName,
  sheets,
}: ReactExportsExcelProps) => {
  const { addNotification } = useAppConfigStore();

  const _fileName = fileName || DEFAULT_FILE_NAME;

  const createSheetData = useCallback(
    ({ columns, data }: DownloadExcelSheet) => {
      const { columnsTitle, sheetRowValues } = (
        data as RecordTypeWithAnyValue[]
      ).reduce(
        (acc, row, rowIndex) => {
          columns.forEach((column, index) => {
            const { dataIndex, render, title } = column;
            const valueOfDataIndex = row[dataIndex];

            const actualValue = isNaN(valueOfDataIndex)
              ? valueOfDataIndex || ""
              : valueOfDataIndex;

            const itemValue = render
              ? render(actualValue, row, index)
              : actualValue;

            if (typeof itemValue !== "object") {
              const indexString = index.toString();
              if (!acc.columnsTitle[indexString]) {
                acc.columnsTitle[indexString] = title;
              }
              acc.sheetRowValues[rowIndex] = acc.sheetRowValues[rowIndex] || [];
              acc.sheetRowValues[rowIndex].push(itemValue);
            }
          });

          return acc;
        },
        {
          sheetRowValues: [] as unknown[][],
          columnsTitle: {} as RecordType<string>,
        }
      );

      return [Object.values(columnsTitle), ...sheetRowValues] as unknown[][];
    },
    []
  );

  const handleDownload = useCallback(async () => {
    const sheetsConfigPromises = sheets.map(
      ({ data, sheetName, columns }, index) => {
        const isDataFunction = data instanceof Function;
        if (isDataFunction) {
          addNotification({
            type: "info",
            message: "fetching excel data from server",
          });
        }

        return new Promise(async (resolve) => {
          const foundData = isDataFunction ? await data() : data;
          resolve({
            data: foundData,
            sheetName: `${sheetName || `${_fileName} sheet(${index + 1})`}`,
            columns,
          } as DownloadExcelSheet);
        });
      }
    );

    const workbookSheets = await Promise.all<DownloadExcelSheet[]>(
      // @ts-ignore
      sheetsConfigPromises
    );

    if (workbookSheets.length) {
      const workbookData = workbookSheets.reduce(
        (acc, { sheetName, columns, data }) => {
          acc.SheetNames.push(sheetName as string);
          acc.Sheets[sheetName as string] = createExcelSheetFromAoA(
            createSheetData({ columns, data })
          );

          return acc;
        },
        {
          SheetNames: [] as string[],
          Sheets: {} as RecordTypeWithAnyValue,
        }
      );

      const workBook = XLSX.write(workbookData, {
        bookType: DEFAULT_FILE_EXTENSION as BookType,
        bookSST: true,
        type: "binary",
      });

      const { year, month, day, hours, mins } = getCurrentDatePartials();
      const excelDateTime = `${year}_${month}${day}_${hours}${mins}`;

      const filePath = `${_fileName}_${excelDateTime}.${DEFAULT_FILE_EXTENSION}`;

      downloadFileWithData({
        fileName: filePath,
        fileContents: stringToArrayBuffer(workBook),
        fileType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
    }
  }, [_fileName, createSheetData, sheets]);

  return (
    <FileExcelIcon
      useDisabledColor
      disabled={disabled}
      onClick={handleDownload}
    />
  );
};
ReactExportsExcel.defaultProps = {
  fileName: "Exsys-Excel-File",
  fileExtension: DEFAULT_FILE_EXTENSION,
};

export default memo(ReactExportsExcel);
