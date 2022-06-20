/*
 *
 * Helper: `ensureBackEndSetsProperTotal`.
 *
 */
import isObjectHasKey from "./isObjectHasKey";
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";

const ensureBackEndSetsProperTotal = <T extends RecordTypeWithAnyValue[]>(
  data: T
) => {
  if (process.env.NODE_ENV === "development") {
    const length = data?.length;

    if (!!length) {
      data?.forEach((record) => {
        const doesEachRecordHasTotalProp = isObjectHasKey(record, "total");

        if (!doesEachRecordHasTotalProp) {
          throw new Error(`
            Please contact the backend to provide the \`total\` prop
            in each row of the table data. Given:
            ${JSON.stringify(record, null, 2)}
          `);
        }

        const doesEachTotalIsNumberPropType = typeof record.total === "number";

        if (!doesEachTotalIsNumberPropType) {
          throw new Error(`
            Please contact the backend to provide the \`total\` prop
            as number type  of each row of the table data. Given:
            ${JSON.stringify(record, null, 2)}
          `);
        }
      });
    }
  }
};

export default ensureBackEndSetsProperTotal;
