/*
 *
 * Types: `@exsys-clinio/select-with-api-query`.
 *
 */
import { QUERY_TYPES } from "@exsys-clinio/global-app-constants";
import { SelectFieldProps, SelectModeType } from "@exsys-clinio/select-field";
import type {
  RecordType,
  SelectListProps,
  ValuesOfRecordAsOptions,
  ApiIdsTypes,
  BaseQueryConfigProps,
  UseBasicRunQueryFnType,
  QueryParamsType,
} from "@exsys-clinio/types";

export type IResultType = SelectListProps[];

export type QueryType = ValuesOfRecordAsOptions<typeof QUERY_TYPES>;

export type SelectWithApiQueryModesType =
  | SelectModeType
  | "autocomplete"
  | "multiple-autocomplete";

export type SelectWithApiQueryProps<T extends QueryType> = Omit<
  BaseQueryConfigProps,
  "apiId" | "params"
> & {
  queryType: QueryType;
  apiOrCodeId: T extends "query" ? ApiIdsTypes : ApiIdsTypes;
  apiParams?: QueryParamsType;
  preselectWhenOptionsReceived?: boolean;
  preselectFirstKey?: boolean;
  transformApiDataFn?: TransformSelectWithQueryApiDataFnType;
} & Omit<SelectFieldProps, "options" | "mode" | "onSearch"> & {
    mode?: SelectWithApiQueryModesType;
  };

export type TransformSelectWithQueryApiDataFnType<T = IResultType> = (
  data: RecordType<T>
) => IResultType;

export type SelectWithApiQueryRefValuesType = {
  runQuery: UseBasicRunQueryFnType<IResultType>;
  clearOptions: () => void;
};

export type SelectWithApiQueryRefType = React.MutableRefObject<
  SelectWithApiQueryRefValuesType | undefined
>;
