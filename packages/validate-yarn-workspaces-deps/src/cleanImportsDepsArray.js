/*
 *
 * `cleanImportsDepsArray`: `@exsys-patient-insurance/validate-yarn-workspaces-deps`
 *
 */
const cleanImportsDepsArray = (matchedImportsArray, cleanUpRegex) => {
  if (!Boolean(matchedImportsArray)) {
    return [];
  }

  return matchedImportsArray.toString().replace(cleanUpRegex, "").split(",");
};

module.exports = cleanImportsDepsArray;
