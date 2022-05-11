/*
 *
 * `readRootPackageJson`: `@exsys-clinio/workspaces-helpers`.
 *
 */
const path = require("path");
const readJsonFile = require("./readJsonFile");

const readRootPackageJson = (selectorsArray) => {
  const allJsonFile = readJsonFile(
    path.join(process.cwd(), "package.json"),
    !!selectorsArray
  );

  if (selectorsArray) {
    return selectorsArray.map((selector) => allJsonFile[selector]);
  }

  return allJsonFile;
};

module.exports = readRootPackageJson;
