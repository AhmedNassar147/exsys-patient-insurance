/*
 *
 * prepareAndGetFinalVariablesToEnvFile
 *
 */
const { CRA_PREFIX } = require("../../environment/src/index.js");

const prepareAndGetFinalVariablesToEnvFile = (
  variablesWithValues,
  isProductionMode
) => {
  let finalVariables = {};

  for (const key in variablesWithValues) {
    const keyWithPrefix = CRA_PREFIX + key;
    finalVariables[keyWithPrefix] = variablesWithValues[key];
  }

  finalVariables = {
    NODE_ENV: isProductionMode ? "production" : "development",
    ...finalVariables
  };

  if (isProductionMode) {
    finalVariables = {
      GENERATE_SOURCEMAP: false,
      ...finalVariables
    };
  }

  return finalVariables;
};
module.exports = prepareAndGetFinalVariablesToEnvFile;
