/*
 *
 * Context: `@exsys-clinio/app-config-store`.
 *
 */
import { createContext } from "react";
import {
  LANGUAGE_DIRS,
  LANGUAGE_IDS,
  LANGUAGE_IDS_VALUES,
  LanguageValuesType,
} from "@exsys-clinio/global-app-constants";
import { setItemToStorage, getItemFromStorage } from "@exsys-clinio/helpers";
import { AppConfigStateType } from "@exsys-clinio/types";
import { AppConfigStoreApi } from "./index.interface";

const NOT_FOUND_LANG_CODE = 999999999;

const {
  location: { pathname: appPathName },
} = window;
const [preferredUserLanguageFromAppUrl] = appPathName
  .split("/")
  .filter(Boolean);

const preferredUserLanguageFromAppUrlNumber =
  !preferredUserLanguageFromAppUrl || isNaN(+preferredUserLanguageFromAppUrl)
    ? NOT_FOUND_LANG_CODE
    : +preferredUserLanguageFromAppUrl;

const isFakeLanguageId =
  preferredUserLanguageFromAppUrlNumber === NOT_FOUND_LANG_CODE ||
  !LANGUAGE_IDS_VALUES.includes(
    preferredUserLanguageFromAppUrlNumber as LanguageValuesType
  );

const mainStoreData = getItemFromStorage<AppConfigStateType>("mainStore");

const activeLanguage = (
  isFakeLanguageId
    ? mainStoreData?.languageId ?? LANGUAGE_IDS.PRIMARY
    : preferredUserLanguageFromAppUrlNumber
) as LanguageValuesType;

export const initialState: AppConfigStateType = {
  authorization: 3524880,
  languageId: activeLanguage,
  isRightToLeft:
    LANGUAGE_DIRS[activeLanguage] !== LANGUAGE_DIRS[LANGUAGE_IDS.PRIMARY],
};

setItemToStorage("mainStore", initialState);

export default createContext<AppConfigStoreApi>({
  state: initialState,
  // @ts-ignore
  setAuthValues: (state: AppConfigStateType) => state,
});
