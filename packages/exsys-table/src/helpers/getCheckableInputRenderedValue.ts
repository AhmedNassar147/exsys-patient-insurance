/*
 *
 * Helper: `getCheckableInputRenderedValue`.
 *
 */
import networkCacheLayer from "@exsys-patient-insurance/network-cache-layer";
import { isTruthyBooleanString } from "@exsys-patient-insurance/helpers";

const getCheckableInputRenderedValue = (valueOfDataIndex: string) => {
  if (typeof valueOfDataIndex === "string" && valueOfDataIndex) {
    const cachedLabels =
      networkCacheLayer.extractLabelsFromCachedResponses(true);
    const isTruthyValue = isTruthyBooleanString(valueOfDataIndex);
    const labelKey = isTruthyValue ? "yes" : "no";

    return cachedLabels[labelKey] || labelKey;
  }

  return (valueOfDataIndex || "").toString().toLowerCase();
};

export default getCheckableInputRenderedValue;
