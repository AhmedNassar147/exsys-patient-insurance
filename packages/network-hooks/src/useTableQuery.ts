/*
 *
 * Hook: `useTableQuery`.
 *
 */
import { useCallback, useRef, useState } from "react";
import {
  clearObjectFields,
  getDataBaseTotalsRecords,
  ensureBackEndSetsProperTotal,
  isObjHasData,
} from "@exsys-patient-insurance/helpers";
import {
  RecordType,
  RecordTypeWithAnyValue,
  TableQueryAPiResponseType,
  TableColumnsTotalsType,
  QueryResponseValuesType,
  TableQueryConfigProps,
} from "@exsys-patient-insurance/types";
import useBasicQuery from "./useBasicQuery";

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
}: TableQueryConfigProps) => {
  const [data, setData] = useState<T>([] as unknown as T);
  const [columnsTotals, setColumnsTotals] = useState<TableColumnsTotalsType>();
  const shouldMergeResultsRef = useRef<boolean>(false);
  const dataBaseTotalRecordsRef = useRef<number>(0);
  const searchParamsRef = useRef({});

  const onResponse = useCallback(
    ({
      apiValues,
      error,
    }: QueryResponseValuesType<TableQueryAPiResponseType<T>>) => {
      if (error) {
        alert("Error when calling table query request");

        return;
      }

      const { data: tableData, columnsTotals: columnsTotalsFromApiResponse } =
        apiValues || {};

      ensureBackEndSetsProperTotal(tableData);

      // @ts-ignore
      setData((oldValues: T) => {
        oldValues = oldValues || [];
        const newValues = shouldMergeResultsRef.current
          ? [...oldValues, ...(tableData || [])]
          : tableData;

        dataBaseTotalRecordsRef.current = getDataBaseTotalsRecords(newValues);
        return newValues;
      });

      const hasTotals =
        columnsTotalsFromApiResponse &&
        isObjHasData(columnsTotalsFromApiResponse);

      setColumnsTotals(() =>
        hasTotals ? columnsTotalsFromApiResponse : undefined
      );
      shouldMergeResultsRef.current = false;
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
    async (offset: number, searchParams: RecordTypeWithAnyValue) => {
      shouldMergeResultsRef.current = true;

      const params = {
        ...searchParams,
        poffset: offset,
      };

      searchParamsRef.current = params;

      await runQuery(params);
    },
    [runQuery]
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

  return {
    loading,
    runQuery,
    data,
    onFetchMore,
    setData,
    onSearchAndFilterTable,
    handleResetFiltersAndSorters,
    dataBaseTotalRecordsRef,
    searchParamsRef,
    columnsTotals,
  };
};

export default useTableQuery;
