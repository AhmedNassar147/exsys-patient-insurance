/*
 *
 * table: `@exsys-patient-insurance/types`
 *
 */
import {
  RecordTypeWithAnyValue,
  RecordType,
  ColorNamesType,
} from "./base.interface";
import { SelectListProps } from "./form-field.interface";
import { ReactExportsExcelProps } from "./downloadExcel.interface";
import { ButtonTypes, ButtonSizeType } from "@exsys-patient-insurance/button";
import { ApiIdsTypes, BaseQueryConfigProps } from "./network.interface";

export type TableSelectionType = "radio" | undefined;

export type TableRowKeyType = string;

export type TableRowRecordType = RecordTypeWithAnyValue;

export type TableSelectionKeysType = string[] | number[];

export interface TableStyledHeadProps {
  headBackground?: ColorNamesType;
  headColor?: ColorNamesType;
}

export type TableExpandedRowRenderType<T> = (
  currentRecord: T,
  rowIndex: number
) => React.ReactNode;

export type TableDisabledRowSelections<T> =
  | TableSelectionKeysType
  | ((record: T, index: number) => boolean);

export type TableSelectionChangeActionType<T> = (
  selectedKeys: TableSelectionKeysType,
  selectedRows: T[]
) => void;

export type PaginatorChangedEventData = {
  currentPage: number;
  rowsPerPage: number;
};

export type TableFetchMoreActionEventType = PaginatorChangedEventData & {
  searchParams?: TableRowRecordType;
};

export type TableFetchActionType = (
  options: TableFetchMoreActionEventType
) => void;

export interface TableSelectionProps<T> {
  selectionType?: TableSelectionType;
  selectionKeys?: TableSelectionKeysType;
  onSelectionChanged?: TableSelectionChangeActionType<T>;
  disabledRowsSelection?: TableDisabledRowSelections<T>;
}

export interface TableContainerProps {
  width?: string;
  margin?: string;
  height?: string;
  className?: string;
  order?: number;
}

type SetPaginatorStateAction = React.Dispatch<
  React.SetStateAction<PaginatorChangedEventData>
>;

export interface TableBaseProps<T = TableRowRecordType>
  extends TableContainerProps {
  bodyCellFontSize?: string;
  headCellFontSize?: string;
  rowKey: TableRowKeyType;
  totalRecordsInDataBase: number;
  loading?: boolean;
  dataSource: T[];
  footer?: (dataSource: T[]) => React.ReactNode;
  expandedRowRender?: TableExpandedRowRenderType<T>;
  currentPage?: number;
  rowsPerPage?: number;
}

export interface TablePaginationProps {
  noPagination?: boolean;
  onFetchMore?: TableFetchActionType;
  onSearchAndFilterTable?: TableFetchActionType;
  resetTableFilters?: TableFetchActionType;
}

export type TableCellAlignment = "start" | "end" | "center";

type CellRenderType<T> = (
  valueOfDataIndex: any,
  record: T,
  index: number
) => React.ReactNode;

export type TableCellInputType =
  | "text"
  | "number"
  | "checkbox"
  | "date"
  | "select";

export type TableDateInputMode = "time" | "date" | "month" | "year" | "decade";

export interface ColumnInputProps<T extends TableRowRecordType> {
  inputType: TableCellInputType;
  name?: string;
  dateMode?: TableDateInputMode;
  dateFormat?: string;
  dateInputShowTime?:
    | boolean
    | {
        format: string;
      };
  numberFormatterShape?: string;
  selectOptions?: SelectListProps[] | ((record: T) => SelectListProps[]);
  allowSelectClear?: boolean;
  min?: number | ((record: T) => number);
  max?: number | ((record: T) => number);
  disabled?: boolean | ((record: T) => boolean);
}

export type TableTotalCellProps = {
  title?: string;
  isFragment?: boolean;
};

export interface TableColumnProps<T = TableRowRecordType> {
  width?: string | number;
  align?: TableCellAlignment;
  title: React.ReactNode;
  dataIndex: string;
  render?: CellRenderType<T>;
  searchable?: boolean;
  ellipsis?: boolean;
  sorter?: boolean;
  inputProps?: ColumnInputProps<T>;
  totalCellProps?: TableTotalCellProps;
  children?: TableColumnProps<T>[];
  valueFixedBy?: number;
  titleDataIndex?: string;
}

export interface TableHeaderProps<T>
  extends TableStyledHeadProps,
    Omit<TableSelectionProps<T>, "onSelectionChanged" | "selectionKeys"> {
  columns: TableColumnProps<T>[];
}

export interface TableFooterProps {
  footerJustify?: string;
  footerPadding?: string;
  footerGap?: string;
}

export type TableActionIconNamesType = "delete" | "printer" | "details";
export type TableActionElementType = {
  type: "icon" | "button";
  iconName?: TableActionIconNamesType;
  label?: string;
  width?: string;
  height?: string;
  color?: ColorNamesType;
  backgroundColor?: ColorNamesType;
  buttonSize?: ButtonSizeType;
  buttonType?: ButtonTypes;
};

