/*
 *
 * helpers: `localStorage`.
 *
 */
import { KeysOfRecord } from "@exsys-patient-insurance/types";

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

const baseAppKeyName = "@exsys-patient-insurance";

const localStorageKeys = {
  userData: `${baseAppKeyName}_userData`,
  password: `${baseAppKeyName}_password`,
} as const;

const KEYS_VALUES_IN_LOCAL_STORAGE = Object.values(localStorageKeys);

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

export const clearAllExsysStaffInStorage = (cb?: () => void) => {
  KEYS_VALUES_IN_LOCAL_STORAGE.forEach((keyValue, index) => {
    window.localStorage.removeItem(keyValue);

    if (KEYS_VALUES_IN_LOCAL_STORAGE.length - 1 === index && cb) {
      cb();
    }
  });
};

export type { LocalStorageKeysType };
