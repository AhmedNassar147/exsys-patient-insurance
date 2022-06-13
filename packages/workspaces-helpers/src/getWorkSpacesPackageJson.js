/*
 *
 * `getWorkSpacesPackageJson`: `@exsys-patient-insurance/workspaces-helpers`.
 *
 */
const fs = require("fs");
const getProperPackagesPath = require("./getProperPackagesPath");
const readJsonFile = require("./readJsonFile");

const getWorkSpacesPackageJson = () => {
  const results = [];

  const packagesPath = getProperPackagesPath();

  fs.readdirSync(packagesPath).forEach((file) => {
    file = packagesPath + "/" + file;
    const stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      const pkgJsonFile = readJsonFile(`${file}/package.json`);
      results.push(pkgJsonFile);
    }
  });

  return results;
};

module.exports = getWorkSpacesPackageJson;
