/*
 *
 * Helper: `getSelectRenderedValue`.
 *
 */
import {
  SelectListProps,
  TableRowRecordType,
} from "@exsys-patient-insurance/types";

const getSelectRenderedValue =
  (
    selectedOptions?:
      | SelectListProps[]
      | ((record: TableRowRecordType) => SelectListProps[])
  ) =>
  (valueOfDataIndex: string, currentRecord: TableRowRecordType) => {
    const computedOptions =
      selectedOptions instanceof Function
        ? selectedOptions(currentRecord)
        : selectedOptions;

    if (computedOptions?.length) {
      const foundItem = computedOptions?.find(
        (item) => item.key === valueOfDataIndex
      );

      return foundItem?.value || "";
    }

    return valueOfDataIndex || "";
  };

export default getSelectRenderedValue;
