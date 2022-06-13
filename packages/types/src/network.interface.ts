/*
 *
 * Types: `network`.
 *
 */
import { API_IDS, CODES_IDS } from "@exsys-patient-insurance/api-constants";
import { SelectListProps } from "./form-field.interface";
import { KeysOfRecord, RecordTypeWithAnyValue } from "./base.interface";

export type ApiIdsTypes = KeysOfRecord<typeof API_IDS>;
export type CodeIdsTypes = KeysOfRecord<typeof CODES_IDS>;

export type QueryParamsType = RecordTypeWithAnyValue;

export interface BaseQueryConfigProps {
  apiId?: ApiIdsTypes;
  params?: QueryParamsType;
  callOnFirstRender?: boolean;
  skipQuery?: ((params: QueryParamsType) => boolean) | boolean;
  disableParamsChangeCheck?: boolean;
  enableNetworkCache?: boolean;
  runQueryWhenLanguageChanged?: boolean;
  debounceRequestTimeOutMS?: number;
  checkAllParamsValuesToQuery?: boolean | string[];
  withLanguageParam?: boolean;
  excludeAuthorization?: boolean;
  allowedParamsWithEmptyValue?: string[] | boolean;
}

export type QueryResponseValuesType<T = RecordTypeWithAnyValue> = {
  apiValues: T;
  error?: string;
  status?: number;
  errorCode?: string;
  queryParams: QueryParamsType;
};

export type OnResponseActionType<T = RecordTypeWithAnyValue> = (
  response: QueryResponseValuesType<T>
) => void;

export interface BasicQueryConfigProps<T> extends BaseQueryConfigProps {
  onResponse?: OnResponseActionType<T>;
  transformApiDataFn?: (data: any) => T;
}

export type BasicQueryNextParamsType = {
  userdb?: string;
  nextApiID?: ApiIdsTypes;
} & QueryParamsType;

export type UseBasicRunQueryFnType<T = any> = (
  nextParams?: BasicQueryNextParamsType,
  cb?: OnResponseActionType<T>
) => Promise<void>;

export type RunQueryFnType<T = any> = (
  nextParams?: QueryParamsType,
  cb?: OnResponseActionType<T>
) => Promise<void>;

export type UseCodeQueryOptions = {
  type: "code" | "u_code";
  codeId: CodeIdsTypes;
} & Omit<
  BasicQueryConfigProps<SelectListProps[]>,
  "apiId" | "transformApiDataFn"
>;
