/*
 *
 * Helper: `normalizeAppStoreLanguageAndDir`.
 *
 */
import {
  LANGUAGE_DIRS,
  LANGUAGE_IDS,
  LanguageValuesType,
} from "@exsys-patient-insurance/global-app-constants";

const primaryLanguageId = LANGUAGE_IDS.PRIMARY;

const normalizeAppStoreLanguageAndDir = (languageId?: number) => {
  const nextLanguageId = languageId || primaryLanguageId;

  const nextDir = LANGUAGE_DIRS[nextLanguageId as LanguageValuesType];
  const normalizedData = {
    language_id: nextLanguageId,
    isRightToLeft:
      LANGUAGE_DIRS[nextLanguageId as LanguageValuesType] !==
      LANGUAGE_DIRS[primaryLanguageId],
  };

  return {
    nextDir,
    normalizedData,
  };
};

export default normalizeAppStoreLanguageAndDir;
