/*
 *
 * `collectProcessOptions`: `@exsys-patient-insurance/command-line-utils`.
 *
 */
const collectProcessOptionsSync = require("./collectProcessOptionsSync");

const collectProcessOptions = async () => {
  return new Promise((resolve) => resolve(collectProcessOptionsSync()));
};

module.exports = collectProcessOptions;
