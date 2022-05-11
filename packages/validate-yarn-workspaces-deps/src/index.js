/*
 *
 * Package: `@exsys-clinio/validate-yarn-workspaces-deps`.
 *
 */
const {
  createCliController,
  consoleColors,
  delayProcess,
} = require("@exsys-clinio/command-line-utils");
const processPackage = require("./processPackage");
const getAllTranspiledPackagesDataPromises = require("./getAllTranspiledPackagesDataPromises");
const { cliOptions } = require("./constants");
const logDeps = require("./logDeps");

const runCli = async ({ filter, processPkgPerMs, ...props }) => {
  const transpiledPackagesFiles = (
    await Promise.all(getAllTranspiledPackagesDataPromises(filter))
  )
    .filter(Boolean)
    .filter((packageData) => !!packageData.filesInSrcDir);

  const processPackagesDataLength = transpiledPackagesFiles.length;

  if (!processPackagesDataLength) {
    console.log("There are no packages to process Yet.");

    return;
  }

  let errorsInPackage = [];

  while (!!processPackagesDataLength) {
    const selectedPackage = transpiledPackagesFiles.splice(0, 1)[0];
    if (selectedPackage) {
      const result = await delayProcess(
        processPackage,
        selectedPackage,
        processPkgPerMs || 250
      );
      errorsInPackage.push(result);
    } else {
      break;
    }
  }

  errorsInPackage = errorsInPackage.filter(Boolean);

  if (errorsInPackage.length) {
    errorsInPackage.forEach(
      ({
        packageName,
        arePeerDependenciesChanged,
        areDependenciesChanged,
        curedPeerDependencies,
        packageFoundDependencies,
      }) => {
        console.log(
          consoleColors.fg.red,
          `Please Update "package.json" of ${packageName} with the following.`
        );

        logDeps(
          areDependenciesChanged,
          "dependencies",
          packageFoundDependencies
        );

        logDeps(
          arePeerDependenciesChanged,
          "peerDependencies",
          curedPeerDependencies
        );

        console.log(
          consoleColors.reset,
          "=======================================================",
          consoleColors.reset
        );
      }
    );
  }
  console.log(consoleColors.reset, "✨✨happy hacking!✨✨");
};

createCliController({
  ...cliOptions,
  runCliFn: runCli,
});
