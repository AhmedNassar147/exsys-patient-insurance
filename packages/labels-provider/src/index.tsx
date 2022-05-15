/*
 *
 * Package: `@exsys-clinio/labels-provider`.
 *
 */
import { useState, useCallback } from "react";
import { useBasicQuery } from "@exsys-clinio/network-hooks";
import { RecordType, QueryResponseValuesType } from "@exsys-clinio/types";
import Store from "./context";

interface IProps
  extends React.PropsWithChildren<{
    componentName?: string;
  }> {}

const LabelsProvider = ({ children, componentName }: IProps) => {
  const [state, setPageLabels] = useState<RecordType>({});
  // const [basePageLabels, setPageLabels] = useState<RecordType>({});
  // const pageNameFromRouter = useGetPageNameFromRouter();
  // we need to use this hook here because the `userdb` in `useBasicQuery` could be,
  // `undefined` since this context is the higher than the `packages/base-page`.
  // const userdb = useMakeSelectCurrentUserdb();

  // const computedPageName = componentName || pageNameFromRouter;
  // // const isBasePage = computedPageName === LOGIN_PAGE_CONVENTION_NAME;

  const handleLabelsResponse = useCallback(
    (setLabels: (value: React.SetStateAction<RecordType>) => void) =>
      ({ apiValues, error }: QueryResponseValuesType<RecordType>) => {
        if (error) {
          console.error(`error getting Labels`);
        }

        // we avoid extra renders if the labels are empty object.
        if (!Object.keys(apiValues).length) {
          return;
        }

        setLabels(() => apiValues);
      },
    []
  );

  const shouldSkipQuery = !componentName;

  const queryOptions = {
    callOnFirstRender: true,
    excludeAuthorization: true,
    skipQuery: shouldSkipQuery,
    enableNetworkCache: true,
  };

  useBasicQuery<RecordType>({
    apiId: "QUERY_EXSYS_PAGE_LABELS",
    onResponse: handleLabelsResponse(setPageLabels),
    debounceRequestTimeOutMS: 20,
    ...queryOptions,
    params: {
      pPageId: componentName,
    },
  });

  return <Store.Provider value={state}>{children}</Store.Provider>;
};

export default LabelsProvider;
export { default as usePageLabelsContext } from "./usePageLabelsContext";
export { default as useTranslateIdFactory } from "./useTranslateIdFactory";
