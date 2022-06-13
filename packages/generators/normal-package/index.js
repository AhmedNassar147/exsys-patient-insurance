/*
 *
 * normal package: `@exsys-patient-insurance/generators`.
 *
 */
const defaultPrompts = require("../shared-prompts/defaultPrompts");
const defaultEvents = require("../shared-events/defaultEvents");
const tsEvents = require("../shared-events/tsEvents");
const afterCreationEvents = require("../shared-events/afterCreationEvents");

module.exports = {
  description: "Add a normal package",
  prompts: [
    ...defaultPrompts,
    {
      type: "confirm",
      name: "usesTs",
      default: true,
      message: "does this package use `typescript`?",
    },
    {
      type: "confirm",
      name: "enableBabelTranspilation",
      default: true,
      message: "Enable babel transpilation and hot reload for this package ?",
    },
  ],
  actions: ({ usesTs }) => {
    const extension = usesTs ? "ts" : "js";

    let events = [
      ...defaultEvents,
      {
        type: "add",
        path: `../{{name}}/src/index.${extension}`,
        templateFile: "./normal-package/index.js.hbs",
        abortOnFail: true,
      },
    ];

    if (usesTs) {
      events = [...events, ...tsEvents({})];
    }

    return [...events, ...afterCreationEvents];
  },
};
