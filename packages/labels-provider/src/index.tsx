/*
 *
 * Package: `@exsys-clinio/labels-provider`.
 *
 */
import { useState } from "react";
// import { useMakeSelectCurrentUserdb } from "@exsys-clinio/app-config-store";
// import { useGetPageNameFromRouter } from "@exsys-clinio/hooks";
// import {
//   useBasicQuery,
//   QueryResponseValuesType,
// } from "@exsys-clinio/network-hooks";
import { RecordType } from "@exsys-clinio/types";
import Store from "./context";

interface IProps
  extends React.PropsWithChildren<{
    componentName?: string;
  }> {}

const LabelsProvider = ({ children }: IProps) => {
  const [state] = useState<RecordType>({});
  const [basePageLabels] = useState<RecordType>({});
  // const pageNameFromRouter = useGetPageNameFromRouter();
  // we need to use this hook here because the `userdb` in `useBasicQuery` could be,
  // `undefined` since this context is the higher than the `packages/base-page`.
  // const userdb = useMakeSelectCurrentUserdb();

  // const computedPageName = componentName || pageNameFromRouter;
  // // const isBasePage = computedPageName === LOGIN_PAGE_CONVENTION_NAME;
  // const isBasePage = false;

  // const handleLabelsResponse = useCallback(
  //   (setLabels: (value: React.SetStateAction<RecordType>) => void) => ({
  //     apiValues,
  //     error,
  //   }: QueryResponseValuesType<RecordType>) => {
  //     if (error) {
  //       console.error(`error getting Labels`);
  //     }

  //     // we avoid extra renders if the labels are empty object.
  //     if (!Object.keys(apiValues).length) {
  //       return;
  //     }

  //     setLabels(() => apiValues);
  //   },
  //   []
  // );

  // const shouldSkipQuery = !computedPageName || !userdb || isBasePage;

  // const queryOptions = {
  //   callOnFirstRender: true,
  //   excludeAuthorization: true,
  //   skipQuery: shouldSkipQuery,
  //   enableNetworkCache: true,
  // };

  // useBasicQuery<RecordType>({
  //   apiId: "LABELS",
  //   onResponse: handleLabelsResponse(setPageLabels),
  //   debounceRequestTimeOutMS: 20,
  //   ...queryOptions,
  //   params: {
  //     pPageId: computedPageName,
  //     userdb,
  //   },
  // });

  // useBasicQuery<RecordType>({
  //   apiId: "LABELS",
  //   onResponse: handleLabelsResponse(setBasePageLabels),
  //   debounceRequestTimeOutMS: 25,
  //   ...queryOptions,
  //   params: {
  //     pPageId: LOGIN_PAGE_CONVENTION_NAME,
  //     userdb,
  //   },
  // });

  return (
    <Store.Provider value={{ ...state, ...basePageLabels }}>
      {children}
    </Store.Provider>
  );
};

export default LabelsProvider;
export { default as usePageLabelsContext } from "./usePageLabelsContext";
export { default as useTranslateIdFactory } from "./useTranslateIdFactory";
