/*
 *
 * getProperPackagesPath: `@exsys-clinio/workspaces-helpers`.
 *
 */
const path = require("path");

const getProperPackagesPath = (altPath) => {
  const pathFromCurrentDireName = path.resolve(__dirname, "../..");

  return altPath || pathFromCurrentDireName;
};

module.exports = getProperPackagesPath;
