/*
 *
 * Hook: `useTableQuery`.
 *
 */
import { useCallback, useRef, useState, useMemo } from "react";
import {
  clearObjectFields,
  delayProcess,
  ensureBackEndSetsProperTotal,
} from "@exsys-patient-insurance/helpers";
import { usePaginatorState } from "@exsys-patient-insurance/hooks";
import {
  RecordTypeWithAnyValue,
  TableQueryAPiResponseType,
  TableColumnsTotalsType,
  QueryResponseValuesType,
  TableQueryConfigProps,
  TableFetchMoreActionEventType,
  UseBasicRunQueryFnType,
} from "@exsys-patient-insurance/types";
import useBasicQuery from "./useBasicQuery";

const EXSYS_TOTAL_CELL_START = "exsys_total_";
const getColumnsTotals = <T extends RecordTypeWithAnyValue>(record: T) => {
  if (!record) {
    return undefined;
  }

  return Object.keys(record).reduce((acc, currentKey) => {
    let currentAcc = (acc || {}) as TableColumnsTotalsType;
    if (currentKey.startsWith(EXSYS_TOTAL_CELL_START)) {
      currentAcc[currentKey.replace(EXSYS_TOTAL_CELL_START, "")] =
        record[currentKey];

      return currentAcc;
    }

    return acc;
  }, undefined as TableColumnsTotalsType | undefined);
};

const getTotalValues = <T extends RecordTypeWithAnyValue>(newValues: T[]) => {
  const dataLength = newValues?.length ?? 0;
  const lastRecord = newValues[dataLength - 1];
  const total = ~~(lastRecord?.total ?? 0);

  return { total, columnsTotals: getColumnsTotals(lastRecord) };
};

type PagesDataSourceType<T extends RecordTypeWithAnyValue[]> = Record<
  string,
  T
>;

