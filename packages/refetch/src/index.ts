/*
 *
 * Package: `@exsys-clinio/refetch`.
 *
 */
import createApiResource from "./helpers/createApiResource";
import getStatusError from "./helpers/getStatusError";
import getRequestBody from "./helpers/getRequestBody";
import { BASE_HEADERS } from "./constants";
import {
  HeadersType,
  Params,
  RequestResponse,
  PostType,
  BaseParams,
} from "./index.interface";

const serverUnhandledError = "unhandled Request or serverError";

export const abortController = new AbortController();
const signal = abortController.signal;

class Refetch {
  // @ts-ignore
  baseUrl: string = process.env.REACT_APP_API_URL;
  headers: HeadersType = BASE_HEADERS;

  setHeaders(headers: HeadersType) {
    if (headers) {
      this.headers = headers;
    }
  }

  private async tryApi({
    method = "GET",
    apiResource = "",
    body,
    params,
    transformer,
    headers = this.headers,
    useFormData,
  }: Params): Promise<RequestResponse> {
    let actualResponse: RequestResponse = {
      data: {},
      status: undefined,
    };
    if (params) {
      apiResource = createApiResource(apiResource, params);
    }

    const apiUrl = this.baseUrl ? `${this.baseUrl}${apiResource}` : apiResource;

    try {
      let response = await fetch(apiUrl, {
        method,
        signal,
        headers: useFormData ? undefined : headers,
        ...getRequestBody(body, useFormData),
      });

      actualResponse.status = response.status;

      if (response.ok && response.status === 200) {
        const responseClone = response.clone();
        let data: Record<string, string> = {};

        try {
          data = await responseClone.json();
        } catch (error) {
          const responseText = await responseClone.text();

          console.warn(`
            the api ${apiUrl} returns non json data.
            given this response ${responseText} resolved as text.
            please tell the backend to ensure the data should be json type.
          `);
        }

        actualResponse.errorCode = data.error_code;

        if (data.status) {
          if (data.status === "success") {
            actualResponse.status = 200;
            actualResponse.error = "";
          } else {
            actualResponse.error =
              data.error_message || data.error_code || serverUnhandledError;
            // actualResponse.error = actualResponse.error.replace(/\s|\t/gm, "");
          }
        }

        if (actualResponse.status !== 200 && !actualResponse.error) {
          actualResponse.error = getStatusError(response.status);
        }

        if (!actualResponse.error && actualResponse.status === 200) {
          actualResponse.data = transformer ? transformer(data) : data;
        }
      } else {
        actualResponse.error = getStatusError(response.status);
      }
    } catch (error) {
      console.error(`error in ${apiUrl} api`, error);
      actualResponse.error = serverUnhandledError;
    }

    return actualResponse;
  }

  async postRequest({
    apiResource,
    body,
    headers,
    transformer,
    useFormData,
    params,
  }: PostType) {
    return await this.tryApi({
      method: "POST",
      apiResource,
      body,
      headers,
      params,
      transformer,
      useFormData,
    });
  }

  async getRequest({ apiResource, headers, params, transformer }: BaseParams) {
    return await this.tryApi({
      method: "GET",
      apiResource,
      params,
      headers,
      transformer,
    });
  }

  async putRequest({
    apiResource,
    headers,
    body,
    transformer,
    useFormData,
    params,
  }: PostType) {
    return await this.tryApi({
      method: "PUT",
      apiResource,
      body,
      headers,
      transformer,
      useFormData,
      params,
    });
  }

  async deleteRequest({
    apiResource,
    headers,
    body,
    transformer,
    useFormData,
    params,
  }: PostType) {
    return await this.tryApi({
      method: "DELETE",
      apiResource,
      body,
      headers,
      transformer,
      useFormData,
      params,
    });
  }
}

const refetch = new Refetch();

export const setHeaders = refetch.setHeaders.bind(refetch);

export const postRequest = refetch.postRequest.bind(refetch);
export const putRequest = refetch.putRequest.bind(refetch);
export const getRequest = refetch.getRequest.bind(refetch);
export const deleteRequest = refetch.deleteRequest.bind(refetch);

export * from "./index.interface";
