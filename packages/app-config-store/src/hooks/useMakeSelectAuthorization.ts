/*
 *
 * Hook: `useMakeSelectAuthorization`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useMakeSelectAuthorization = () => {
  const {
    state: { authorization }
  } = useAppConfigStore();

  return authorization;
};

export default useMakeSelectAuthorization;
