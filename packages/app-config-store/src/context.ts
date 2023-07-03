/*
 *
 * Context: `@exsys-patient-insurance/app-config-store`.
 *
 */
import { createContext } from "react";
import {
  LANGUAGE_DIRS,
  LANGUAGE_IDS,
  LanguageValuesType,
} from "@exsys-patient-insurance/global-app-constants";
import {
  getItemFromStorage,
  // normalizeAppStoreLanguageAndDir,
} from "@exsys-patient-insurance/helpers";
import { AppConfigStateType } from "@exsys-patient-insurance/types";
import { AppConfigStoreApi } from "./index.interface";

const mainStoreData = getItemFromStorage<AppConfigStateType>("userData");
const activeLanguage = (mainStoreData?.language_id ||
  LANGUAGE_IDS.PRIMARY) as LanguageValuesType;

export const initialState: AppConfigStateType = {
  authorization: "",
  language_id: activeLanguage,
  isRightToLeft:
    LANGUAGE_DIRS[activeLanguage] !== LANGUAGE_DIRS[LANGUAGE_IDS.PRIMARY],
  user_full_name: [] as string[],
  login_staff_id: "",
  user_type: "",
  job_id: 0,
  provider_category: "",
  privileges: {},
  homePageUrl: "/",
  loggedInUserName: "",
  client_id: 0,
  report_server_url: "",
  report_server_userid: "",
};

export default createContext<AppConfigStoreApi>({
  state: initialState,
  // @ts-ignore
  setAuthValues: (state: AppConfigStateType) => state,
  addNotification: () => null,
});
