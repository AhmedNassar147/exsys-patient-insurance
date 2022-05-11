/*
 *
 * Hook: `useHasLanguageChanged`.
 *
 */
import { usePrevious } from "@exsys-clinio/hooks";
import useMakeSelectCurrentLanguageId from "./useMakeSelectCurrentLanguageId";

const useHasLanguageChanged = () => {
  const languageId = useMakeSelectCurrentLanguageId();
  const previousLang = usePrevious(languageId);

  return !!previousLang && previousLang !== languageId;
};

export default useHasLanguageChanged;
