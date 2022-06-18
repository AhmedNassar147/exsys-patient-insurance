/*
 *
 * Hook: `useExpandableTableRows`.
 *
 */
import { useState, useCallback } from "react";
import { useEffectWithTimeout } from "@exsys-patient-insurance/hooks";
import {
  TableRowRecordType,
  TableRowKeyType,
  TableSelectionKeysType,
} from "@exsys-patient-insurance/types";

const useExpandableTableRows = <T = TableRowRecordType>(
  rowKey: TableRowKeyType,
  dataSource?: T[],
  isTableUsingExpandableRows?: boolean
) => {
  const [rowsWithExpandCell, setRowsWithExpandCell] =
    useState<TableSelectionKeysType>([]);
  const [expandedKeys, setExpandedKeys] = useState<TableSelectionKeysType>([]);

  const setExpandedRowKeys = useCallback(
    (nextDataSource: T[]) => {
      const expandedKeys: TableSelectionKeysType = nextDataSource
        .filter(({ extendable }: TableRowRecordType) => extendable === "y")
        .map((row) => (row as TableRowRecordType)[rowKey]);

      setRowsWithExpandCell(() => expandedKeys);
    },
    [rowKey]
  );

  useEffectWithTimeout({
    conditionToNotRunEffect: !isTableUsingExpandableRows || !dataSource?.length,
    effectTimeoutMs: 100,
    effectFn: setExpandedRowKeys,
    effectArguments: [dataSource],
    dependencies: [dataSource, isTableUsingExpandableRows],
  });

  return {
    rowsWithExpandCell,
    expandedKeys,
    setExpandedKeys,
  };
};

export default useExpandableTableRows;
