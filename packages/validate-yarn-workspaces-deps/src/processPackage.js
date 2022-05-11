/*
 *
 * `processPackage`: `@exsys-clinio/validate-yarn-workspaces-deps`.
 *
 */
const { consoleColors } = require("@exsys-clinio/command-line-utils");
const { readRootPackageJson } = require("@exsys-clinio/workspaces-helpers");
const collectFileDeps = require("./collectFileDeps");
const areDepsNotEqual = require("./areDepsNotEqual");
const sortDeps = require("./sortDeps");
const {
  exsysPackagesPathRegex,
  deepExsysPackagesPathRegex,
  deepAntdLibsPathRegex,
  removeSrcAndStringAfterRegex,
} = require("./constants");

const processPackage = async ({
  packageName,
  filesInSrcDir,
  dependencies: originalDependencies,
  peerDependencies: originalPeerDependencies,
  scriptName,
}) => {
  console.log(
    consoleColors.reset,
    consoleColors.bright,
    `[[[${scriptName}]]]:   processing ${packageName} package.`
  );
  const packageDeps = await Promise.all(
    filesInSrcDir.map((file) => collectFileDeps(file, scriptName))
  );

  let packageDepsAsString = packageDeps.toString();

  const [hasExsysPackagesDeepPath, hasAntdLibDeepPath] = [
    deepExsysPackagesPathRegex.test(packageDepsAsString),
    deepAntdLibsPathRegex.test(packageDepsAsString),
  ];

  if (hasExsysPackagesDeepPath) {
    packageDepsAsString = packageDepsAsString.replace(
      removeSrcAndStringAfterRegex,
      ""
    );
  }

  if (hasAntdLibDeepPath) {
    packageDepsAsString = packageDepsAsString.replace(
      deepAntdLibsPathRegex,
      "antd"
    );
  }

  let normalizedPackageDepsArray = packageDepsAsString
    .split(",")
    .filter(Boolean);

  normalizedPackageDepsArray = [...new Set(normalizedPackageDepsArray)];

  let packageFoundDependencies = {};
  let packageFoundPeerDependencies = {};

  normalizedPackageDepsArray.forEach((name) => {
    const isDependencies = name.match(exsysPackagesPathRegex);

    let depsObj = isDependencies
      ? packageFoundDependencies
      : packageFoundPeerDependencies;

    depsObj[name] = isDependencies ? "1.0.0" : "x.x.x";
  });

  const packagesInPeerDependencies = Object.keys(packageFoundPeerDependencies);

  let curedPeerDependencies = {};

  if (!!packagesInPeerDependencies.length) {
    const [rootDependencies, rootDevDependencies] = readRootPackageJson([
      "dependencies",
      "devDependencies",
    ]);

    const allRootDeps = {
      ...rootDependencies,
      ...rootDevDependencies,
    };

    packagesInPeerDependencies.forEach((libName) => {
      const typeOfLibName = libName.includes("@types/")
        ? libName
        : `@types/${libName}`;
      const hasCurrentTypes = allRootDeps.hasOwnProperty(typeOfLibName);
      const actualName = hasCurrentTypes ? typeOfLibName : libName;

      if (!allRootDeps.hasOwnProperty(libName)) {
        // console.log({ libName, packageName });
        throw new Error(`
          Couldn't Find library "[[[${libName}]]]" in root "[[[package.json]]]".
          Please, Install It via Only "YARN" only we are using this package, and run me again.
        `);
      }

      const libBaseVersion = allRootDeps[actualName].split(".")[0];
      curedPeerDependencies[actualName] = `${libBaseVersion}.x.x`;
    });
  }

  packageFoundDependencies = sortDeps(packageFoundDependencies);
  curedPeerDependencies = sortDeps(curedPeerDependencies);

  const areDependenciesChanged = areDepsNotEqual(
    originalDependencies,
    packageFoundDependencies
  );
  const arePeerDependenciesChanged = areDepsNotEqual(
    originalPeerDependencies,
    curedPeerDependencies
  );

  if (areDependenciesChanged || arePeerDependenciesChanged) {
    return new Promise((resolve) => {
      resolve({
        packageName,
        arePeerDependenciesChanged,
        areDependenciesChanged,
        curedPeerDependencies,
        packageFoundDependencies,
      });
    });
  }

  return false;
};

module.exports = processPackage;