const useTableQuery = <T extends RecordTypeWithAnyValue[]>({
  apiId,
  callOnFirstRender,
  params,
  transformQueryApiData,
  skipQuery,
  enableNetworkCache,
  runQueryWhenLanguageChanged = true,
  checkAllParamsValuesToQuery,
  debounceRequestTimeOutMS = 400,
  allowedParamsWithEmptyValue,
  disableParamsChangeCheck,
  noPagination,
  pageSize,
}: TableQueryConfigProps) => {
  const [pagesDataSource, setPagesDataSource] = useState<
    PagesDataSourceType<T>
  >({});
  const columnsTotalsRef = useRef<TableColumnsTotalsType>();
  const otherApiValuesRef = useRef<RecordTypeWithAnyValue>({});
  const shouldMergeResultsRef = useRef<boolean>(false);
  const dataBaseTotalRecordsRef = useRef<number>(0);
  const loadedDataSourceRecordsCountRef = useRef<number>(0);
  const searchParamsRef = useRef({});

  const totalRecordsInDataBase = dataBaseTotalRecordsRef.current;
  const paginatorHidden = noPagination || totalRecordsInDataBase <= 5;

  const { currentPage, rowsPerPage, initialRowsPerPage, setPaginationState } =
    usePaginatorState(totalRecordsInDataBase, paginatorHidden, pageSize);

  const onResponse = useCallback(
    ({
      apiValues,
      error,
      queryParams: { currentPage, poffset },
    }: QueryResponseValuesType<TableQueryAPiResponseType<T>>) => {
      if (error) {
        alert("Error when calling table query request");

        return;
      }

      const { data: tableData, ...otherApiData } = apiValues || {};
      const _currentPage = +(currentPage || 1);
      const __currentPage = poffset === 0 ? 1 : _currentPage;

      ensureBackEndSetsProperTotal(tableData);
      const shouldMergeResults = shouldMergeResultsRef.current;

      setPagesDataSource((previous) => {
        const currentTableData = tableData || [];
        const newPageValues = shouldMergeResults
          ? [...(previous[currentPage] || []), ...currentTableData]
          : currentTableData;
        const { total, columnsTotals } = getTotalValues(newPageValues);
        dataBaseTotalRecordsRef.current = total;
        columnsTotalsRef.current = columnsTotals;
        loadedDataSourceRecordsCountRef.current = newPageValues.length;
        otherApiValuesRef.current = otherApiData;
        shouldMergeResultsRef.current = false;

        return {
          ...previous,
          [__currentPage]: newPageValues,
        };
      });

      setPaginationState((previous) => ({
        ...previous,
        currentPage: __currentPage,
      }));
    },
    [setPaginationState]
  );

  const transformApiDataFn = useCallback(
    (values: TableQueryAPiResponseType<T>) => {
      transformQueryApiData?.(values);
      return values;
    },
    [transformQueryApiData]
  );

  const { loading, runQuery } = useBasicQuery<TableQueryAPiResponseType<T>>({
    callOnFirstRender,
    apiId,
    params: {
      poffset: 0,
      ...params,
      poffset_step: rowsPerPage,
    },
    onResponse,
    skipQuery,
    enableNetworkCache,
    runQueryWhenLanguageChanged,
    debounceRequestTimeOutMS,
    checkAllParamsValuesToQuery,
    allowedParamsWithEmptyValue:
      typeof allowedParamsWithEmptyValue === "boolean"
        ? allowedParamsWithEmptyValue
        : [...(allowedParamsWithEmptyValue || []), "poffset"],
    disableParamsChangeCheck,
    transformApiDataFn,
  });

  const resetTableData = useCallback(() => {
    setPaginationState(() => ({
      rowsPerPage: initialRowsPerPage,
      currentPage: 1,
    }));
    setPagesDataSource(() => {
      columnsTotalsRef.current = undefined;
      otherApiValuesRef.current = {};
      shouldMergeResultsRef.current = false;
      dataBaseTotalRecordsRef.current = 0;
      loadedDataSourceRecordsCountRef.current = 0;
      searchParamsRef.current = {};

      return {} as PagesDataSourceType<T>;
    });
  }, [initialRowsPerPage, setPaginationState]);

  const onFetchMore = useCallback(
    async ({
      searchParams,
      currentPage,
      rowsPerPage: _rowsPerPage,
    }: TableFetchMoreActionEventType) => {
      const paginationOptions = {
        currentPage,
        rowsPerPage: _rowsPerPage,
      };

      if (_rowsPerPage !== rowsPerPage) {
        resetTableData();
        const params = {
          ...searchParams,
          poffset: 0,
        };

        searchParamsRef.current = params;
        setPaginationState(paginationOptions);

        await delayProcess(20);

        runQuery({
          ...params,
          currentPage,
          poffset_step: _rowsPerPage,
        });
        return;
      }

      const loadedDataSourceRecordsCount =
        loadedDataSourceRecordsCountRef.current;

      setPaginationState(paginationOptions);

      if (
        loadedDataSourceRecordsCount === totalRecordsInDataBase ||
        pagesDataSource?.[currentPage]?.length
      ) {
        if (process.env.NODE_ENV !== "production") {
          console.log({
            currentPage,
            rowsPerPage: _rowsPerPage,
            loadedDataSourceRecordsCount,
            totalRecordsInDataBase,
            data: pagesDataSource?.[currentPage],
          });
        }
        return;
      }
      shouldMergeResultsRef.current = true;

      const params = {
        ...searchParams,
        poffset: (currentPage - 1) * _rowsPerPage,
      };

      searchParamsRef.current = params;

      await runQuery({ ...params, currentPage, poffset_step: _rowsPerPage });
    },
    [runQuery, pagesDataSource, setPaginationState]
  );

  const onSearchAndFilterTable = useCallback(
    async ({
      searchParams,
      currentPage,
      rowsPerPage,
    }: TableFetchMoreActionEventType) => {
      shouldMergeResultsRef.current = false;
      const params = { poffset: 0, ...(searchParams || null) };

      searchParamsRef.current = params;
      setPaginationState({
        currentPage,
        rowsPerPage,
      });

      await runQuery({ ...params, currentPage, poffset_step: rowsPerPage });
    },
    [runQuery, setPaginationState]
  );

  // reset all search filters and sorters.
  const handleResetFiltersAndSorters = useCallback(
    ({
      currentPage,
      rowsPerPage,
      searchParams,
    }: TableFetchMoreActionEventType) => {
      shouldMergeResultsRef.current = false;
      const currentSearchParams = searchParams || searchParamsRef.current;

      // we need to clear all filter keys values because `useBasicQuery` caches
      // the previous filters.
      const nextClearParams = clearObjectFields(currentSearchParams);
      searchParamsRef.current = {};
      setPaginationState({
        currentPage,
        rowsPerPage,
      });
      runQuery({
        ...nextClearParams,
        poffset: 0,
        currentPage,
        poffset_step: rowsPerPage,
      });
    },
    [runQuery, setPaginationState]
  );

  const fetchTableExcelData: () => Promise<T> = useCallback(
    () =>
      new Promise(async (resolve) => {
        await runQuery(
          {
            donotUpdateResponseCallback: true,
            poffset: 0,
            poffset_step: 100000000,
          },
          ({ apiValues }) => {
            const { data } = apiValues || { data: [] };

            resolve((data || []) as T);
          }
        );
      }),
    [runQuery]
  );

  const currentDataSource = (pagesDataSource?.[currentPage] ?? []) as T;

  const setData: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (nextValueOrFn: T | ((previous: T) => T)) => {
      const nextValue =
        nextValueOrFn instanceof Function
          ? nextValueOrFn(currentDataSource)
          : nextValueOrFn;

      setPagesDataSource((previous) => {
        return {
          ...previous,
          [currentPage]: nextValue,
        };
      });
    },
    [currentDataSource, currentPage]
  );

  const loadedData = useMemo(
    () => Object.values(pagesDataSource || {}).flat(),
    [pagesDataSource]
  );

  const handleRunQuery: UseBasicRunQueryFnType<TableQueryAPiResponseType<T>> =
    useCallback(
      async (nextParams, cb) => {
        resetTableData();
        await delayProcess(40);
        const { currentPage } = nextParams || {};

        const _currentPage = currentPage || 1;

        return runQuery(
          {
            currentPage: _currentPage,
            ...(nextParams || null),
            poffset: (_currentPage - 1) * rowsPerPage,
          },
          cb
        );
      },
      [resetTableData, rowsPerPage, runQuery]
    );

  return {
    loading,
    runQuery: handleRunQuery,
    data: (paginatorHidden
      ? currentDataSource
      : currentDataSource.slice(0, rowsPerPage)) as T,
    onFetchMore,
    setData,
    onSearchAndFilterTable,
    fetchTableExcelData,
    handleResetFiltersAndSorters,
    dataBaseTotalRecordsRef,
    searchParamsRef,
    columnsTotals: columnsTotalsRef.current,
    otherApiValues: otherApiValuesRef.current,
    currentPage,
    rowsPerPage,
    setPaginationState,
    paginatorHidden,
    loadedData,
    resetTableData,
    loadedDataSourceRecordsCount: loadedDataSourceRecordsCountRef.current,
  };
};

export default useTableQuery;
