/*
 *
 * Types: `@exsys-clinio/app-config-store`.
 *
 */
import { AppConfigStateType } from "@exsys-clinio/types";

export type SetAppConfigValues = React.Dispatch<
  React.SetStateAction<AppConfigStateType>
>;

export type AppConfigStoreApi = {
  state: AppConfigStateType;
  setAuthValues: SetAppConfigValues;
};
