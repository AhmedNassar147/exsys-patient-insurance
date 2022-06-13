/*
 * development env file generator : `@exsys-patient-insurance/generators`.
 * Exports the generators so that `plop` knows them.
 */
const developmentInvokers = require("./developmentInvokers");

module.exports = (plop) => {
  plop.setGenerator("development `.env` file generator", developmentInvokers);
};
