/*
 *
 * Package: `@exsys-patient-insurance/create-environment-variables-cli`.
 *
 */
const { writeFile, readFile } = require("fs/promises");
const {
  createCliController,
  consoleColors,
} = require("../../command-line-utils");
const { checkPathExists } = require("../../workspaces-helpers");
const getBuildDates = require("./getBuildDates");
const getAppEnvPath = require("./getAppEnvPath");
const {
  cliOptions,
  CUSTOM_CRA_ENV_KEYS,
  DEFAULT_CLI_OPTIONS,
  CLIENTS_NAMES_KEYS,
  CLIENTS_URLS,
  ENV_FILE_PATH,
} = require("./constants");

const createEnvironmentVariablesFn = async (options) => {
  const envFilePath = getAppEnvPath();
  const {
    https,
    production,
    clientName,
    sourcemap,
    serverPort,
    certPath,
    certKeyPath,
  } = {
    ...DEFAULT_CLI_OPTIONS,
    ...options,
  };

  if (!CLIENTS_NAMES_KEYS.includes(clientName)) {
    console.log(
      consoleColors.fg.red,
      `\nClient name must be one those clients ${CLIENTS_NAMES_KEYS.join(
        " , "
      )}\n`
    );

    process.exit(1);
  }

  if (isNaN(serverPort)) {
    console.log(consoleColors.fg.red, `\nServer port must be number\n`);

    process.exit(1);
  }

  const { year, month, day, time } = getBuildDates();
  const clientNameUrl = CLIENTS_URLS[clientName];
  let baseUrl = `${clientNameUrl}:${serverPort}`;

  if (!!https) {
    baseUrl = baseUrl.replace(/http:/, "https:");
  }

  const buildTimes = {
    [CUSTOM_CRA_ENV_KEYS.BUILD_YEAR]: year,
    [CUSTOM_CRA_ENV_KEYS.BUILD_MONTH]: month,
    [CUSTOM_CRA_ENV_KEYS.BUILD_DAY]: day,
    [CUSTOM_CRA_ENV_KEYS.BUILD_TIME]: time,
  };

  let latestProductionVersion = "";

  if (!production && checkPathExists(envFilePath)) {
    const fileContent = await readFile(envFilePath, "utf-8");
    if (fileContent) {
      const [foundMatch] =
        fileContent.match(/REACT_APP_LATEST_PRODUCTION_VERSION=[\d|.]+/gm) ||
        [];

      const [, version] = (foundMatch || "").replace(/\s/g, "").split("=");

      latestProductionVersion = version || "";
    }
  }

  if (!latestProductionVersion && production) {
    latestProductionVersion = Object.values(buildTimes).join(".");
  }

  const allEnvironmentVariables = {
    // native `CRA` env variables
    NODE_ENV: production ? "production" : "development",
    ...(production
      ? {
          GENERATE_SOURCEMAP: !!sourcemap,
        }
      : null),
    ...(!!https
      ? {
          HTTPS: true,
          SSL_CRT_FILE: `../certs/${certPath}`,
          SSL_KEY_FILE: `../certs/${certKeyPath}`,
        }
      : null),
    // custom `CRA` env variables
    ...buildTimes,
    [CUSTOM_CRA_ENV_KEYS.LATEST_PRODUCTION_VERSION]: latestProductionVersion,
    [CUSTOM_CRA_ENV_KEYS.BASE_URL]: baseUrl,
    [CUSTOM_CRA_ENV_KEYS.API_URL]: `${baseUrl}/ords/exsys_api/`,
  };

  let envVariablesString = "";

  for (const key in allEnvironmentVariables) {
    envVariablesString += `${key}=${allEnvironmentVariables[key]}\n`;
  }

  await writeFile(envFilePath, envVariablesString);
};

createCliController({
  ...cliOptions,
  runCliFn: createEnvironmentVariablesFn,
});
