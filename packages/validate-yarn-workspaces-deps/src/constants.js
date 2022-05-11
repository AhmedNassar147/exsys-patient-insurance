/*
 *
 * Constants: `@exsys-clinio/validate-yarn-workspaces-deps`.
 *
 */
const { sharedHelperKey } = require("@exsys-clinio/command-line-utils");

const exsysPackagesPathRegex = /@exsys-clinio[a-z|/|-]*/gm;
const deepExsysPackagesPathRegex =
  /@exsys-clinio[a-z|/|-]*\/src[/|a-z|A-Z|-]*/gm;
const deepAntdLibsPathRegex = /antd[a-z|A-Z|/|-]*/gm;
const removeSrcAndStringAfterRegex = /\/src[/|a-z|A-Z|-|\s]*/gm;

const staticImportsRegex = /from(\s*["|']@?[a-z|A-Z|/|-]*["|'])/g;
const lazyLoadedComponentsRegex =
  /import\([\n|\s|\r|"|']*@?[a-z|-]*\/[a-z|A-Z]*([/|*|\s]*[a-z|A-Z|:|\s|'|""|-|.|a-]*)?['|"]*/g;

const breaksRegex = /(\r\n|\n|\r|\n|\r\s)/gm;
const removeWebpackCommentsRegex =
  /\/\*\s*\webpackChunkName:[\s|'|"|a-z|A-Z|-]*[.|a-z|A-Z|-]*['|"|\s]*\*\//gm;
const removeFromAndNextSpaceAndQuotesRegex = /(from?\s*)?["|']/g;
const removeImportQuoteAndSpacesRegex = /import\(|"|'|\s|\r|\n|\n|\r/g;

const ignoredPathsRegex =
  /(\.jpg)|(\.png)|(\.jpeg)|(\.svg)|(\.css)|(\.d.ts)|(\.json)/gm;

const scriptName = "validate-exsys-deps";

const cliOptions = {
  scriptName,
  description: `validates only transpiled Packages dependencies and peerDependencies
      with used libraries and internal packages.
    `,
  helpersKeys: [
    sharedHelperKey,
    {
      keyOrKeys: "filter",
      description: "only validate given package name. (--filter=app-footer)",
    },
    {
      keyOrKeys: "process-pkg-per-ms",
      description:
        "processing a package validation after milliseconds. (--process-pkg-per-ms=250)",
    },
  ],
};

module.exports = {
  exsysPackagesPathRegex,
  deepExsysPackagesPathRegex,
  deepAntdLibsPathRegex,
  removeSrcAndStringAfterRegex,

  staticImportsRegex,
  lazyLoadedComponentsRegex,
  breaksRegex,
  removeWebpackCommentsRegex,
  removeFromAndNextSpaceAndQuotesRegex,
  removeImportQuoteAndSpacesRegex,
  ignoredPathsRegex,

  scriptName,
  cliOptions,
};
