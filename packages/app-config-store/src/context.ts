/*
 *
 * Context: `@exsys-clinio/app-config-store`.
 *
 */
import { createContext } from "react";
import {
  LANGUAGE_DIRS,
  LANGUAGE_IDS,
} from "@exsys-clinio/global-app-constants";
import { AppConfigStateType } from "@exsys-clinio/types";
import { AppConfigStoreApi } from "./index.interface";

const activeLanguage = LANGUAGE_IDS.PRIMARY;

export const initialState: AppConfigStateType = {
  authorization: 3524880,
  languageId: activeLanguage,
  isRightToLeft:
    LANGUAGE_DIRS[activeLanguage] !== LANGUAGE_DIRS[LANGUAGE_IDS.PRIMARY],
};

export default createContext<AppConfigStoreApi>({
  state: initialState,
  // @ts-ignore
  setAuthValues: (state: AppConfigStateType) => state,
});
