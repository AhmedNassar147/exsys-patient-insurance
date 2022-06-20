/*
 *
 * Helper: `getDataBaseTotalsRecords`.
 *
 */
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";

const getDataBaseTotalsRecords = <T extends RecordTypeWithAnyValue[]>(
  data: T
) => {
  const currentDataTableLength = (data || []).length;

  if (!currentDataTableLength) {
    return 0;
  }

  const lastItemIdx = currentDataTableLength - 1;
  const lastItem = data[lastItemIdx];

  const total = ~~(lastItem.total ?? 0 ?? lastItem.total);

  return total;
};

export default getDataBaseTotalsRecords;
