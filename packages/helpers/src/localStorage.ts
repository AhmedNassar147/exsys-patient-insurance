/*
 *
 * helpers: `localStorage`.
 *
 */
import { KeysOfRecord } from "@exsys-clinio/types";

const isTypeOfObject = (value: any) => !!value && typeof value === "object";

const isJsonType = (value: any) => {
  value = typeof value !== "string" ? JSON.stringify(value) : value;
  try {
    value = JSON.parse(value);
  } catch (e) {
    return false;
  }

  return typeof value === "object" && value !== null;
};

const baseAppKeyName = "@exsys-clinio";

const localStorageKeys = {
  patientData: `${baseAppKeyName}_patientData`,
  mainStore: `${baseAppKeyName}_mainStore`,
} as const;

type LocalStorageKeysType = KeysOfRecord<typeof localStorageKeys>;

export const setItemToStorage = (
  localStorageKeyName: LocalStorageKeysType,
  value: any
) => {
  window.localStorage.setItem(
    localStorageKeys[localStorageKeyName],
    isTypeOfObject(value) ? JSON.stringify(value) : value
  );
};

export const getItemFromStorage = <T = any>(
  localStorageKeyName: LocalStorageKeysType
): T => {
  const valueFromStorage = window.localStorage.getItem(
    localStorageKeys[localStorageKeyName]
  );
  const isJasonValue = isJsonType(valueFromStorage);

  return (
    isJasonValue
      ? JSON.parse(valueFromStorage as unknown as string)
      : valueFromStorage
  ) as T;
};

export type { LocalStorageKeysType };
