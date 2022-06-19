/*
 *
 * Hook: `useCurrentUserFullName`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useCurrentUserFullName = () => {
  const {
    state: { user_full_name, language_id },
  } = useAppConfigStore();

  return user_full_name[language_id - 1] || "";
};

export default useCurrentUserFullName;
