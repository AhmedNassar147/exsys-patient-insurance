/*
 *
 * Helper: `createExcelSheetFromAoA`.
 *
 */
import XLSX from "xlsx";
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";

const createExcelSheetFromAoA = (data: RecordTypeWithAnyValue[]) => {
  const ws = {} as RecordTypeWithAnyValue;
  const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };

  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) {
        range.s.r = R;
      }

      if (range.s.c > C) {
        range.s.c = C;
      }

      if (range.e.r < R) {
        range.e.r = R;
      }

      if (range.e.c < C) {
        range.e.c = C;
      }

      const cell = { v: data[R][C] } as RecordTypeWithAnyValue;
      if (cell.v === null) {
        continue;
      }

      const cellRef = XLSX.utils.encode_cell({ c: C, r: R });
      if (typeof cell.v === "number") {
        cell.t = "n";
      } else if (typeof cell.v === "boolean") {
        cell.t = "b";
      } else {
        cell.t = "s";
      }

      ws[cellRef] = cell;
    }
  }

  if (range.s.c < 10000000) {
    ws["!ref"] = XLSX.utils.encode_range(range);
  }

  return ws;
};

export default createExcelSheetFromAoA;
