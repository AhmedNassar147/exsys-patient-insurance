/*
 *
 * Package: `@exsys-patient-insurance/global-app-constants`.
 *
 */
import { spacings } from "@exsys-patient-insurance/theme-values";

export const MIN_PATIENT_FILE_NO_LENGTH = 5;

export const T_TRANSLATE_REGEXP = /__t__\w+/gim;

export const APP_HEADER_HEIGHT = `calc(${spacings.sp6} + ${spacings.sp8})`;
export const APP_HEADER_MARGIN = spacings.sp4;
export const APP_HEADER_HORIZONTAL_PADDING = spacings.sp6;
export const APP_FOOTER_HEIGHT = `calc(${spacings.sp9} - ${spacings.sp1})`;

const acceptableImageTypes = ".png, .jpg, .jpeg";

export const UPLOAD_ACCEPTED_EXTENSIONS = {
  IMAGES: acceptableImageTypes,
  IMAGES_AND_FILES: `${acceptableImageTypes} , application/pdf, pdf`,
  EXCEL_FILES: `application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsx, .xls`,
};

export const LANGUAGE_IDS = Object.freeze({
  PRIMARY: 1,
  SECONDARY: 2,
} as const);

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
