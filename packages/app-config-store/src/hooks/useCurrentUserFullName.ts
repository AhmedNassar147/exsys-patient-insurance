/*
 *
 * Hook: `useCurrentUserFullName`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useCurrentUserFullName = () => {
  const {
    state: { user_full_name },
  } = useAppConfigStore();

  return user_full_name;
};

export default useCurrentUserFullName;
