/*
 *
 * `getAllPackagesForBabelTranspiler`: `@exsys-clinio/customize-webpack`.
 *
 */
const fs = require("fs");
const {
  CONSTANTS,
  selectTranspiledWorkSpaces,
} = require("@exsys-clinio/workspaces-helpers");

const { PROJECT_NAME_SPACE } = CONSTANTS;

const getAllPackagesForBabelTranspiler = () => {
  return selectTranspiledWorkSpaces((pkgJsonFile) => {
    return fs.realpathSync(
      `../packages${pkgJsonFile.name.replace(PROJECT_NAME_SPACE, "")}/src`
    );
  });
};

module.exports = getAllPackagesForBabelTranspiler;
