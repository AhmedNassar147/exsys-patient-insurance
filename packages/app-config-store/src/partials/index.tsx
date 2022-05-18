/*
 *
 * Component: `AppConfigProvider`.
 *
 */
import { useState, useLayoutEffect } from "react";
import {
  LANGUAGE_DIRS,
  LanguageValuesType,
} from "@exsys-clinio/global-app-constants";
import { getItemFromStorage } from "@exsys-clinio/helpers";
import { AppConfigStateType } from "@exsys-clinio/types";
import Store, { initialState } from "../context";

const AppConfigProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, setContext] = useState<AppConfigStateType>(initialState);

  useLayoutEffect(() => {
    const mainStoreData = getItemFromStorage<AppConfigStateType>("mainStore");

    if (mainStoreData) {
      setContext(() => mainStoreData);

      const { languageId } = mainStoreData;

      document.body.setAttribute(
        "dir",
        LANGUAGE_DIRS[languageId as LanguageValuesType]
      );
      return;
    }
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
