/*
 *
 * home-page-modals: `@exsys-patient-insurance/generators`.
 *
 */
const { existsSync } = require("fs");
const consoleColors = require("../../command-line-utils/src/consoleColors");
const definePlopActionAndExecuteScript = require("../utils/definePlopActionAndExecuteScript");
const {
  modalsConfigFilePathInHomePage,
  generatedModalConfigJsonPath,
} = require("./constants");
const updateModalConfigJsonFile = require("./updateModalConfigJsonFile");

const argv = process.argv.slice(2) || [];

const resetConsoleColor = (isSuccess) => {
  console.log(consoleColors.reset, !isSuccess ? "" : "✨✨happy hacking!✨✨");
};

module.exports = (plop) => {
  const neededArgs = argv.filter(
    (item) => item.includes("--add") || item.includes("--pathname")
  );

  const { add: packageName, pathname } = neededArgs.reduce((acc, item) => {
    const [key, value] = item.split("=");
    const properKey = key.replace(/--/, "");
    acc[properKey] = value;

    return acc;
  }, {});

  if (!packageName || !pathname) {
    console.log(
      consoleColors.fg.red,
      `Please Provide the package name and it's route pathName.`
    );

    resetConsoleColor();

    process.exit(1);
  }

  const basePackagePath = `${process.cwd()}/packages/${packageName}/src`;

  const isPackageExists = existsSync(basePackagePath);

  if (!isPackageExists) {
    console.log(
      consoleColors.fg.red,
      `the package "${packageName}" doesn't exist yet.`
    );

    resetConsoleColor();

    process.exit(1);
  }

  const [hasIndexTsFile, hasIndexTsxFile, hasComponentFile] = [
    "index.ts",
    "index.tsx",
    "component.tsx",
  ].map((filePath) => existsSync(`${basePackagePath}/${filePath}`));

  console.log(
    consoleColors.bright,
    consoleColors.fg.magenta,
    `processing package : =>>> "${packageName}" where it's route pathname is "${pathname}".`
  );

  const { lazy, normal, alreadyExists } = updateModalConfigJsonFile({
    packageName,
    routePath: pathname.replace("/", ""),
    isLazyOrPage: (hasIndexTsFile || hasIndexTsxFile) && hasComponentFile,
  });

  if (alreadyExists) {
    console.log(
      consoleColors.fg.red,
      `the package "${packageName}" already exist.`
    );

    resetConsoleColor();

    process.exit(1);
  }

  plop.setGenerator("home page modals generator", {
    description: "generate home page modals",
    prompts: [],
    actions: [
      {
        type: "add",
        path: modalsConfigFilePathInHomePage,
        abortOnFail: true,
        templateFile: "./index.js.hbs",
        force: true,
        data: {
          hasNormalPackage: normal && !!normal.length,
          hasLazyPackage: lazy && !!lazy.length,
          normalPackage: normal,
          lazyPackage: lazy,
        },
      },
      {
        type: "prettify-home-page-updated-files",
      },
    ],
  });

  definePlopActionAndExecuteScript(
    plop,
    "prettify-home-page-updated-files",
    () => {
      resetConsoleColor(true);

      return [
        `yarn prettify "${modalsConfigFilePathInHomePage}"`,
        `yarn prettify "${generatedModalConfigJsonPath}"`,
      ];
    }
  );
};
