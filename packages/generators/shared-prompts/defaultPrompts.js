/*
 *
 * defaultPrompts: `shared-prompts`.
 *
 */
const packageExists = require("../utils/packageExists");
const { CONSTANTS } = require("@exsys-patient-insurance/workspaces-helpers");

const defaultPrompts = [
  {
    type: "input",
    name: "name",
    message: "What should it be called?",
    default: "lorem-ipsum",
    validate: (value) => {
      if (/.+/.test(value)) {
        if (packageExists(value)) {
          return "A package with this name already exists.";
        }

        if (/^@exsys-patient-insurance\/?.+/.test(value)) {
          return `The package name should not start with \`${CONSTANTS.PROJECT_NAME_SPACE}\`, it is pre-filled.`;
        }

        return true;
      }

      return "The name is required.";
    },
  },
  {
    type: "input",
    name: "description",
    message: "What is the description of the package?",
    validate: (value) => {
      if (/.+/.test(value)) {
        return true;
      }

      return "The description is required.";
    },
  },
];

module.exports = defaultPrompts;
