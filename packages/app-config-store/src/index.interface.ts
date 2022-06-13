/*
 *
 * Types: `@exsys-patient-insurance/app-config-store`.
 *
 */
import { AppConfigStateType } from "@exsys-patient-insurance/types";

export type SetAppConfigValues = React.Dispatch<
  React.SetStateAction<AppConfigStateType>
>;

export type AppConfigStoreApi = {
  state: AppConfigStateType;
  setAuthValues: SetAppConfigValues;
};
