/*
 *
 * Hook: `useHomePageUrl`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useHomePageUrl = () => {
  const {
    state: { homePageUrl },
  } = useAppConfigStore();

  return homePageUrl;
};

export default useHomePageUrl;
