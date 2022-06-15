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
import { AppConfigStateType } from "@exsys-patient-insurance/types";
import { AppConfigStoreApi } from "./index.interface";

const activeLanguage = LANGUAGE_IDS.PRIMARY as LanguageValuesType;

export const initialState: AppConfigStateType = {
  authorization: "",
  language_id: activeLanguage,
  isRightToLeft:
    LANGUAGE_DIRS[activeLanguage] !== LANGUAGE_DIRS[LANGUAGE_IDS.PRIMARY],
  user_full_name: "",
  login_staff_id: "",
  user_type: "",
  job_id: 0,
  provider_category: "",
};

export default createContext<AppConfigStoreApi>({
  state: initialState,
  // @ts-ignore
  setAuthValues: (state: AppConfigStateType) => state,
});
