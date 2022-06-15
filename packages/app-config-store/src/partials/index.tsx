/*
 *
 * Component: `AppConfigProvider`.
 *
 */
import { useState, useLayoutEffect } from "react";
import { LANGUAGE_IDS } from "@exsys-patient-insurance/global-app-constants";
import {
  getItemFromStorage,
  normalizeAppStoreLanguageAndDir,
} from "@exsys-patient-insurance/helpers";
import { AppConfigStateType } from "@exsys-patient-insurance/types";
import Store, { initialState } from "../context";

const AppConfigProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, setContext] = useState<AppConfigStateType>(initialState);

  useLayoutEffect(() => {
    let mainStoreData = getItemFromStorage<AppConfigStateType>("userData");
    const { language_id } = mainStoreData || {};

    const curredLanguageId = language_id || LANGUAGE_IDS.PRIMARY;

    const { normalizedData, nextDir } =
      normalizeAppStoreLanguageAndDir(curredLanguageId);

    if (mainStoreData) {
      mainStoreData = language_id
        ? mainStoreData
        : {
            ...mainStoreData,
            ...normalizedData,
          };

      setContext(() => mainStoreData);
    }

    document.body.setAttribute("dir", nextDir);
  }, []);

  return (
    <Store.Provider
      value={{
        state,
        setAuthValues: setContext,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default AppConfigProvider;
