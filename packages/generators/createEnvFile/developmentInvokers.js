/*
 *
 * developmentInvokers: `@exsys-patient-insurance/generators`.
 *
 */
const { DEFAULT_VARS_WITH_VALUES } = require("../../environment/src/index.js");
const collectProperVariables = require("./collectProperVariables");
const getAppEnvPath = require("./getAppEnvPath");

module.exports = {
  description: "build development only env variables file.",
  prompts: [],
  actions: [
    {
      type: "add",
      templateFile: "./env.hbs",
      path: getAppEnvPath(),
      abortOnFail: true,
      force: true,
      data: {
        envValues: collectProperVariables(DEFAULT_VARS_WITH_VALUES),
      },
    },
  ],
};
