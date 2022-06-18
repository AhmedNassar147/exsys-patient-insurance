/*
 *
 * Types: `base`.
 *
 */
import { colors } from "@exsys-patient-insurance/theme-values";

export type CapitalBooleanStringType = "Y" | "N";
export type SmallBooleanStringType = "y" | "n";
export type StringNumber = string | number;
export type ArrowDirectionType = "right" | "left" | "up" | "down";

export type KeysOfRecord<T> = keyof T;

export type RecordType<T = string> = Record<string, T>;
export type RecordTypeWithAnyValue = Record<string, any>;

export type BooleanStringType =
  | SmallBooleanStringType
  | CapitalBooleanStringType;

export type ValuesOfRecordAsOptions<T> = T[KeysOfRecord<T>];

export type ColorNamesType = KeysOfRecord<typeof colors>;
