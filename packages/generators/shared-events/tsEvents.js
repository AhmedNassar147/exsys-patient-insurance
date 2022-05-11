/*
 *
 * tsEvents
 *
 */
const tsEvents = ({ isTablePage }) => [
  {
    type: "add",
    path: "../{{name}}/tsconfig.json",
    templateFile: "./shared-templates/tsconfig.json.hbs",
    abortOnFail: true
  },
  {
    type: "add",
    path: "../{{name}}/src/index.interface.ts",
    templateFile: "./shared-templates/index.interface.ts.hbs",
    abortOnFail: true,
    data: { isTablePage }
  }
];

module.exports = tsEvents;
