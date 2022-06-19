/*
 *
 * Hook: `useGlobalProviderNo`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useGlobalProviderNo = () => {
  const {
    state: { provider_no },
  } = useAppConfigStore();

  return provider_no;
};

export default useGlobalProviderNo;
