/*
 *
 * Types: `@exsys-patient-insurance/exsys-table`.
 *
 */
import {
  onChangeEvent,
  TableRowRecordType,
  TableSelectionKeysType,
  TableCellAlignment,
  TableCellInputFunctionsType,
  ColorNamesType,
  EllipsisCssHelperProps,
} from "@exsys-patient-insurance/types";

type TableHeadSearchDropDownActionType = "search" | "reset" | "sort";

export type SorterOrderType = "ASC" | "DESC" | undefined;

export type SorterConfig = {
  sorterOrder: SorterOrderType;
  orderby: string;
};

export type HeadCellActionFiredType = (
  type: TableHeadSearchDropDownActionType,
  sorterConfig?: SorterConfig
) => () => void;

export interface HeadCellSorterProps {
  sorterOrder?: SorterOrderType;
  onSorterChanged: HeadCellActionFiredType;
}

export interface TableHeadSearchDropDownProps {
  dataIndex: string;
  searchValue?: string;
  onChange: onChangeEvent;
  onActionFired: HeadCellActionFiredType;
}

export interface TableStyledCellProps extends EllipsisCssHelperProps {
  width?: string | number;
  align?: TableCellAlignment;
  fontSize?: string;
}

export interface InternalTableStyledCellHeadProps extends TableStyledCellProps {
  headBackground?: ColorNamesType;
  isHeadCell?: boolean;
  noBorder?: boolean;
  disabled?: boolean;
}

export type TableInternalSelectionChangeActionType = (config: {
  all?: boolean;
  key?: TableSelectionKeysType[0];
}) => () => void;

export type InternalTableRowClickHandler<T> = (
  currentRowKey: TableSelectionKeysType[0],
  currentRecord: T,
  recordIndex: number
) => () => void;

export interface InternalBaseBodyCellRendererProps<T extends TableRowRecordType>
  extends TableCellInputFunctionsType<T> {
  currentRecordIndex: number;
  currentRecord: T;
  fontSize?: string;
  showEditableInputs?: boolean;
}
