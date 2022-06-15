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

const normalizeAppStoreLanguageAndDir = (nextLanguageId: number) => {
  const nextDir = LANGUAGE_DIRS[nextLanguageId as LanguageValuesType];
  const normalizedData = {
    language_id: nextLanguageId,
    isRightToLeft:
      LANGUAGE_DIRS[nextLanguageId as LanguageValuesType] !==
      LANGUAGE_DIRS[LANGUAGE_IDS.PRIMARY],
  };

  return {
    nextDir,
    normalizedData,
  };
};

export default normalizeAppStoreLanguageAndDir;
