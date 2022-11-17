/*
 *
 * `isTruthyBooleanString`: `@exsys-patient-insurance/helpers`.
 *
 */
const isTruthyBooleanString = (booleanStringValue: string) => {
  if (typeof booleanStringValue === "string") {
    return ["yes", "y", "true", "a"].includes(
      booleanStringValue.replace(/\s/g, "").toLowerCase()
    );
  }

  return false;
};

export default isTruthyBooleanString;
