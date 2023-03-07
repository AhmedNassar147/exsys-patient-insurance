/*
 *
 * Hook: `useCurrentAccountNo`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useCurrentAccountNo = () => {
  const {
    state: { account_no },
  } = useAppConfigStore();

  return account_no;
};

export default useCurrentAccountNo;
