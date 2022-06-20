/*
 *
 * Types: `@exsys-patient-insurance/app-config-store`.
 *
 */
import { AppConfigStateType } from "@exsys-patient-insurance/types";
import { AddNotificationType } from "@exsys-patient-insurance/notification";

export type SetAppConfigValues = React.Dispatch<
  React.SetStateAction<AppConfigStateType>
>;

export type AppConfigStoreApi = {
  state: AppConfigStateType;
  setAuthValues: SetAppConfigValues;
  addNotification: AddNotificationType;
};
