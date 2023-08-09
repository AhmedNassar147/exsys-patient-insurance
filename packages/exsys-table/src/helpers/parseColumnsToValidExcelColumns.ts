/*
 *
 * Helper: `parseColumnsToValidExcelColumns`.
 *
 */
import {
  ExcelColumnProps,
  TableColumnProps,
} from "@exsys-patient-insurance/types";

const parseColumnsToValidExcelColumns = (
  columns: TableColumnProps[]
): ExcelColumnProps[] => {
  return columns
    .filter(({ dataIndex }) => !!dataIndex)
    .map(
      ({ title, dataIndex, width, render }) =>
        ({
          label: (title || "") as unknown as string,
          dataIndex,
          width,
          render,
          // style: {
          //   font: { bold: true },
          //   alignment: {
          //     vertical: "center",
          //     horizontal: "center",
          //   },
          // },
        } as never as ExcelColumnProps)
    );
};

export default parseColumnsToValidExcelColumns;