export type OnPressTableRowActionType<T = TableRowRecordType> = (
  row: T,
  rowIndex: number,
  currentActionItemKey?: string
) => void;

export type ActionRowDisabledActionType<T = TableRowRecordType> = (
  row: T,
  rowIndex: number
) => boolean;

export interface TableActionColumnProps<T = TableRowRecordType> {
  onPressActionIcon?: OnPressTableRowActionType<T>;
  actionIcon?: TableActionIconNamesType | TableActionElementType[];
  actionRowDisabled?: ActionRowDisabledActionType<T>;
  actionLabelId?: string;
}

export type TableAlignTotalCellsPropType = {
  useAlignedTotalCells?: boolean;
  useFloatingLabelsTotalCells?: boolean;
};

export type UseCreateExcelSheetBasePropType = {
  sheetName?: string;
};

export interface TableHeaderToolsConfigType {
  canInsert?: boolean;
  canDelete?: boolean;
  canEdit?: boolean;
  withInfo?: boolean;
  withExcel?: boolean;
  withPdf?: boolean;
  showSaveIcon?: boolean;
}

export interface TableDefaultHeaderToolsProps
  extends TableHeaderToolsConfigType {
  onPressSaveOrEdit?: () => void;
  onPressPrintPdf?: () => void;
  onPressAdd?: () => void;
  onPressDelete?: () => void;
  onPressInfoIcon?: () => void;
  isEditing?: boolean;
  hasDataSource?: boolean;
  hasSelectedRow?: boolean;
  excelSheetProps?: ReactExportsExcelProps;
}

export type TableHeaderToolsMainProps = Omit<
  TableDefaultHeaderToolsProps,
  "excelSheetProps" | "hasDataSource" | "hasDataSource" | "isEditing"
>;

export type RecordInputsDisabledType<T = TableRowRecordType> = (event: {
  record: T;
  index: number;
  dataIndex: string;
}) => boolean;

export type OnTableCellInputChange = <ValueType = any>(event: {
  name: string;
  value: ValueType;
  rowIndex: number;
}) => void;

export type TableCellInputFunctionsType<T = TableRowRecordType> = {
  onInputChange?: OnTableCellInputChange;
  recordInputsDisabled?: RecordInputsDisabledType<T> | string[];
};

export type TableRowClassNameType<T = TableRowRecordType> = (
  record: T
) => string;

export type TableRowCellClassNameType<T = TableRowRecordType> = (
  record: T,
  dataIndex: string
) => string;

export type TableBodyRowClickEvent<T = TableRowRecordType> = (
  currentRecord: T,
  rowIndex: number
) => void;

export type TableBodyRowClickEvents<T = TableRowRecordType> = {
  onSelectRow?: TableBodyRowClickEvent<T>;
  onDoubleClick?: TableBodyRowClickEvent<T>;
};

export type TableColumnsTotalsType = RecordType<number>;

export type TableQueryAPiResponseType<T = RecordTypeWithAnyValue[]> = {
  data: T;
};

export type FetchTableExcelDataType<T extends TableRowRecordType> =
  () => Promise<T[]>;

export interface TableProps<T = TableRowRecordType>
  extends TableBaseProps<T>,
    TableHeaderProps<T>,
    TableSelectionProps<T>,
    TableActionColumnProps<T>,
    TableCellInputFunctionsType<T>,
    TableBodyRowClickEvents<T>,
    UseCreateExcelSheetBasePropType,
    TablePaginationProps,
    TableHeaderToolsMainProps,
    TableFooterProps,
    TableAlignTotalCellsPropType {
  showEditableInputs?: boolean;
  selectedRowBackgroundColor?: ColorNamesType;
  hideTableHeaderTools?: boolean;
  actionColumnWidth?: number;
  rowClassName?: TableRowClassNameType<T>;
  rowCellClassName?: TableRowCellClassNameType<T>;
  fetchTableExcelData?: FetchTableExcelDataType<T>;
  columnsTotals?: TableColumnsTotalsType;
  selectedRowKey?: string | number;
}

export interface TableQueryConfigProps
  extends Omit<BaseQueryConfigProps, "apiId"> {
  transformQueryApiData?: (data: any) => any;
  apiId: ApiIdsTypes;
  noPagination?: boolean;
  pageSize?: number;
}

export interface PaginatorBaseProps {
  margin?: string;
}

export interface PaginatorItemProps {
  disabled?: boolean;
  selected?: boolean;
}

export type OnPaginatorChangedActionType = (
  event: PaginatorChangedEventData
) => void | SetPaginatorStateAction;

export interface PaginatorProps
  extends PaginatorBaseProps,
    PaginatorChangedEventData {
  totalItems: number;
  hideOnSinglePage?: boolean;
  disabled?: boolean;
  onChange?: OnPaginatorChangedActionType;
}
