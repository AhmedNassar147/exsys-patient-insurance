/*
 *
 * Hook: `useCurrentProviderCategory`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useCurrentProviderCategory = () => {
  const {
    state: { provider_category },
  } = useAppConfigStore();

  return provider_category;
};

export default useCurrentProviderCategory;
