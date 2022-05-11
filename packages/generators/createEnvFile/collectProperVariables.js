/*
 * collectProperVariables
 *
 */
const parseEnvVariables = require("./parseEnvVariables");
const prepareAndGetFinalVariablesToEnvFile = require("./prepareAndGetFinalVariablesToEnvFile");

function collectProperVariables(variablesFromGenerator, isProductionMode) {
  // ensure all variables were set correctly and merge final results from terminal if any.
  const parsedEnvVariablesValues = parseEnvVariables(variablesFromGenerator);

  // add `REACT_APP_`to variables and transform them properly to match with `.env  file rules.
  const computedEnvVariables = prepareAndGetFinalVariablesToEnvFile(
    parsedEnvVariablesValues,
    isProductionMode
  );

  return computedEnvVariables;
}

module.exports = collectProperVariables;
