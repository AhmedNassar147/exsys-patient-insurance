/*
 *
 * Hook: `useMakeSelectCurrentLanguageId`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useMakeSelectCurrentLanguageId = () => {
  const {
    state: { language_id },
  } = useAppConfigStore();

  return language_id;
};

export default useMakeSelectCurrentLanguageId;
