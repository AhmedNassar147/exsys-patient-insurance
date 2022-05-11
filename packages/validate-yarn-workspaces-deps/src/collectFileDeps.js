/*
 *
 * `collectFileDeps`: `@exsys-clinio/validate-yarn-workspaces-deps`
 *
 */
const { consoleColors } = require("@exsys-clinio/command-line-utils");
const { readFile } = require("fs/promises");
const cleanImportsDepsArray = require("./cleanImportsDepsArray");
const {
  staticImportsRegex,
  lazyLoadedComponentsRegex,
  breaksRegex,
  removeWebpackCommentsRegex,
  removeFromAndNextSpaceAndQuotesRegex,
  removeImportQuoteAndSpacesRegex,
} = require("./constants");

const collectFileDeps = async (filePath, scriptName) => {
  console.log(
    consoleColors.reset,
    consoleColors.fg.magenta,
    `[[[${scriptName}]]]:   processing ${filePath}`
  );

  let file = await readFile(filePath, "utf8");

  file = file.replace(removeWebpackCommentsRegex, "").replace(breaksRegex, "");

  const [matchedStaticImports, matchedLazyLoadedComponents] = [
    file.match(staticImportsRegex),
    file.match(lazyLoadedComponentsRegex),
  ];

  return new Promise((resolve) => {
    resolve([
      ...cleanImportsDepsArray(
        matchedStaticImports,
        removeFromAndNextSpaceAndQuotesRegex
      ),
      ...cleanImportsDepsArray(
        matchedLazyLoadedComponents,
        removeImportQuoteAndSpacesRegex
      ),
    ]);
  });
};

module.exports = collectFileDeps;
