/*
 *
 * Hook: `useClientCodeQueryAndMutation`.
 *
 */
import { useCallback, useState } from "react";
import { CODES_IDS } from "@exsys-patient-insurance/api-constants";
import { useMakeSelectIsRTLLayout } from "@exsys-patient-insurance/app-config-store";
import {
  useBasicMutation,
  useBasicQuery,
} from "@exsys-patient-insurance/network-hooks";
import {
  ClientSelectAddedItemOptions,
  ClientSelectDataOptions,
  StringNumber,
  SelectListProps,
  CodeIdsTypes,
  QueryResponseValuesType,
  BasicQueryConfigProps,
} from "@exsys-patient-insurance/types";
import { DEFAULT_CLIENT_SELECT_DATA_OPTIONS } from "../constants";
import { UseClientCodeQueryResultType } from "../index.interface";

type ClientCodeAddedItemActionOption = {
  key: StringNumber;
  alreadyAddedItem: ClientSelectAddedItemOptions;
};

export type UseClientCodeQueryOptions = Omit<
  BasicQueryConfigProps<SelectListProps[]>,
  | "apiId"
  | "excludeUserDb"
  | "excludeAuthorization"
  | "transformApiDataFn"
  | "type"
  | "onResponse"
> & {
  codeId: CodeIdsTypes;
  onNewItemAdded?: (data: ClientCodeAddedItemActionOption) => void;
};

const useClientCodeQueryAndMutation = ({
  codeId,
  params,
  onNewItemAdded,
  ...restOptions
}: UseClientCodeQueryOptions): UseClientCodeQueryResultType => {
  const [clientOptionsData, setClientOptionsData] =
    useState<ClientSelectDataOptions>(DEFAULT_CLIENT_SELECT_DATA_OPTIONS);

  const isRightToLeft = useMakeSelectIsRTLLayout();

  const codeType = CODES_IDS[codeId];

  const handleQueryResult = useCallback(
    ({
      apiValues,
      error,
      status,
    }: QueryResponseValuesType<ClientSelectDataOptions>) => {
      const isApiError =
        status !== 200 || !!error || !Array.isArray(apiValues.data);

      setClientOptionsData(() =>
        isApiError ? DEFAULT_CLIENT_SELECT_DATA_OPTIONS : apiValues
      );
    },
    []
  );

  const { loading: queryLoading, runQuery: loadCodeData } =
    useBasicQuery<ClientSelectDataOptions>({
      apiId: "EXSYS_CLIENT_CODE",
      skipQuery: !codeType,
      params: {
        codetype: codeType,
        ...params,
      },
      ...restOptions,
      onResponse: handleQueryResult,
    });

  const { loading: postCodeNewItemLoading, mutate } = useBasicMutation({
    apiId: "EXSYS_ADD_CLIENT_CODE_ITEM",
    method: "post",
  });

  const handleAddNewCodeItem = useCallback(
    (newItem: ClientSelectAddedItemOptions) => {
      mutate({
        body: {
          code_type: codeType,
          ...newItem,
        },
        cb: ({ apiValues, error }) => {
          const isSuccess = apiValues.status === "success" && !error;

          if (isSuccess) {
            const { description_p, description_s } = newItem;
            const newKey = apiValues.key;

            if (onNewItemAdded) {
              onNewItemAdded({
                key: newKey,
                alreadyAddedItem: newItem,
              });
            }

            setClientOptionsData((previousData) => ({
              ...previousData,
              data: [
                ...(previousData.data || []),
                {
                  key: newKey,
                  value: !isRightToLeft ? description_p : description_s,
                },
              ],
            }));
          }
        },
      });
    },
    [codeType, isRightToLeft, mutate, onNewItemAdded]
  );

  return {
    handleAddNewCodeItem,
    postCodeNewItemLoading,
    queryLoading,
    loadCodeData,
    clientOptionsData,
  };
};

export default useClientCodeQueryAndMutation;
