/*
 *
 * `defineBuildModalInHomePageAction`
 *
 */
const definePlopActionAndExecuteScript = require("./definePlopActionAndExecuteScript");

const defineBuildModalInHomePageAction = plop => {
  definePlopActionAndExecuteScript(
    plop,
    "set-home-page-modals",
    ({ name, pagePath }) => {
      return `yarn configure-home-modals "--add=${name}" "--pathname=${pagePath}"`;
    }
  );
};

module.exports = defineBuildModalInHomePageAction;
