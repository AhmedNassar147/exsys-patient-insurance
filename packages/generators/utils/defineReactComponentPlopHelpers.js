/*
 *
 * defineReactComponentPlopHelpers
 *
 */
const { REACT_PACKAGE_TYPES_KEYS } = require("../constants");
const { isReactComponentSelected } = require("./reactComponentUtils");

function defineReactComponentPlopHelpers(plop) {
  plop.setHelper("isReactPackage", function(type) {
    return isReactComponentSelected({ type });
  });

  plop.setHelper("isPage", function(type) {
    return type === REACT_PACKAGE_TYPES_KEYS.page;
  });

  plop.setHelper("isLazy", function(type) {
    return type === REACT_PACKAGE_TYPES_KEYS.lazy;
  });

  plop.setHelper("isNormal", function(type) {
    return type === REACT_PACKAGE_TYPES_KEYS.normal;
  });
}

module.exports = defineReactComponentPlopHelpers;
