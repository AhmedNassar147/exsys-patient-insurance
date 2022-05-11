/*
 *
 * `readJsonFile`: `@exsys-clinio/workspaces-helpers`.
 *
 */
const fs = require("fs");

const readJsonFile = (jsonFilePath, toJSData) => {
  const jsonFile = fs.readFileSync(jsonFilePath, {
    encoding: "utf8",
  });

  return toJSData ? JSON.parse(jsonFile) : jsonFile;
};

module.exports = readJsonFile;
