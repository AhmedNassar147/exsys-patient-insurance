/*
 *
 * Types: `@exsys-patient-insurance/select-with-api-query`.
 *
 */
import { QUERY_TYPES } from "@exsys-patient-insurance/global-app-constants";
import {
  SelectFieldProps,
  SelectModeType,
} from "@exsys-patient-insurance/select-field";
import type {
  RecordType,
  SelectListProps,
  ValuesOfRecordAsOptions,
  ApiIdsTypes,
  CodeIdsTypes,
  BaseQueryConfigProps,
  UseBasicRunQueryFnType,
  QueryParamsType,
} from "@exsys-patient-insurance/types";

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
  apiOrCodeId: T extends "query" ? ApiIdsTypes : CodeIdsTypes;
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
