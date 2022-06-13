/*
 *
 * Hook: `useGetPageNameFromRouter`.
 *
 */
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getPageNameFromPathName } from "@exsys-patient-insurance/helpers";

const useGetPageNameFromRouter = (useActualPageName?: boolean) => {
  const { pathname } = useLocation();

  return useMemo(() => {
    let pageName = getPageNameFromPathName(pathname);

    if (!useActualPageName) {
      pageName = pageName.replace(/login/, "base");
    }

    return pageName;
  }, [pathname, useActualPageName]);
};

export default useGetPageNameFromRouter;
