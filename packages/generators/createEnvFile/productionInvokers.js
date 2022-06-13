/*
 *
 * productionInvokers: `@exsys-patient-insurance/generators`.
 *
 */
// const {
//   CLIENTS_NAMES,
//   DEFAULT_VARS_WITH_VALUES
// } = require("../../environment/src/index.js");
// const collectProperVariables = require("./collectProperVariables");
// const getAppEnvPath = require("./getAppEnvPath");

// module.exports = {
//   description: "build production only env variables file.",
//   prompts: [
//     {
//       type: "list",
//       name: "CLIENT",
//       message: "Select client to build",
//       default: CLIENTS_NAMES.CLOUD,
//       choices: () => Object.values(CLIENTS_NAMES)
//     },
//     {
//       type: "input",
//       name: "BUILD_YEAR",
//       message: "build year ?",
//       default: DEFAULT_VARS_WITH_VALUES.BUILD_YEAR
//     },
//     {
//       type: "input",
//       name: "BUILD_MONTH",
//       message: "build month ?",
//       default: DEFAULT_VARS_WITH_VALUES.BUILD_MONTH
//     },
//     {
//       type: "input",
//       name: "BUILD_DAY",
//       message: "build day ?",
//       default: DEFAULT_VARS_WITH_VALUES.BUILD_DAY
//     },
//     {
//       type: "input",
//       name: "BUILD_TIME",
//       message: "build time ?",
//       default: DEFAULT_VARS_WITH_VALUES.BUILD_TIME
//     },
//     {
//       type: "input",
//       name: "SERVER_PORT",
//       message: "server port ?",
//       default: DEFAULT_VARS_WITH_VALUES.SERVER_PORT
//     }
//   ],
//   actions: ({
//     SERVER_PORT,
//     CLIENT,
//     BUILD_YEAR,
//     BUILD_MONTH,
//     BUILD_DAY,
//     BUILD_TIME
//   }) => {
//     return [
//       {
//         type: "add",
//         templateFile: "./env.hbs",
//         path: getAppEnvPath(),
//         abortOnFail: true,
//         force: true,
//         data: {
//           envValues: collectProperVariables(
//             {
//               SERVER_PORT,
//               CLIENT,
//               BUILD_YEAR,
//               BUILD_MONTH,
//               BUILD_DAY,
//               BUILD_TIME
//             },
//             true
//           )
//         }
//       }
//     ];
//   }
// };

const { DEFAULT_VARS_WITH_VALUES } = require("../../environment/src/index.js");
const collectProperVariables = require("./collectProperVariables");
const getAppEnvPath = require("./getAppEnvPath");

module.exports = {
  description: "build production only env variables file.",
  prompts: [],
  actions: [
    {
      type: "add",
      templateFile: "./env.hbs",
      path: getAppEnvPath(),
      abortOnFail: true,
      force: true,
      data: {
        envValues: collectProperVariables(DEFAULT_VARS_WITH_VALUES, true),
      },
    },
  ],
};
