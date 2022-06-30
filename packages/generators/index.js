/*
 * Package : `@exsys-patient-insurance/generators`.
 * Exports the generators so that `plop` knows them.
 */
const reactPackageGenerator = require("./react-package");
const normalPackageGenerator = require("./normal-package");
const defineReactComponentPlopHelpers = require("./utils/defineReactComponentPlopHelpers");
const definePlopActionsAfterPackageCreation = require("./utils/definePlopActionsAfterPackageCreation");
const definePageRouteRouteData = require("./utils/definePageRouteRouteData");

module.exports = (plop) => {
  // generators
  plop.setGenerator("react package", reactPackageGenerator);
  plop.setGenerator("other package", normalPackageGenerator);

  // react plop helpers
  defineReactComponentPlopHelpers(plop);
  definePageRouteRouteData(plop);

  // plop actions
  definePlopActionsAfterPackageCreation(plop);
};
