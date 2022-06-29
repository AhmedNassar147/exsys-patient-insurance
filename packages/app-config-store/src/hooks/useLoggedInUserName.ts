/*
 *
 * Hook: `useLoggedInUserName`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useLoggedInUserName = () => {
  const {
    state: { loggedInUserName },
  } = useAppConfigStore();

  return loggedInUserName;
};

export default useLoggedInUserName;
