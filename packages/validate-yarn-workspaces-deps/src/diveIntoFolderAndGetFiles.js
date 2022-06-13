/*
 *
 * `diveIntoFolderAndGetFiles`: `@exsys-patient-insurance/validate-yarn-workspaces-deps`.
 *
 */
const fs = require("fs").promises;
const path = require("path");
const { ignoredPathsRegex } = require("./constants");

const diveIntoFolderAndGetFiles = async (folderPath) => {
  let files = await fs.readdir(folderPath);

  files = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(folderPath, file);
      const stats = await fs.stat(filePath);

      return stats.isDirectory()
        ? diveIntoFolderAndGetFiles(filePath)
        : filePath;
    })
  );

  return new Promise((resolve) => {
    resolve(
      files.reduce(
        (all, folderContents) =>
          all
            .concat(folderContents)
            .filter((filePath) => !ignoredPathsRegex.test(filePath))
            .filter(Boolean),
        []
      )
    );
  });
};

module.exports = diveIntoFolderAndGetFiles;
