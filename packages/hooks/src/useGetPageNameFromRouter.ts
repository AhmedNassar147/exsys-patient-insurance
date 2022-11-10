/*
 *
 * Hook: `useGetPageNameFromRouter`.
 *
 */
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getPageNameFromPathName } from "@exsys-patient-insurance/helpers";

export type UseGetPageNameFromRouterOptions = {
  useActualPageName?: boolean;
  useFullPathName?: boolean;
};

const useGetPageNameFromRouter = (
  options?: UseGetPageNameFromRouterOptions
) => {
  const { useFullPathName, useActualPageName } = options || {};
  const { pathname } = useLocation() || {};

  return useMemo(() => {
    let pageName = useFullPathName
      ? pathname.substring(1)
      : getPageNameFromPathName(pathname);

    if (!useActualPageName) {
      pageName = pageName.replace(/login/, "base");
    }

    return pageName;
  }, [pathname, useActualPageName, useFullPathName]);
};

export default useGetPageNameFromRouter;
