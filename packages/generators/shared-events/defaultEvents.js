/*
 *
 * defaultEvents
 *
 */
const defaultEvents = [
  {
    type: "add",
    path: "../{{name}}/package.json",
    templateFile: "./shared-templates/package.json.hbs",
    abortOnFail: true
  },
  {
    type: "add",
    path: "../{{name}}/README.md",
    templateFile: "./shared-templates/readme.md.hbs",
    abortOnFail: true
  }
];

module.exports = defaultEvents;
