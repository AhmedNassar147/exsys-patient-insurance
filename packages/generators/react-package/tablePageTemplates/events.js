const tablePageEvents = [
  {
    type: "add",
    path: "../{{name}}/src/constants.ts",
    templateFile: "./react-package/tablePageTemplates/constants.ts.hbs",
    abortOnFail: true
  },
  {
    type: "add",
    path: "../{{name}}/src/helpers/createColumns.ts",
    templateFile: "./react-package/tablePageTemplates/createColumns.ts.hbs",
    abortOnFail: true
  },
  {
    type: "add",
    path: "../{{name}}/src/helpers/createExcelSheetData.ts",
    templateFile:
      "./react-package/tablePageTemplates/createExcelSheetData.ts.hbs",
    abortOnFail: true
  },
  {
    type: "add",
    path: "../{{name}}/src/helpers/validateRecordBeforeSaveOrUpdateFn.ts",
    templateFile:
      "./react-package/tablePageTemplates/validateRecordBeforeSaveOrUpdateFn.ts.hbs",
    abortOnFail: true
  },
  {
    type: "add",
    path: "../{{name}}/src/partials/ModalView.tsx",
    templateFile: "./react-package/tablePageTemplates/ModalView.tsx.hbs",
    abortOnFail: true
  },
  {
    type: "add",
    path: "../{{name}}/src/partials/index.tsx",
    templateFile: "./react-package/tablePageTemplates/index.tsx.hbs",
    abortOnFail: true
  }
];

module.exports = tablePageEvents;
