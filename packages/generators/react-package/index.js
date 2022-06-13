/*
 *
 * react package: `@exsys-patient-insurance/generators`.
 *
 */
const { REACT_PACKAGE_TYPES, REACT_PAGE_TYPES } = require("../constants");
const defaultPrompts = require("../shared-prompts/defaultPrompts");
const { getTypeOfComponentPackage } = require("../utils/reactComponentUtils");
const whenComponentTypeIsPage = require("../utils/whenComponentTypeIsPage");
const defaultEvents = require("../shared-events/defaultEvents");
const tablePageEvents = require("./tablePageTemplates/events");
const tsEvents = require("../shared-events/tsEvents");
const toCamelCase = require("../utils/toCamelCase");
const afterCreationEvents = require("../shared-events/afterCreationEvents");

const cancShowPathNameOptions = ({ type, isModalInHomePage }) => {
  const { isPage } = getTypeOfComponentPackage(type);
  return isModalInHomePage || isPage;
};

module.exports = {
  description: "Add a react component package",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select the type of the package",
      default: "normal-component",
      choices: () => REACT_PACKAGE_TYPES,
    },
    {
      type: "list",
      name: "pageType",
      when: whenComponentTypeIsPage,
      message: "Select the type of the page",
      default: "normal-page",
      choices: () => REACT_PAGE_TYPES,
    },
    ...defaultPrompts,
    {
      type: "confirm",
      name: "isModalInHomePage",
      message: "render this package as modal in the `HomePage`.",
      default: false,
    },
    {
      type: "input",
      name: "pagePath",
      when: cancShowPathNameOptions,
      message: "Enter the initial page pathname for route data `path`.",
      default: ({ name }) => toCamelCase(name, "-"),
    },
    {
      type: "input",
      name: "pageParams",
      when: whenComponentTypeIsPage,
      message: `Enter params for route data \`params\`.
        ---Notes-- params should be string and if it's more than one it should be separated by commas.
        (Example): someparam,anotherparam`,
      default: "",
      validate: (pageParams) => {
        if (pageParams) {
          const hasArrayOpenBracket = pageParams.startsWith("[");
          const hasArrayCloseBracket = pageParams.endsWith("]");

          if (hasArrayOpenBracket || hasArrayCloseBracket) {
            return `pageParams shouldn't start or end with "[" or "]"`;
          }
        }

        return true;
      },
    },
    {
      type: "confirm",
      name: "wrapWithLabelsProvider",
      default: true,
      message: "wrap your component with `LabelsProvider` ?",
    },
    {
      type: "confirm",
      name: "useConstFile",
      default: true,
      message: "Add constants file in this package ?",
    },
    {
      type: "confirm",
      name: "useStyledFile",
      default: true,
      message: "you want a styled file for this package ?",
    },
  ],
  actions: (eventData) => {
    const { useStyledFile, type, pageType, isModalInHomePage, useConstFile } =
      eventData;

    const isTablePage = pageType === "table-page";
    const { isLazy, isPage, isNormal } = getTypeOfComponentPackage(type);

    const isPackageUsingLazyTech = isLazy || isPage;

    const uiComponentPath = isPackageUsingLazyTech
      ? "component.tsx"
      : "index.tsx";

    const isNormalOrTableTemplatePath = isTablePage
      ? "./react-package/tablePageTemplates/component-table.tsx.hbs"
      : "./react-package/component.tsx.hbs";

    let events = [
      ...defaultEvents,
      ...tsEvents({ isTablePage }),
      {
        type: "add",
        path: `../{{name}}/src/${uiComponentPath}`,
        templateFile: isNormalOrTableTemplatePath,
        abortOnFail: true,
        data: {
          isNormal,
        },
      },
    ];

    if (isTablePage) {
      events = events.concat(...tablePageEvents);
    }

    if (isPackageUsingLazyTech) {
      events = events.concat({
        type: "add",
        path: "../{{name}}/src/index.ts",
        templateFile: "./react-package/lazy.ts.hbs",
        abortOnFail: true,
      });
    }

    if (useStyledFile) {
      events = events.concat({
        type: "add",
        path: "../{{name}}/src/styled.ts",
        templateFile: "./react-package/styled.ts.hbs",
        abortOnFail: true,
      });
    }

    if (useConstFile) {
      events = events.concat({
        type: "add",
        path: "../{{name}}/src/constants.ts",
        templateFile: "./react-package/constants.ts.hbs",
        abortOnFail: true,
      });
    }

    if (isPage) {
      events = events.concat({
        type: "update-generated-routes",
      });
    }

    if (isModalInHomePage) {
      events = events.concat({
        type: "set-home-page-modals",
      });
    }

    return [...events, ...afterCreationEvents];
  },
};
