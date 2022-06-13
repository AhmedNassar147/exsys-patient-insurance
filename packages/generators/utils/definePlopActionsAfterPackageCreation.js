/*
 *
 * definePlopActionsAfterPackageCreation
 *
 */
const path = require("path");
const { CONSTANTS } = require("@exsys-patient-insurance/workspaces-helpers");
const definePlopActionAndExecuteScript = require("./definePlopActionAndExecuteScript");
const shouldRunScriptsAfterPackageCreation = require("./shouldRunScriptsAfterPackageCreation");
const { getTypeOfComponentPackage } = require("./reactComponentUtils");

const { PROJECT_NAME_SPACE } = CONSTANTS;

function definePlopActionsAfterPackageCreation(plop) {
  // create plop action to prettify the new created package.
  definePlopActionAndExecuteScript(plop, "prettify", (answers) => {
    const folderPath = path.resolve(
      process.cwd(),
      "packages",
      answers.name,
      "**"
    );

    return `yarn prettify "${folderPath}"`;
  });

  // update generated routes when the generated page id
  definePlopActionAndExecuteScript(
    plop,
    "update-generated-routes",
    ({ type }) => {
      const { isPage } = getTypeOfComponentPackage(type);

      if (isPage) {
        return `yarn "generate-routes"`;
      }

      return undefined;
    }
  );

  // update `app/package.json` and working directory `package.json`.
  // with the new package dynamically then we install them.
  definePlopActionAndExecuteScript(
    plop,
    "update-workspaces-deps",
    (answers) => {
      const shouldRunScripts = shouldRunScriptsAfterPackageCreation(answers);

      if (shouldRunScripts) {
        const { name } = answers;
        const newPackageNameAndVersion = `${PROJECT_NAME_SPACE}/${name}@1.0.0`;

        return [
          // we use yarn workspaces to manage the root deps it's easier
          // than lerna at this situation.
          `yarn add ${newPackageNameAndVersion} -W`,

          // update `app/package.json` with new package as peer deps.
          `lerna add ${newPackageNameAndVersion} --peer --scope=app`,

          // install dependencies after package has been generated.
          "yarn bootstrap",
        ];
      }

      return undefined;
    }
  );
}

module.exports = definePlopActionsAfterPackageCreation;
