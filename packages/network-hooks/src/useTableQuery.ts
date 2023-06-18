/*
 *
 * Hook: `useTableQuery`.
 *
 */
import { useCallback, useRef, useState } from "react";
import {
  clearObjectFields,
  ensureBackEndSetsProperTotal,
} from "@exsys-patient-insurance/helpers";
import {
  usePaginatorState,
  useCurrentPagePrivileges,
} from "@exsys-patient-insurance/hooks";
import {
  RecordType,
  RecordTypeWithAnyValue,
  TableQueryAPiResponseType,
  TableColumnsTotalsType,
  QueryResponseValuesType,
  TableQueryConfigProps,
  TableFetchMoreActionEventType,
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
}: TableQueryConfigProps) => {
  const [pagesDataSource, setPagesDataSource] = useState<Record<string, T>>({});
  const columnsTotalsRef = useRef<TableColumnsTotalsType>();
  const shouldMergeResultsRef = useRef<boolean>(false);
  const dataBaseTotalRecordsRef = useRef<number>(0);
  const loadedDataSourceRecordsCountRef = useRef<number>(0);
  const searchParamsRef = useRef({});

  const totalRecordsInDataBase = dataBaseTotalRecordsRef.current;
  const paginatorHidden = noPagination || totalRecordsInDataBase <= 5;
  const { recordsPerFetch } = useCurrentPagePrivileges({
    useFullPathName: true,
  });

  const { currentPage, rowsPerPage, setPaginationState } = usePaginatorState(
    totalRecordsInDataBase,
    paginatorHidden
  );

  const onResponse = useCallback(
    ({
      apiValues,
      error,
    }: QueryResponseValuesType<TableQueryAPiResponseType<T>>) => {
      if (error) {
        alert("Error when calling table query request");

        return;
      }

      const { data: tableData } = apiValues || {};

      ensureBackEndSetsProperTotal(tableData);
      const shouldMergeResults = shouldMergeResultsRef.current;

      setPagesDataSource((previous) => {
        const newPageValues = shouldMergeResults
          ? [...(previous[currentPage] || []), ...(tableData || [])]
          : tableData;
        const { total, columnsTotals } = getTotalValues(newPageValues);
        dataBaseTotalRecordsRef.current = total;
        columnsTotalsRef.current = columnsTotals;
        loadedDataSourceRecordsCountRef.current = newPageValues.length;
        shouldMergeResultsRef.current = false;

        return {
          ...previous,
          [currentPage]: newPageValues,
        };
      });
    },
    []
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
      poffset_step: recordsPerFetch || 20,
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

  const onFetchMore = useCallback(
    async ({ searchParams, currentPage }: TableFetchMoreActionEventType) => {
      const loadedDataSourceRecordsCount =
        loadedDataSourceRecordsCountRef.current;

      if (
        loadedDataSourceRecordsCount === totalRecordsInDataBase ||
        pagesDataSource?.[currentPage]?.length
      ) {
        return;
      }
      shouldMergeResultsRef.current = true;

      const params = {
        ...searchParams,
        poffset: loadedDataSourceRecordsCount,
      };

      searchParamsRef.current = params;

      await runQuery(params);
    },
    [runQuery, pagesDataSource]
  );

  const onSearchAndFilterTable = useCallback(
    async (filtersAndSorter?: RecordType<string>) => {
      shouldMergeResultsRef.current = false;
      const params = { poffset: 0, ...filtersAndSorter };

      searchParamsRef.current = params;

      await runQuery(params);
    },
    [runQuery]
  );

  // reset all search filters and sorters.
  const handleResetFiltersAndSorters = useCallback(() => {
    shouldMergeResultsRef.current = false;
    const currentSearchParams = searchParamsRef.current;

    // we need to clear all filter keys values because `useBasicQuery` caches
    // the previous filters.
    const nextClearParams = clearObjectFields(currentSearchParams);

    runQuery({ ...nextClearParams, poffset: 0 });
    searchParamsRef.current = {};
  }, [runQuery]);

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
    []
  );

  return {
    loading,
    runQuery,
    data: currentDataSource,
    onFetchMore,
    setData,
    onSearchAndFilterTable,
    handleResetFiltersAndSorters,
    dataBaseTotalRecordsRef,
    searchParamsRef,
    columnsTotals: columnsTotalsRef.current,
    currentPage,
    rowsPerPage,
    setPaginationState,
    paginatorHidden,
    loadedDataSourceRecordsCount: loadedDataSourceRecordsCountRef.current,
  };
};

export default useTableQuery;
