/*
 *
 * `getAllTranspiledPackagesDataPromises`: `@exsys-patient-insurance/validate-yarn-workspaces-deps`.
 *
 */
const path = require("path");
const {
  selectTranspiledWorkSpaces,
  CONSTANTS,
} = require("@exsys-patient-insurance/workspaces-helpers");
const diveIntoFolderAndGetFiles = require("./diveIntoFolderAndGetFiles");
const { scriptName } = require("./constants");

const getAllTranspiledPackagesDataPromises = (filter) => {
  const allTranspiledPackagesPromises = selectTranspiledWorkSpaces(
    async (pkgJsonFile) => {
      const { name: packageName, dependencies, peerDependencies } = pkgJsonFile;

      const packageFolderName = packageName.replace(
        `${CONSTANTS.PROJECT_NAME_SPACE}/`,
        ""
      );

      if (
        (filter && (packageName === filter || packageFolderName === filter)) ||
        !filter
      ) {
        const packageBaseDirPath = path.join(
          process.cwd(),
          "packages",
          packageFolderName
        );

        const packageSrcDir = `${packageBaseDirPath}/src`;

        let filesInSrcDir = await diveIntoFolderAndGetFiles(packageSrcDir);
        filesInSrcDir =
          filesInSrcDir && !!filesInSrcDir.length ? filesInSrcDir : false;

        return new Promise((resolve) => {
          resolve({
            packageName,
            packageBaseDirPath,
            filesInSrcDir,
            dependencies,
            peerDependencies,
            scriptName,
          });
        });
      }

      return false;
    }
  );

  return allTranspiledPackagesPromises;
};

module.exports = getAllTranspiledPackagesDataPromises;
