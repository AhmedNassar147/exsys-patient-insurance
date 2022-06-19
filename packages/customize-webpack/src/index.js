/*
 *
 * Package: `@exsys-patient-insurance/customize-webpack`.
 *
 */
const path = require("path");
const {
  override,
  babelInclude,
  addWebpackAlias,
  removeModuleScopePlugin,
  addWebpackResolve,
} = require("customize-cra");
const getAllPackagesForBabelTranspiler = require("./getAllPackagesForBabelTranspiler");

// @see {@link https://github.com/arackaf/customize-cra/blob/master/api.md}
module.exports = (appBaseDirName) => (config, env) => {
  return Object.assign(
    config,
    override(
      removeModuleScopePlugin(),
      /* Makes sure Babel compiles the stuff we only needed */
      babelInclude([
        path.resolve("src"),
        ...getAllPackagesForBabelTranspiler(),
      ]),
      addWebpackAlias({
        components: path.resolve(appBaseDirName, "src/components"),
        pages: path.resolve(appBaseDirName, "src/Pages"),
        infrastructure: path.resolve(appBaseDirName, "src/infrastructure"),
        hocs: path.resolve(appBaseDirName, "src/Hocs"),
      }),
      addWebpackResolve({
        fallback: {
          fs: false,
          crypto: false,
        },
      })
    )(config, env)
  );
};
