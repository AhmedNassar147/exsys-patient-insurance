/*
 *
 * `useBasicMutation`: `@exsys-clinio/network-hooks`.
 *
 */
import { useCallback, useState } from "react";
import {
  useMakeSelectAuthorization,
  useMakeSelectCurrentLanguageId,
} from "@exsys-clinio/app-config-store";
import {
  BodyShape,
  postRequest,
  deleteRequest,
  putRequest,
} from "@exsys-clinio/refetch";
import { API_IDS } from "@exsys-clinio/api-constants";
import {
  RecordTypeWithAnyValue,
  ApiIdsTypes,
  OnResponseActionType,
  QueryResponseValuesType,
} from "@exsys-clinio/types";

type MutationMethodType = "post" | "put" | "delete";

interface ConfigProps<T> {
  apiId?: ApiIdsTypes;
  method?: MutationMethodType;
  onResponse?: OnResponseActionType<T>;
  transformApiDataFn?: (data: any) => T;
  useFormData?: boolean;
  excludeAuthorization?: boolean;
  includeLanguage?: boolean;
}

interface MutateCallBackConfig<T> {
  body: BodyShape;
  cb?: OnResponseActionType<T>;
  params?: RecordTypeWithAnyValue;
  nextApiId?: ApiIdsTypes;
  nextMethod?: MutationMethodType;
  isUsingFormData?: boolean;
}

const mergeBodyData = (
  initial?: RecordTypeWithAnyValue,
  lastConfig?: RecordTypeWithAnyValue
) => {
  return { ...(initial || {}), ...lastConfig };
};

const useBasicMutation = <T = RecordTypeWithAnyValue>({
  apiId,
  onResponse,
  transformApiDataFn,
  method,
  useFormData,
  excludeAuthorization,
  includeLanguage,
}: ConfigProps<T>) => {
  const planguageid = useMakeSelectCurrentLanguageId();
  const authorization = useMakeSelectAuthorization();
  const [loading, setLoading] = useState<boolean>(false);

  const mutate = useCallback(
    async ({
      body,
      cb,
      params,
      nextApiId,
      nextMethod,
      isUsingFormData,
    }: MutateCallBackConfig<T>) => {
      const actualApiId = nextApiId || apiId;

      if (!actualApiId) {
        throw new Error(
          "You should pass `apiId` or `nextApiId`, but got undefined"
        );
      }

      setLoading(true);

      let finalBody =
        excludeAuthorization ||
        (typeof isUsingFormData === "undefined" ? useFormData : isUsingFormData)
          ? body
          : mergeBodyData({ authorization }, body);

      finalBody = includeLanguage
        ? mergeBodyData({ planguageid }, finalBody)
        : finalBody;

      const actualMethod = method || nextMethod;

      const requestMethod =
        actualMethod === "delete"
          ? deleteRequest
          : method === "put"
          ? putRequest
          : postRequest;

      const apiUrl = API_IDS[actualApiId as ApiIdsTypes];

      const {
        error,
        status,
        data: apiValues,
        errorCode,
      } = await requestMethod({
        apiResource: apiUrl,
        params: useFormData ? { ...params, authorization } : params,
        transformer: transformApiDataFn,
        useFormData,
        body: finalBody,
      });

      const response = {
        apiValues,
        error,
        status,
        errorCode,
      } as QueryResponseValuesType<T>;

      if (cb) {
        cb(response);
      }

      if (onResponse) {
        onResponse(response);
      }

      setLoading(false);
    },
    [
      apiId,
      excludeAuthorization,
      useFormData,
      authorization,
      includeLanguage,
      planguageid,
      method,
      transformApiDataFn,
      onResponse,
    ]
  );

  return { loading, mutate, setLoading };
};

export default useBasicMutation;
