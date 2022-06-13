/*
 *
 * `updateModalConfigJsonFile`: `home-page-modals`.
 *
 */
const { generatedModalConfigJsonPath } = require("./constants");
const readJsonFile = require("@exsys-patient-insurance/workspaces-helpers/src/readJsonFile");
const updateJsonFile = require("@exsys-patient-insurance/workspaces-helpers/src/updateJsonFile");

const readGeneratedModalConfig = () => {
  const config = readJsonFile(generatedModalConfigJsonPath, true);

  return config || {};
};

const sections = {
  lazy: "lazy",
  normal: "normal",
};

const updateModalConfigJsonFile = ({
  packageName,
  routePath,
  isLazyOrPage,
}) => {
  const oldGeneratedModalConfig = readGeneratedModalConfig();
  const sectionName = isLazyOrPage ? sections.lazy : sections.normal;

  const currentSectionData = oldGeneratedModalConfig[sectionName] || [];

  let alreadyExists = false;

  if (currentSectionData.length) {
    alreadyExists = currentSectionData.some(
      (item) => item.packageName === packageName && item.routePath === routePath
    );
  }

  if (alreadyExists) {
    return {
      ...oldGeneratedModalConfig,
      alreadyExists,
    };
  }

  const newConfig = {
    ...oldGeneratedModalConfig,
    [sectionName]: [
      ...(oldGeneratedModalConfig[sectionName] || []),
      {
        packageName,
        routePath,
      },
    ],
  };

  updateJsonFile(generatedModalConfigJsonPath, newConfig);

  return newConfig;
};

module.exports = updateModalConfigJsonFile;
