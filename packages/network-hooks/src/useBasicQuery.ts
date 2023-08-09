/*
 *
 * `useBasicQuery`: `@exsys-patient-insurance/network-hooks`.
 *
 */
import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { usePrevious } from "@exsys-patient-insurance/hooks";
import {
  useHasLanguageChanged,
  useMakeSelectCurrentLanguageId,
  useMakeSelectAuthorization,
} from "@exsys-patient-insurance/app-config-store";
import networkCacheLayer from "@exsys-patient-insurance/network-cache-layer";
import { API_IDS } from "@exsys-patient-insurance/api-constants";
import { debounce, objectIs } from "@exsys-patient-insurance/helpers";
import { getRequest, RequestResponse } from "@exsys-patient-insurance/refetch";
import {
  RecordTypeWithAnyValue,
  BasicQueryConfigProps,
  UseBasicRunQueryFnType,
  BasicQueryNextParamsType,
  QueryResponseValuesType,
  OnResponseActionType,
  QueryParamsType,
} from "@exsys-patient-insurance/types";

type ResultType<T> = {
  loading: boolean;
  runQuery: UseBasicRunQueryFnType<T>;
  makeQueryRequest: UseBasicRunQueryFnType<T>;
  queryError: string;
  latestQueryParamsRef: React.MutableRefObject<RecordTypeWithAnyValue>;
  updateQueryCachedResponse: (
    updater: (previousResponse?: RequestResponse) => RequestResponse | undefined
  ) => void;
};

const DEFAULT_OPTIONS = {
  withLanguageParam: true,
  debounceRequestTimeOutMS: 450,
  runQueryWhenLanguageChanged: true,
  enableNetworkCache: false,
  disableParamsChangeCheck: false,
  checkAllParamsValuesToQuery: false,
  useCurrentUserName: false,
};

// const defaultResponseResolver = <T>(data: RecordType<T>) => data.data;

