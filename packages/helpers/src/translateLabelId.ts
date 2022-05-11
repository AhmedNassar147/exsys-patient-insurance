/*
 *
 * `translateLabelId`: `@exsys-clinio/helpers`.
 *
 */
import { T_TRANSLATE_REGEXP } from "@exsys-clinio/global-app-constants";
import isObjectHasKey from "./isObjectHasKey";
import { RecordType } from "@exsys-clinio/types";

type LabelIdType = string | React.ReactNode;

const checkIfLabelHasRegexAndTranslate = (
  labels: RecordType<string>,
  labelId: LabelIdType
) => {
  if (typeof labelId !== "string") {
    return labelId as string;
  }

  const hasTranslationId = T_TRANSLATE_REGEXP.test(labelId as string);

  if (hasTranslationId) {
    return (labelId as string).replace(
      T_TRANSLATE_REGEXP,
      (replaceValue: string) => {
        const actualLabelId = replaceValue.replace(/__t__/, "");
        return labels[actualLabelId] || actualLabelId;
      }
    );
  }

  return labelId as string;
};

/**
 * @examples
 *  labelId = "name" => my name .
 *  labelId = "__t__name is ahmed" => my name is ahmed .
 */
const translateLabelId = (labels: RecordType<string>, labelId: LabelIdType) => {
  if (!labelId) {
    return "";
  }

  const isLabelString = typeof labelId === "string";

  if (labelId && isLabelString && isObjectHasKey(labels, labelId as string)) {
    return labels[labelId as string];
  }

  // handles if array of different types.
  if (!isLabelString && Array.isArray(labelId)) {
    return labelId.map((maybeLabelId: LabelIdType) =>
      checkIfLabelHasRegexAndTranslate(labels, maybeLabelId)
    );
  }

  return checkIfLabelHasRegexAndTranslate(labels, labelId);
};

export default translateLabelId;
