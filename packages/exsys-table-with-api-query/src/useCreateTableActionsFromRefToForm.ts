/*
 *
 * Hook: `useCreateTableActionsFromRefToForm`.
 *
 */
import { useRef, useCallback } from "react";
import { UseBasicRunQueryFnType } from "@exsys-patient-insurance/types";
import {
  TableRowRecordType,
  TableQueryAPiResponseType,
} from "@exsys-patient-insurance/types";
import { TableForwardedValuesForRef } from "./index.interface";

export const useCreateTableActionsFromRefToForm = <
  TableRecordType extends TableRowRecordType
>() => {
  const tableValuesRef = useRef<
    TableForwardedValuesForRef<TableRecordType> | undefined
  >();

  const fetchTableData: UseBasicRunQueryFnType<
    TableQueryAPiResponseType<TableRecordType[]>
  > = useCallback(
    async (nextParams, cb) =>
      await tableValuesRef.current?.runQuery(nextParams, cb),
    [tableValuesRef]
  );

  const setTableData = useCallback(
    (
      nextTableData:
        | TableRecordType[]
        | ((previous: TableRecordType[]) => TableRecordType[])
    ) => tableValuesRef.current?.setTableData(nextTableData),
    [tableValuesRef]
  );

  const getCurrentDataSource = useCallback(
    () => tableValuesRef.current?.getCurrentDataSource() || [],
    [tableValuesRef]
  );

  const resetTableData = useCallback(
    () => tableValuesRef.current?.resetTableData(),
    [tableValuesRef]
  );

  return {
    tableValuesRef,
    fetchTableData,
    setTableData,
    getCurrentDataSource,
    resetTableData,
  };
};
