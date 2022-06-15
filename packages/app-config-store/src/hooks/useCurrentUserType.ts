/*
 *
 * Hook: `useCurrentUserType`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useCurrentUserType = () => {
  const {
    state: { user_type },
  } = useAppConfigStore();

  return user_type;
};

export default useCurrentUserType;
