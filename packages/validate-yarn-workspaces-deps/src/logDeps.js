/*
 *
 * logDeps: `@exsys-patient-insurance/validate-yarn-workspaces-deps`.
 *
 */
const {
  consoleColors,
} = require("@exsys-patient-insurance/command-line-utils");

const logDeps = (condition, name, values) => {
  if (condition) {
    console.log(
      consoleColors.fg.red,
      consoleColors.fg.yellow,
      `${name}: ====>`,
      JSON.stringify(values, null, 2)
    );
  }
};

module.exports = logDeps;
