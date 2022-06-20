/*
 *
 * Component: `AppConfigProvider`.
 *
 */
import { useState, useLayoutEffect } from "react";
import {
  getItemFromStorage,
  normalizeAppStoreLanguageAndDir,
} from "@exsys-patient-insurance/helpers";
import { AppConfigStateType } from "@exsys-patient-insurance/types";
import Notification, {
  useNotification,
} from "@exsys-patient-insurance/notification";
import Store, { initialState } from "../context";

const AppConfigProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, setContext] = useState<AppConfigStateType>(initialState);
  const [notificationRef, addNotification] = useNotification();

  useLayoutEffect(() => {
    let mainStoreData = getItemFromStorage<AppConfigStateType>("userData");
    const { language_id } = mainStoreData || {};

    const { normalizedData, nextDir } =
      normalizeAppStoreLanguageAndDir(language_id);

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
    <>
      <Store.Provider
        value={{
          state,
          setAuthValues: setContext,
          addNotification,
        }}
      >
        {children}
      </Store.Provider>

      <Notification ref={notificationRef} />
    </>
  );
};

export default AppConfigProvider;
