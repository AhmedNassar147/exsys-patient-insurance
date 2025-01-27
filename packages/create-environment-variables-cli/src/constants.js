/*
 *
 * Constants: `@exsys-patient-insurance/create-environment-variables-cli`.
 *
 */
const { sharedHelperKey } = require("../../command-line-utils");
const scriptName = "create-env-vars";

const CUSTOM_CRA_ENV_KEYS = {
  BUILD_YEAR: "REACT_APP_BUILD_YEAR",
  BUILD_MONTH: "REACT_APP_BUILD_MONTH",
  BUILD_DAY: "REACT_APP_BUILD_DAY",
  BUILD_TIME: "REACT_APP_BUILD_TIME",
  LATEST_PRODUCTION_VERSION: "REACT_APP_LATEST_PRODUCTION_VERSION",
  BASE_URL: "REACT_APP_BASE_URL",
  API_URL: "REACT_APP_API_URL",
};

const CLIENTS_NAMES = {
  cloud: "cloud",
  testcloud: "testcloud",
};

const CLIENTS_NAMES_KEYS = Object.keys(CLIENTS_NAMES);

const CLIENTS_URLS = {
  [CLIENTS_NAMES.cloud]: "http://136.243.62.235",
  [CLIENTS_NAMES.testcloud]: "http://136.243.62.235",
};

const DEFAULT_CLI_OPTIONS = {
  https: false,
  production: false,
  clientName: CLIENTS_NAMES.cloud,
  sourcemap: false,
  serverPort: "2665",
  certPath: "exsysLocalRootCert.pem",
  certKeyPath: "exsysLocalKey.pem",
  // certPath: "self-signed.pem",
  // certKeyPath: "self-signed.key"
};

const cliOptions = {
  scriptName,
  description: "create environment variables",
  helpersKeys: [
    sharedHelperKey,
    {
      keyOrKeys: "https",
      description: "use secured endpoints. (--https)",
    },
    {
      keyOrKeys: "cert-path",
      description:
        "set the secured site certificate path. (--cert-path=exsysLocalRootCert.pem)",
    },
    {
      keyOrKeys: "cert-key-path",
      description:
        "set the secured site certificate key. (--cert-key-path=exsysLocalKey.pem)",
    },
    {
      keyOrKeys: "production",
      description:
        "create environment variables for production build. (--production)",
    },
    {
      keyOrKeys: "sourcemap",
      description: "include build sourcemap. (--sourcemap)",
    },
    {
      keyOrKeys: "client-name",
      description: `set client endpoints urls. (--client-name=${DEFAULT_CLI_OPTIONS.clientName})`,
    },
    {
      keyOrKeys: "server-port",
      description: `set endpoints server port. (--server-port=9090)`,
    },
  ],
};

module.exports = {
  cliOptions,
  CUSTOM_CRA_ENV_KEYS,
  CLIENTS_NAMES,
  CLIENTS_NAMES_KEYS,
  CLIENTS_URLS,
  DEFAULT_CLI_OPTIONS,
};
