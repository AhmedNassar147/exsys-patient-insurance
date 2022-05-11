/*
 *
 * shouldRunScriptsAfterPackageCreation
 *
 */
const { isReactComponentSelected } = require("./reactComponentUtils");

function shouldRunScriptsAfterPackageCreation(answers) {
  const { enableBabelTranspilation, usesTs } = answers || {};

  const isReactPackage = isReactComponentSelected(answers);

  return usesTs || enableBabelTranspilation || isReactPackage;
}

module.exports = shouldRunScriptsAfterPackageCreation;
