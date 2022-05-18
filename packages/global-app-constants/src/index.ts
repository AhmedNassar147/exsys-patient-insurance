/*
 *
 * Package: `@exsys-clinio/global-app-constants`.
 *
 */
import { spacings } from "@exsys-clinio/theme-values";

export const T_TRANSLATE_REGEXP = /__t__\w+/gim;

export const APP_HEADER_HEIGHT = `calc(${spacings.sp6} + ${spacings.sp9})`;
export const APP_HEADER_MARGIN = spacings.sp4;
export const APP_HEADER_HORIZONTAL_PADDING = spacings.sp6;

export const LANGUAGE_IDS = Object.freeze({
  PRIMARY: 1,
  SECONDARY: 2,
} as const);

export const LANGUAGE_IDS_VALUES = Object.values(LANGUAGE_IDS);

export type LanguageValuesType = 1 | 2;

export const LANGUAGE_DIRS = Object.freeze({
  [LANGUAGE_IDS.PRIMARY]: "ltr",
  [LANGUAGE_IDS.SECONDARY]: "rtl",
});

export const QUERY_TYPES = Object.freeze({
  QUERY: "query",
  U_CODES: "u_code",
  CODES: "code",
} as const);
