/*
 *
 * `updateJsonFile`: `@exsys-patient-insurance/workspaces-helpers`.
 *
 */
const fs = require("fs");

const updateJsonFile = (filePath, jsData) => {
  fs.appendFileSync(filePath, JSON.stringify(jsData, null, 2).concat("\n"), {
    encoding: "utf8",
    flag: "w",
  });
};

module.exports = updateJsonFile;
