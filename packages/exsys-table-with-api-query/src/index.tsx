/*
 *
 * Package: `@exsys-patient-insurance/table-with-api-query`.
 *
 */
import {
  useLayoutEffect,
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
} from "react";
import { useTableQuery } from "@exsys-patient-insurance/network-hooks";
import { useTableInputChangeCallback } from "@exsys-patient-insurance/hooks";
import BaseExsysTable from "@exsys-patient-insurance/exsys-table";
import {
  TableRowRecordType,
  CapitalBooleanStringType,
} from "@exsys-patient-insurance/types";
import {
  TableWithApiQueryProps,
  TableForwardedRefType,
  UseCreateTableActionsFromRefToFormValuesType,
} from "./index.interface";

const queryPageDataOnFirstRender: CapitalBooleanStringType =
  "" as CapitalBooleanStringType;

const TableWithApiQuery = <T extends TableRowRecordType>(
  {
    queryApiId,
    baseQueryAPiParams,
    handleSearchOnFirstRender,
    hideTableHeaderTools = true,
    margin = "12px 0px",
    transformQueryApiData,
    callOnFirstRender,
    onInputChange,
    transformDataSource,
    skipQuery,
    allowPassingChangeEventOnDone,
    ...tableProps
  }: TableWithApiQueryProps<T>,
  ref: TableForwardedRefType<T>
) => {
  const {
    data: dataSource,
    loading,
    dataBaseTotalRecordsRef,
    onFetchMore,
    runQuery,
    setData,
    onSearchAndFilterTable,
    handleResetFiltersAndSorters,
    columnsTotals,
  } = useTableQuery<T[]>({
    apiId: queryApiId,
    callOnFirstRender,
    skipQuery,
    disableParamsChangeCheck: !baseQueryAPiParams,
    params: baseQueryAPiParams,
    transformQueryApiData,
  });

  const foundDataSource = useMemo(
    () => transformDataSource?.(dataSource) ?? dataSource,
    [dataSource, transformDataSource]
  );

  useImperativeHandle(ref, () => ({
    runQuery,
    setTableData: setData,
    getCurrentDataSource: () => foundDataSource,
  }));

  useLayoutEffect(
    () => {
      if (queryPageDataOnFirstRender === "Y" && handleSearchOnFirstRender) {
        setTimeout(() => {
          handleSearchOnFirstRender();
        });
      }
    },
    // eslint-disable-next-line
    [queryPageDataOnFirstRender]
  );

  const handleInputChange = useTableInputChangeCallback<T>({
    onInputChange,
    setData,
    allowPassingChangeEventOnDone,
  });

  return (
    <BaseExsysTable<T>
      dataSource={foundDataSource}
      loading={loading}
      totalRecordsInDataBase={dataBaseTotalRecordsRef.current}
      onFetchMore={onFetchMore}
      onSearchAndFilterTable={onSearchAndFilterTable}
      resetTableFilters={handleResetFiltersAndSorters}
      hideTableHeaderTools={hideTableHeaderTools}
      margin={margin}
      onInputChange={handleInputChange}
      columnsTotals={columnsTotals}
      {...tableProps}
    />
  );
};

// @ts-ignore ignore react "forwardRef" for misleading types.
export default memo(forwardRef(TableWithApiQuery)) as typeof TableWithApiQuery;
export * from "./useCreateTableActionsFromRefToForm";
export type {
  TableForwardedRefType,
  UseCreateTableActionsFromRefToFormValuesType,
};
