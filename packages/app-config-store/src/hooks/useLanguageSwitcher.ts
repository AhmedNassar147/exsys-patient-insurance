/*
 *
 * Hook: `useLanguageSwitcher`.
 *
 */
import { useCallback } from "react";
import {
  LANGUAGE_DIRS,
  LANGUAGE_IDS,
} from "@exsys-clinio/global-app-constants";
import useAppConfigStore from "./useAppConfigStore";
import useSetAuthConfigData from "./useSetAuthConfigData";

const useLanguageSwitcher = () => {
  const { state } = useAppConfigStore();
  const setAuthConfigData = useSetAuthConfigData();

  const handleSwitchLanguage = useCallback(
    (nextLanguageId: number) => {
      const nextDir = LANGUAGE_DIRS[nextLanguageId];

      const newUserData = {
        ...state,
        languageId: nextLanguageId,
        isRightToLeft:
          LANGUAGE_DIRS[nextLanguageId] !== LANGUAGE_DIRS[LANGUAGE_IDS.PRIMARY],
      };

      setAuthConfigData(newUserData);

      document.body.setAttribute("dir", nextDir);
    },
    [state, setAuthConfigData]
  );

  return handleSwitchLanguage;
};

export default useLanguageSwitcher;
