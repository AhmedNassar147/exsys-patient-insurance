/*
 *
 * Hook: `usePagePrivilege`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const usePagePrivilege = () => {
  const {
    state: { privileges },
  } = useAppConfigStore();

  return privileges;
};

export default usePagePrivilege;
