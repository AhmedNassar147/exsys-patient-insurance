/*
 *
 * Constants: `@exsys-patient-insurance/exsys-table`.
 *
 */
import { ColorNamesType } from "@exsys-patient-insurance/types";
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";
import { TABLE_DEFAULT_HEADER_TOOLS_DEFAULT_PROPS } from "@exsys-patient-insurance/table-default-header-tools";

export const SELECTION_COLUMN_WIDTH = 30;
export const EXPAND_COLUMN_WIDTH = 30;
export const ACTION_COLUMN_WIDTH = 48;

export const SORTER_ARROW_PROPS = Object.freeze({
  width: "1em",
  height: "0.8em",
});

export const SORTER_ORDERS = Object.freeze({
  ASC: "ASC",
  DESC: "DESC",
} as const);

export const SEARCH_FORM_INITIAL_STATE = {
  sorterOrder: "",
  orderby: "",
};

export const ACTION_COLUMN_CONTENTS_TYPES = Object.freeze({
  icon: "icon",
  button: "button",
} as const);

export const ACTION_ICON_NAMES = Object.freeze({
  delete: "delete",
  printer: "printer",
  details: "details",
} as const);

export const ACTION_COLUMN_ICONS = Object.freeze({
  [ACTION_ICON_NAMES.delete]: createLazyLoadedComponent(
    () =>
      import(
        "@exsys-patient-insurance/delete-icon" /* webpackChunkName: "exsys-patient-insurance.delete-icon" */
      )
  ),
  [ACTION_ICON_NAMES.printer]: createLazyLoadedComponent(
    () =>
      import(
        "@exsys-patient-insurance/printer-icon" /* webpackChunkName: "exsys-patient-insurance.printer-icon" */
      )
  ),
  [ACTION_ICON_NAMES.details]: createLazyLoadedComponent(
    () =>
      import(
        "@exsys-patient-insurance/details-icon" /* webpackChunkName: "exsys-patient-insurance.details-icon" */
      )
  ),
} as const);

export const TABLE_DEFAULT_PROPS = {
  headBackground: "appPrimary" as ColorNamesType,
  headColor: "white" as ColorNamesType,
  height: "initial",
  width: "100%",
  noPagination: undefined,
  selectedRowBackgroundColor: "lightSky" as ColorNamesType,
  ...TABLE_DEFAULT_HEADER_TOOLS_DEFAULT_PROPS,
  hideTableHeaderTools: undefined,
  footerJustify: "flex-start",
  footerPadding: "4px 0",
  actionColumnWidth: ACTION_COLUMN_WIDTH,
  bodyCellFontSize: "13px",
  headCellFontSize: "14px",
};

export const TABLE_EDITABLE_CELL_TYPES = Object.freeze({
  date: "date",
  text: "text",
  number: "number",
  checkbox: "checkbox",
  select: "select",
} as const);
