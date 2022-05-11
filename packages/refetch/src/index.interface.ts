export type RequestMethod = "POST" | "PUT" | "GET" | "DELETE";

export type HeadersType = Record<string, string>;

export interface RequestResponse {
  data: Record<string, any>;
  error?: string;
  status: number | undefined;
  errorCode?: string;
}

export type Transformer = (data: Record<string, any>) => Record<string, any>;

export interface BaseParams {
  apiResource: string;
  headers?: HeadersType;
  transformer?: Transformer;
  params?: object;
}

export type BodyShape =
  | Record<string, any>
  | {
      files: File[];
      fileName: string;
    };

export interface PostType extends BaseParams {
  body?: BodyShape;
  useFormData?: boolean;
}

export interface Params extends PostType, BaseParams {
  method?: RequestMethod;
}

export type createApiResource = (source: string, params: object) => string;
