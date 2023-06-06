/*
 *
 * Constants: `@exsys-patient-insurance/upgrade-version-modal`.
 *
 */
import transformAppVersionToNumber from "./transformAppVersionToNumber";

export const API_PARAMS = {
  application: "T",
};

export const TIMER_MS = 4 * 60000;
export const TIMER_OF_15_MINS_MS = 15 * 60000;

const latestProductionVersion = process.env.REACT_APP_LATEST_PRODUCTION_VERSION;

export const latestProductionVersionNumber = transformAppVersionToNumber(
  latestProductionVersion
);

export const initialValues = {
  web_version: latestProductionVersion,
  modalVisible: false,
  waiting15MinThenUpdateVersion: false,
};
