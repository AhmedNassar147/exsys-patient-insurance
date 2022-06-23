/*
 *
 * Hook: `useCurrentPagePrivileges`.
 *
 */
import { usePagePrivilege } from "@exsys-patient-insurance/app-config-store";
import useGetPageNameFromRouter from "./useGetPageNameFromRouter";

const useCurrentPagePrivileges = () => {
  const pageName = useGetPageNameFromRouter();
  const { [pageName]: privileges } = usePagePrivilege();

  return privileges || {};
};

export default useCurrentPagePrivileges;
