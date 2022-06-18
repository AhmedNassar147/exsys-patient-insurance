/*
 *
 * Helper: `createRowSelectionValuesForChangeEvent`.
 *
 */
import {
  TableRowRecordType,
  TableSelectionType,
  TableSelectionKeysType,
  TableRowKeyType,
} from "@exsys-patient-insurance/types";

interface PropsType<T extends TableRowRecordType> {
  dataSource: T[];
  selectionType?: TableSelectionType;
  alreadySelectedKeys?: TableSelectionKeysType;
  nextSelectionKey: TableSelectionKeysType[0];
  rowKey: TableRowKeyType;
  isAllSelectionAction?: boolean;
  disabledSelectionKeys: TableSelectionKeysType;
  wasAllSelectionColumnChecked?: boolean;
}

const createRowSelectionValuesForChangeEvent = <T extends TableRowRecordType>({
  dataSource,
  selectionType,
  alreadySelectedKeys,
  nextSelectionKey,
  rowKey,
  isAllSelectionAction,
  disabledSelectionKeys,
  wasAllSelectionColumnChecked,
}: PropsType<T>) => {
  let nextSelectionKeys: TableSelectionKeysType = [];
  let nextSelectionRows: T[] = [];

  if (isAllSelectionAction) {
    if (!wasAllSelectionColumnChecked) {
      const filteredDataSource = dataSource.filter(
        (row) => !disabledSelectionKeys.includes(row[rowKey] as never)
      );

      nextSelectionKeys = filteredDataSource.length
        ? filteredDataSource.map((row) => row[rowKey])
        : nextSelectionKeys;
      nextSelectionRows = filteredDataSource;
    }

    return {
      nextSelectionKeys,
      nextSelectionRows,
    };
  }

  const isCheckbox = selectionType !== "radio";

  if (isCheckbox) {
    const oldSelectedKeys = alreadySelectedKeys || [];

    const isCurrentKeyAlreadySelected = oldSelectedKeys.includes(
      nextSelectionKey as never
    );

    nextSelectionKeys = (
      isCurrentKeyAlreadySelected
        ? (oldSelectedKeys as []).filter((key) => key !== nextSelectionKey)
        : [...oldSelectedKeys, nextSelectionKey]
    ) as TableSelectionKeysType;

    return {
      nextSelectionKeys,
      nextSelectionRows: nextSelectionKeys.length
        ? dataSource.filter((row) =>
            nextSelectionKeys.includes(row[rowKey] as never)
          )
        : nextSelectionRows,
    };
  }

  return {
    nextSelectionKeys: [nextSelectionKey] as TableSelectionKeysType,
    nextSelectionRows: [
      dataSource.find((row) => row[rowKey] === nextSelectionKey) as T,
    ],
  };
};

export default createRowSelectionValuesForChangeEvent;
