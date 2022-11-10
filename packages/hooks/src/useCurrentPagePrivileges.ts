/*
 *
 * Hook: `useCurrentPagePrivileges`.
 *
 */
import { usePagePrivilege } from "@exsys-patient-insurance/app-config-store";
import useGetPageNameFromRouter, {
  UseGetPageNameFromRouterOptions,
} from "./useGetPageNameFromRouter";

const useCurrentPagePrivileges = (
  options?: UseGetPageNameFromRouterOptions
) => {
  const pageName = useGetPageNameFromRouter(options);

  const { [pageName]: privileges } = usePagePrivilege();

  return privileges || {};
};

export default useCurrentPagePrivileges;
