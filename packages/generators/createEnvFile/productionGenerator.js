/*
 * production env file generator : `@exsys-patient-insurance/generators`.
 * Exports the generators so that `plop` knows them.
 */
const productionInvokers = require("./productionInvokers");

module.exports = (plop) => {
  plop.setGenerator("production `.env file` generator", productionInvokers);
};
