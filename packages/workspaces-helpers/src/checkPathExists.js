/*
 *
 * checkPathExists: `@exsys-patient-insurance/workspaces-helpers`.
 *
 */
const { stat } = require("fs/promises");

const checkPathExists = async (filePath) =>
  stat(filePath)
    .then(() => filePath)
    .catch(() => false);

module.exports = checkPathExists;
