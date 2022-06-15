/*
 *
 * Hook: `useLanguageSwitcher`.
 *
 */
import { useCallback } from "react";
import { LANGUAGE_IDS } from "@exsys-patient-insurance/global-app-constants";
import { normalizeAppStoreLanguageAndDir } from "@exsys-patient-insurance/helpers";
import useAppConfigStore from "./useAppConfigStore";
import useSetAuthConfigData from "./useSetAuthConfigData";

const { PRIMARY, SECONDARY } = LANGUAGE_IDS;

const useLanguageSwitcher = () => {
  const { state } = useAppConfigStore();
  const setAuthConfigData = useSetAuthConfigData();

  const handleSwitchLanguage = useCallback(() => {
    const { language_id } = state;
    const nextLanguageId = language_id === PRIMARY ? SECONDARY : PRIMARY;

    const { normalizedData, nextDir } =
      normalizeAppStoreLanguageAndDir(nextLanguageId);

    const newUserData = {
      ...state,
      ...normalizedData,
    };

    setAuthConfigData(newUserData);
    document.body.setAttribute("dir", nextDir);
  }, [state, setAuthConfigData]);

  return handleSwitchLanguage;
};

export default useLanguageSwitcher;
