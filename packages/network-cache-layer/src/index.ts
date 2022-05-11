/*
 *
 * Package: `@exsys-clinio/network-cache-layer`.
 *
 */
import {
  isObjHasData,
  sortObjectByKeysAndStringify,
  getPageNameFromPathName,
} from "@exsys-clinio/helpers";
// import { API_IDS } from "@exsys-clinio/api-constants";
import { RequestResponse } from "@exsys-clinio/refetch";
import { RecordType, RecordTypeWithAnyValue } from "@exsys-clinio/types";

// const { LABELS } = API_IDS;

const LABELS = "labels";
const LOGIN_PAGE_CONVENTION_NAME = "base";

type CachedRequestsType = {
  [x: string]: string;
};

class NetworkCacheLayer {
  private cachedRequests: CachedRequestsType = {};

  createApiWithParamsPath(
    apiBaseResource: string,
    allParams?: RecordTypeWithAnyValue
  ) {
    // we sort and stringify the params by keys because later we want to compare previous params
    // with current ones of given `apiResource` and you can't compare strings equality if same
    // strings have the same characters but not the same positions.
    // like "ahmed" never equal "ahmde"
    const nextAllParamsSortedAndStringified =
      sortObjectByKeysAndStringify(allParams);

    return `${apiBaseResource}#${nextAllParamsSortedAndStringified}`;
  }

  addApiDataResponseAndCreateApiParamsPath(
    apiBaseResource: string,
    fetchedApiResponse: RequestResponse,
    params?: RecordTypeWithAnyValue
  ) {
    const { error, status, data } = fetchedApiResponse;

    const apiWithParamsPath = this.createApiWithParamsPath(
      apiBaseResource,
      params
    );

    const { [apiWithParamsPath]: failedRequest, ...otherRequestResponse } =
      this.cachedRequests;

    const isFailedRequest =
      !!error ||
      status !== 200 ||
      data?.status === "failure" ||
      !!data?.error_code;

    // we don't want to use `setIn`, because it does complex lopping and that increases
    // the cache time complexity.
    this.cachedRequests = {
      ...otherRequestResponse,
      ...(isFailedRequest
        ? null
        : {
            // first we could have a very very big cache params and responses,
            // and this could harm the user device memory / makes the app slower,
            // if store them as objects, so we stringify the successful api params and responses.
            [apiWithParamsPath]: JSON.stringify(fetchedApiResponse),
          }),
    };
  }

  private getCachedApiResponseByPath(apiWithParamsPath: string) {
    const result = this.cachedRequests[apiWithParamsPath];

    return result ? (JSON.parse(result) as RequestResponse) : undefined;
  }

  extractLabelsFromCachedResponses(onlyBasePageLabels?: boolean) {
    if (!isObjHasData(this.cachedRequests)) {
      return {};
    }

    const currentPageName = getPageNameFromPathName().replace(
      /login/,
      LOGIN_PAGE_CONVENTION_NAME
    );

    let pagesToCollectLabelsFrom = [currentPageName];

    // we combine current page labels with the base labels.
    if (currentPageName !== LOGIN_PAGE_CONVENTION_NAME) {
      pagesToCollectLabelsFrom = onlyBasePageLabels
        ? [LOGIN_PAGE_CONVENTION_NAME]
        : [...pagesToCollectLabelsFrom, LOGIN_PAGE_CONVENTION_NAME];
    }

    // const cachedUserData = getCachedUser();
    // const currentLanguageId = cachedUserData?.language_id ?? 1;

    const currentLanguageId = 1;

    const onlyThesePagesWithCurrentLanguageSearchRegexp = new RegExp(
      `${LABELS}.+pPageId.+(${pagesToCollectLabelsFrom.join(
        "|"
      )}).+planguageid.+${currentLanguageId}`,
      "i"
    );

    const onlyThesePagesWithCurrentLanguagePaths = Object.keys(
      this.cachedRequests
    ).filter((apiWithParamsPath) =>
      onlyThesePagesWithCurrentLanguageSearchRegexp.test(apiWithParamsPath)
    );

    if (onlyThesePagesWithCurrentLanguagePaths?.length) {
      return onlyThesePagesWithCurrentLanguagePaths.reduce(
        (previous: RecordType, apiWithParamsPath: string) => {
          const result = this.getCachedApiResponseByPath(apiWithParamsPath);

          if (result?.data) {
            return {
              ...previous,
              ...result.data,
            };
          }

          return previous;
        },
        {} as RecordType
      );
    }

    return {};
  }

  getCachedApiResourceResponse(
    apiBaseResource: string,
    allParams?: RecordTypeWithAnyValue
  ) {
    if (!isObjHasData(this.cachedRequests)) {
      return undefined;
    }

    const apiWithParamsPath = this.createApiWithParamsPath(
      apiBaseResource,
      allParams
    );

    const result = this.getCachedApiResponseByPath(apiWithParamsPath);

    return result;
  }

  updateCachedApiResourceResponse(
    apiBaseResource: string,
    updater: (
      previousResponse?: RequestResponse
    ) => RequestResponse | undefined,
    allParams?: RecordTypeWithAnyValue
  ) {
    if (!isObjHasData(this.cachedRequests)) {
      return;
    }

    const previousResponse = this.getCachedApiResourceResponse(
      apiBaseResource,
      allParams
    );

    const nextResponse = updater(previousResponse);

    if (nextResponse) {
      this.addApiDataResponseAndCreateApiParamsPath(
        apiBaseResource,
        nextResponse,
        allParams
      );
    }
  }

  clear() {
    this.cachedRequests = {};
  }
}

const networkCacheLayer = new NetworkCacheLayer();

export default networkCacheLayer;
