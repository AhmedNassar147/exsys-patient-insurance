/*
 *
 * Package: `@exsys-clinio/select-with-api-query`.
 *
 */
import {
  memo,
  useMemo,
  useState,
  useEffect,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";
import { usePrevious } from "@exsys-clinio/hooks";
import { useBasicQuery } from "@exsys-clinio/network-hooks";
import SelectField from "@exsys-clinio/select-field";
import { QueryResponseValuesType } from "@exsys-clinio/types";
import {
  QueryType,
  SelectWithApiQueryProps,
  TransformSelectWithQueryApiDataFnType,
  IResultType,
  SelectWithApiQueryRefType,
  SelectWithApiQueryRefValuesType,
} from "./index.interface";

const defaultTransformApiDataFn: TransformSelectWithQueryApiDataFnType = (
  data
) => data.data;

const useMakeSelectMinimumSearchCharacters = () => 4;

const SelectWithApiQuery = <T extends QueryType>(
  {
    queryType,
    apiOrCodeId,
    apiParams,
    callOnFirstRender = true,
    withLanguageParam = true,
    debounceRequestTimeOutMS = 450,
    runQueryWhenLanguageChanged = true,
    excludeAuthorization,
    skipQuery,
    disableParamsChangeCheck,
    enableNetworkCache,
    preselectWhenOptionsReceived,
    checkAllParamsValuesToQuery,
    allowedParamsWithEmptyValue,
    preselectFirstKey,
    onChange,
    value,
    name,
    mode,
    transformApiDataFn = defaultTransformApiDataFn,
    ...selectProps
  }: SelectWithApiQueryProps<T>,
  ref?: SelectWithApiQueryRefType
) => {
  const [options, setOptions] = useState<IResultType>([]);

  const previousOptions = usePrevious(JSON.stringify(options));

  const selectFieldMode =
    mode && mode.includes("multiple") ? "multiple" : undefined;

  const isAutoComplete = !!(!!mode && mode.includes("autocomplete"));

  const minimumSearchCharacters = useMakeSelectMinimumSearchCharacters();

  useEffect(
    () => {
      if (
        (preselectWhenOptionsReceived || preselectFirstKey) &&
        previousOptions !== JSON.stringify(options) &&
        onChange
      ) {
        let foundItem = preselectFirstKey ? options[0] : undefined;

        if (preselectWhenOptionsReceived) {
          foundItem = options.find(
            (item) => item.key.toString() === `${value}`
          );
        }

        if (foundItem) {
          onChange({
            name: name || "",
            value: foundItem.key,
            option: foundItem,
            itemOptionData: foundItem,
          });
        }
      }
    },
    // eslint-disable-next-line
    [value, previousOptions, options]
  );

  const useQueryHook = useBasicQuery;

  // const useQueryHook =
  //   (queryType as QueryType) === "query" ? useBasicQuery : useCodeQuery;

  const handleOnResponse = useCallback(
    ({ apiValues, error }: QueryResponseValuesType<IResultType>) => {
      const areOptionsReceived = Array.isArray(apiValues);

      if (error || !areOptionsReceived) {
        return;
      }

      setOptions(() => apiValues);
    },
    []
  );

  const memoizedHookConfig = useMemo(() => {
    return {
      params: apiParams,
      withLanguageParam,
      excludeAuthorization,
      skipQuery,
      runQueryWhenLanguageChanged,
      // we don't call the backend api when we in the `autoComplete` mode in first time render
      // or when the params changed
      callOnFirstRender: isAutoComplete ? false : callOnFirstRender,
      disableParamsChangeCheck: isAutoComplete
        ? true
        : disableParamsChangeCheck,
      enableNetworkCache,
      checkAllParamsValuesToQuery,
      allowedParamsWithEmptyValue,
      debounceRequestTimeOutMS: isAutoComplete
        ? debounceRequestTimeOutMS || 600
        : debounceRequestTimeOutMS,
      // backend should provide options as data attribute in response.
      transformApiDataFn,
      ...((queryType as QueryType) !== "query"
        ? {
            type: queryType,
            codeId: apiOrCodeId,
          }
        : {
            apiId: apiOrCodeId,
          }),
      onResponse: handleOnResponse,
    };
  }, [
    apiParams,
    withLanguageParam,
    excludeAuthorization,
    skipQuery,
    runQueryWhenLanguageChanged,
    callOnFirstRender,
    isAutoComplete,
    disableParamsChangeCheck,
    enableNetworkCache,
    checkAllParamsValuesToQuery,
    allowedParamsWithEmptyValue,
    debounceRequestTimeOutMS,
    apiOrCodeId,
    queryType,
  ]);

  // @ts-ignore
  const { loading, runQuery } = useQueryHook(memoizedHookConfig);

  const clearOptions = useCallback(() => {
    setOptions(() => []);
  }, []);

  const onSearch = useCallback(
    (currentSearchValue: string) => {
      if (!currentSearchValue) {
        clearOptions();
        return;
      }

      if (currentSearchValue.length >= minimumSearchCharacters) {
        //NOTE: the current api should allow `search_word` as an api query parameter.
        runQuery({
          search_word: currentSearchValue,
        });
      }
    },
    [runQuery, clearOptions, minimumSearchCharacters]
  );

  useImperativeHandle(ref, () => ({
    runQuery,
    clearOptions,
  }));

  return (
    <SelectField
      {...selectProps}
      options={options}
      loading={loading}
      onChange={onChange}
      value={value}
      name={name}
      mode={selectFieldMode}
      onSearch={isAutoComplete ? onSearch : undefined}
    />
  );
};

// @ts-ignore ignore the react "forwardRef" misleading types.
export default memo(forwardRef(SelectWithApiQuery));
export type {
  SelectWithApiQueryRefValuesType,
  TransformSelectWithQueryApiDataFnType,
  SelectWithApiQueryRefType,
  SelectWithApiQueryProps,
};
