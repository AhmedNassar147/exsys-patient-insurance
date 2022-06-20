/*
 *
 * Hook: `useTableInputChangeCallback`.
 *
 */
import { useCallback } from "react";
import {
  OnTableCellInputChange,
  TableRowRecordType,
} from "@exsys-patient-insurance/types";

type OptionsType<T extends TableRowRecordType> = {
  onInputChange?: OnTableCellInputChange;
  allowPassingChangeEventOnDone?: boolean;
  setData:
    | React.Dispatch<React.SetStateAction<T[]>>
    | ((nextData: T[] | ((previousValue: T[]) => T[])) => void);
};

const useTableInputChangeCallback = <T extends TableRowRecordType>({
  onInputChange,
  setData,
  allowPassingChangeEventOnDone,
}: OptionsType<T>) => {
  const handleInputChange: OnTableCellInputChange = useCallback(
    (event) => {
      if (onInputChange) {
        onInputChange(event);

        if (!allowPassingChangeEventOnDone) {
          return;
        }
      }

      const { rowIndex, name, value } = event;

      setData((previousDataSource: T[]) => {
        let foundRecord = previousDataSource[rowIndex];
        const { record_status } = foundRecord;

        const nextDataSource = [...(previousDataSource || [])];
        nextDataSource[rowIndex] = {
          ...foundRecord,
          [name]: value,
          record_status: ["q", "u"].includes(record_status) ? "u" : "n",
        } as T;

        return nextDataSource;
      });
    },
    [allowPassingChangeEventOnDone, onInputChange, setData]
  );

  return handleInputChange;
};

export default useTableInputChangeCallback;
