/*
 *
 * Package: `@exsys-patient-insurance/labels-provider`.
 *
 */
import { useState, useCallback, useMemo } from "react";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import { useGetPageNameFromRouter } from "@exsys-patient-insurance/hooks";
import {
  RecordType,
  QueryResponseValuesType,
} from "@exsys-patient-insurance/types";
import Store from "./context";

interface IProps
  extends React.PropsWithChildren<{
    componentName?: string;
  }> {}

const LOGIN_PAGE_CONVENTION_NAME = "base";

const queryOptions = {
  callOnFirstRender: true,
  excludeAuthorization: true,
  enableNetworkCache: true,
};

const LabelsProvider = ({ children, componentName }: IProps) => {
  const [state, setPageLabels] = useState<RecordType>({});
  const [basePageLabels, setBasePageLabels] = useState<RecordType>({});
  const pageNameFromRouter = useGetPageNameFromRouter();

  const computedPageName = componentName || pageNameFromRouter;
  const isBasePage = computedPageName === LOGIN_PAGE_CONVENTION_NAME;

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

  const shouldSkipQuery = !computedPageName || isBasePage;

  useBasicQuery<RecordType>({
    apiId: "QUERY_EXSYS_PAGE_LABELS",
    onResponse: handleLabelsResponse(setPageLabels),
    debounceRequestTimeOutMS: 20,
    ...queryOptions,
    skipQuery: shouldSkipQuery,
    params: {
      pPageId: computedPageName,
    },
  });

  useBasicQuery<RecordType>({
    apiId: "QUERY_EXSYS_PAGE_LABELS",
    onResponse: handleLabelsResponse(setBasePageLabels),
    debounceRequestTimeOutMS: 25,
    ...queryOptions,
    skipQuery: shouldSkipQuery,
    params: {
      pPageId: "base",
    },
  });

  const labelsValues = useMemo(
    () => ({ ...state, ...basePageLabels }),
    [state, basePageLabels]
  );

  return <Store.Provider value={labelsValues}>{children}</Store.Provider>;
};

export default LabelsProvider;
export { default as usePageLabelsContext } from "./usePageLabelsContext";
export { default as useTranslateIdFactory } from "./useTranslateIdFactory";
