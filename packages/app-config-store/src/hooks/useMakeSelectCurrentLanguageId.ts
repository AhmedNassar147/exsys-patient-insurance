/*
 *
 * Hook: `useMakeSelectCurrentLanguageId`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useMakeSelectCurrentLanguageId = () => {
  const {
    state: { languageId },
  } = useAppConfigStore();

  return languageId;
};

export default useMakeSelectCurrentLanguageId;
