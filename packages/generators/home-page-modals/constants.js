/*
 *
 * Constants: `home-page-modals`.
 *
 */

const homePagePackagePath = `${process.cwd()}/packages/home-page`;
const modalsConfigFilePathInHomePage = `${homePagePackagePath}/src/modalsConfig.ts`;
const generatedModalConfigJsonPath = `${__dirname}/modals.config.json`;

module.exports = {
  modalsConfigFilePathInHomePage,
  generatedModalConfigJsonPath
};
