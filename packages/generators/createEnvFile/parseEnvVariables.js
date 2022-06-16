/*
 *
 * parseEnvVariables
 *
 */
const {
  DEFAULT_VARS_WITH_VALUES,
  OPTIONS_KEYS_FROM_PKG_JSON,
  CLIENTS_URLS,
  ALLOWED_VARIABLES_KEYS_TO_ENV_FILE,
} = require("../../environment/src/index.js");

const parseEnvVariables = (variables) => {
  let PROCESSED_VARIABLES = DEFAULT_VARS_WITH_VALUES;

  for (const key in OPTIONS_KEYS_FROM_PKG_JSON) {
    const ENV_KEY_VALUE = variables[key];

    if (ENV_KEY_VALUE) {
      PROCESSED_VARIABLES = {
        ...PROCESSED_VARIABLES,
        [key]: ENV_KEY_VALUE,
      };
    }
  }

  let { SERVER_PORT, CLIENT, ...BASE_FINAL_VARIABLES } = PROCESSED_VARIABLES;

  const BASE_URL = `${CLIENTS_URLS[CLIENT]}:${SERVER_PORT}`;

  return {
    ...BASE_FINAL_VARIABLES,
    [ALLOWED_VARIABLES_KEYS_TO_ENV_FILE.BASE_URL]: BASE_URL,
    [ALLOWED_VARIABLES_KEYS_TO_ENV_FILE.API_URL]: `${BASE_URL}/ords/exsys_api/`,
  };
};

module.exports = parseEnvVariables;
