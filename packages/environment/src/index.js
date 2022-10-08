/*
 *
 * Package: `@exsys-patient-insurance/environment`.
 *
 */
const { year, day, month, time } = require("./getBuildDates");

/* STEPS TO ADD NEW CLIENT */
// 1)- in `CLIENTS_NAMES` variables add the new client.
// 2)- in `CLIENTS_URLS` variables add the new client url.

const CRA_PREFIX = "REACT_APP_";

const BASE_OPTIONS_KEYS_FROM_PKG_JSON = {
  BUILD_YEAR: "BUILD_YEAR",
  BUILD_MONTH: "BUILD_MONTH",
  BUILD_DAY: "BUILD_DAY",
  BUILD_TIME: "BUILD_TIME",
};

// note that these keys values will be prefixed with `REACT_APP_` in the final
// process of this module. like `BASE_URL` will be `REACT_APP_BASE_URL=whatever`
// and you can access it's value like this `process.env.REACT_APP_BASE_URL`.
const ALLOWED_VARIABLES_KEYS_TO_ENV_FILE = {
  ...BASE_OPTIONS_KEYS_FROM_PKG_JSON,
  BASE_URL: "BASE_URL",
  API_URL: "API_URL",
};

const OPTIONS_KEYS_FROM_PKG_JSON = {
  CLIENT: "CLIENT",
  SERVER_PORT: "SERVER_PORT",
  ...BASE_OPTIONS_KEYS_FROM_PKG_JSON,
};

const CLIENTS_NAMES = {
  CLOUD: "cloud",
};

const DEFAULT_VARS_WITH_VALUES = {
  [OPTIONS_KEYS_FROM_PKG_JSON.SERVER_PORT]: "9090",
  [OPTIONS_KEYS_FROM_PKG_JSON.CLIENT]: CLIENTS_NAMES.CLOUD,
  [OPTIONS_KEYS_FROM_PKG_JSON.BUILD_YEAR]: year,
  [OPTIONS_KEYS_FROM_PKG_JSON.BUILD_MONTH]: month,
  [OPTIONS_KEYS_FROM_PKG_JSON.BUILD_DAY]: day,
  [OPTIONS_KEYS_FROM_PKG_JSON.BUILD_TIME]: time,
};

const CLIENTS_URLS = {
  [CLIENTS_NAMES.CLOUD]: "http://149.102.140.8",
};
module.exports = {
  DEFAULT_VARS_WITH_VALUES,
  CLIENTS_NAMES,
  CLIENTS_URLS,
  OPTIONS_KEYS_FROM_PKG_JSON,
  CRA_PREFIX,
  ALLOWED_VARIABLES_KEYS_TO_ENV_FILE,
};
