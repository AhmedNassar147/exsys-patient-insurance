/*
 *
 * `isTruthyBooleanString`: `@exsys-patient-insurance/helpers`.
 *
 */
const isTruthyBooleanString = (booleanStringValue: string) => {
  if (typeof booleanStringValue === "string") {
    return ["yes", "y", "Y", "true"].includes(
      booleanStringValue.replace(/\s/g, "").toLowerCase()
    );
  }

  return false;
};

export default isTruthyBooleanString;