const useBasicQuery = <T = any>(
  options: BasicQueryConfigProps<T>
): ResultType<T> => {
  const {
    params,
    apiId,
    onResponse,
    callOnFirstRender,
    withLanguageParam,
    // transformApiDataFn = defaultResponseResolver,
    transformApiDataFn,
    excludeAuthorization,
    skipQuery,
    debounceRequestTimeOutMS,
    runQueryWhenLanguageChanged,
    enableNetworkCache,
    disableParamsChangeCheck,
    checkAllParamsValuesToQuery,
    allowedParamsWithEmptyValue,
  } = { ...DEFAULT_OPTIONS, ...options };

  const baseNextParams = params || {};

  const authorization = useMakeSelectAuthorization();
  const planguageid = useMakeSelectCurrentLanguageId();
  const hasLanguageChanged = useHasLanguageChanged();

  console.log({
    hasLanguageChanged,
    planguageid,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const previousParams = usePrevious(baseNextParams);
  const queryCalledOnFirstRender = useRef<boolean>(false);
  const latestQueryParamsRef = useRef<RecordTypeWithAnyValue>(baseNextParams);
  const queryErrorRef = useRef<string>("");

  const currentRunningQueriesRef = useRef<string[]>([]);

  const canRunQuery = useMemo(
    () =>
      !!(excludeAuthorization || authorization) &&
      !!(!withLanguageParam || planguageid),
    [authorization, excludeAuthorization, planguageid, withLanguageParam]
  );

  // checks if we the params has changed.
  const hasParamsChanged = useCallback(
    () => !objectIs(previousParams, baseNextParams),
    [baseNextParams, previousParams]
  );

  const buildQueryParams = useCallback(
    (
      nextParams?: RecordTypeWithAnyValue,
      donotUpdateResponseCallback?: boolean
    ): RecordTypeWithAnyValue => {
      let finalParams: RecordTypeWithAnyValue = latestQueryParamsRef.current;

      if (nextParams && !donotUpdateResponseCallback) {
        finalParams = { ...finalParams, ...nextParams };
      }

      finalParams = Object.keys(finalParams).reduce((acc, key) => {
        const paramValue = finalParams[key];

        return {
          ...acc,
          [key]: typeof paramValue === "undefined" ? "" : paramValue,
        };
      }, {});

      if (!donotUpdateResponseCallback) {
        latestQueryParamsRef.current = finalParams;
      }
      return finalParams;
    },
    [latestQueryParamsRef]
  );

  const applyResponse = useCallback(
    async ({
      apiResponse,
      currentQueryApiPath,
      queryParams,
      donotUpdateResponseCallback,
      cb,
    }: {
      apiResponse: RequestResponse;
      currentQueryApiPath: string;
      queryParams: QueryParamsType;
      cb?: OnResponseActionType<T>;
      donotUpdateResponseCallback?: boolean;
    }) => {
      const { status, error, data: apiValues, errorCode } = apiResponse;

      const response = {
        apiValues,
        error,
        status,
        queryParams,
        errorCode,
      } as QueryResponseValuesType<T>;

      if (cb) {
        cb(response);
      }

      if (onResponse && !donotUpdateResponseCallback) {
        onResponse(response);
      }

      if (error) {
        queryErrorRef.current = error;
      }

      setLoading(false);

      currentRunningQueriesRef.current =
        currentRunningQueriesRef.current.filter(
          (apiPath) => apiPath !== currentQueryApiPath
        );
    },
    [onResponse, queryErrorRef, currentRunningQueriesRef]
  );

  const makeRequestOrGetFromCache = useCallback(
    async (
      queryParams?: BasicQueryNextParamsType,
      cb?: OnResponseActionType<T>
    ) => {
      if (!canRunQuery) {
        queryCalledOnFirstRender.current = false;
        return;
      }

      queryErrorRef.current = "";
      setLoading(true);

      const { nextApiID, donotUpdateResponseCallback, ...nextParams } =
        queryParams || {};

      const allParams = buildQueryParams(
        nextParams,
        donotUpdateResponseCallback
      );

      let shouldSkipQuery =
        skipQuery instanceof Function ? skipQuery(allParams) : skipQuery;

      if (!shouldSkipQuery && checkAllParamsValuesToQuery) {
        let allKeys = Array.isArray(checkAllParamsValuesToQuery)
          ? checkAllParamsValuesToQuery
          : Object.keys(allParams);

        if (Array.isArray(allowedParamsWithEmptyValue)) {
          allKeys = allKeys.filter(
            (key) => !allowedParamsWithEmptyValue.includes(key)
          );
        }

        shouldSkipQuery =
          allowedParamsWithEmptyValue === true
            ? false
            : !allKeys.every((key) => !!allParams[key]);
      }

      if (!shouldSkipQuery && !!apiId) {
        const nextApiId = nextApiID || apiId;
        const queryUrl = API_IDS[nextApiId];

        const apiResource = queryUrl;

        let maybeCachedResponse: RequestResponse | undefined;

        // we don't fire same api with same params if one still running
        const currentQueryApiPath = networkCacheLayer.createApiWithParamsPath(
          apiResource,
          allParams
        );

        if (currentRunningQueriesRef.current.includes(currentQueryApiPath)) {
          return;
        }

        currentRunningQueriesRef.current = [
          ...currentRunningQueriesRef.current,
          currentQueryApiPath,
        ];

        if (enableNetworkCache) {
          maybeCachedResponse = networkCacheLayer.getCachedApiResourceResponse(
            apiResource,
            allParams
          );
        }

        if (maybeCachedResponse) {
          applyResponse({
            apiResponse: maybeCachedResponse,
            currentQueryApiPath,
            queryParams: allParams,
            donotUpdateResponseCallback,
            cb,
          });

          return;
        }

        const apiResponse = await getRequest({
          apiResource,
          params: allParams,
          transformer: transformApiDataFn,
        });

        if (enableNetworkCache) {
          networkCacheLayer.addApiDataResponseAndCreateApiParamsPath(
            apiResource,
            apiResponse,
            allParams
          );
        }

        applyResponse({
          apiResponse,
          currentQueryApiPath,
          queryParams: allParams,
          donotUpdateResponseCallback,
          cb,
        });
      } else {
        queryCalledOnFirstRender.current = false;
        if (onResponse) {
          setLoading(false);
        }
      }
    },
    [
      canRunQuery,
      buildQueryParams,
      skipQuery,
      checkAllParamsValuesToQuery,
      apiId,
      allowedParamsWithEmptyValue,
      enableNetworkCache,
      transformApiDataFn,
      applyResponse,
      onResponse,
    ]
  );

  const updateQueryCachedResponse = useCallback(
    (
      updater: (
        previousResponse?: RequestResponse
      ) => RequestResponse | undefined
    ) => {
      if (apiId) {
        const queryUrl = API_IDS[apiId];

        const apiResource = queryUrl;

        networkCacheLayer.updateCachedApiResourceResponse(
          apiResource,
          updater,
          buildQueryParams()
        );
      }
    },
    [apiId, buildQueryParams]
  );

  const runQuery = useCallback(
    debounce(
      (
        queryParams?: BasicQueryNextParamsType,
        cb?: OnResponseActionType<T>
      ) => {
        if (canRunQuery) {
          makeRequestOrGetFromCache(queryParams, cb);
        }
      },
      debounceRequestTimeOutMS
    ),
    [canRunQuery, makeRequestOrGetFromCache]
  );

  useEffect(
    () => {
      let nextParams: RecordTypeWithAnyValue = {};

      if (planguageid && withLanguageParam) {
        nextParams.planguageid = planguageid;
      }

      if (!excludeAuthorization && authorization) {
        nextParams.authorization = authorization;
      }

      latestQueryParamsRef.current = {
        ...latestQueryParamsRef.current,
        ...nextParams,
        ...(hasParamsChanged() ? baseNextParams : null),
      };
    },
    // eslint-disable-next-line
    [canRunQuery, params, hasParamsChanged, planguageid, authorization]
  );

  useEffect(
    () => {
      if (canRunQuery) {
        // checks if we can run the query for first render.
        const canRunQueryForFirstRender =
          !!callOnFirstRender && !queryCalledOnFirstRender.current;

        // when current language changed.
        const canRunQueryIfLanguageChanged =
          runQueryWhenLanguageChanged &&
          withLanguageParam &&
          hasLanguageChanged;

        if (
          canRunQueryForFirstRender ||
          canRunQueryIfLanguageChanged ||
          (!disableParamsChangeCheck && hasParamsChanged())
        ) {
          queryCalledOnFirstRender.current = canRunQueryForFirstRender;

          makeRequestOrGetFromCache(latestQueryParamsRef.current, onResponse);
        }
      }
    },
    // eslint-disable-next-line
    [
      hasLanguageChanged,
      runQueryWhenLanguageChanged,
      params,
      canRunQuery,
      callOnFirstRender,
      disableParamsChangeCheck,
      onResponse,
    ]
  );

  return {
    loading,
    // @ts-ignore
    runQuery,
    makeQueryRequest: makeRequestOrGetFromCache,
    queryError: queryErrorRef.current,
    updateQueryCachedResponse,
    latestQueryParamsRef,
  };
};

export default useBasicQuery;
