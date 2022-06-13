/*
 *
 * `selectTranspiledWorkSpaces`: `@exsys-patient-insurance/workspaces-helpers`.
 *
 */
const getWorkSpacesPackageJson = require("./getWorkSpacesPackageJson");

const selectTranspiledWorkSpaces = (transformer) => {
  const worksSpacesPackageJson = getWorkSpacesPackageJson();

  return worksSpacesPackageJson
    .map((pkgJson) => {
      const parsedFile = JSON.parse(pkgJson);

      if (parsedFile.enableBabelTranspilation) {
        return transformer ? transformer(parsedFile) : parsedFile.name;
      }

      return undefined;
    })
    .filter(Boolean);
};

module.exports = selectTranspiledWorkSpaces;
