/*
 *
 * Component: `TableHeader`.
 *
 */
import { memo } from "react";
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";
import {
  RecordType,
  TableRowRecordType,
  TableHeaderProps,
} from "@exsys-patient-insurance/types";
import SelectionView from "./SelectionView";
import HeadCellRenderer from "./HeadCellRenderer";
import MapCellChildren from "./MapCellChildren";
import { StyledTableHead, StyledTableRowCell } from "../styled";
import { EXPAND_COLUMN_WIDTH } from "../constants";
import {
  TableInternalSelectionChangeActionType,
  TableHeadSearchDropDownProps,
  SorterOrderType,
} from "../index.interface";

interface TableInternalHeaderProps<T>
  extends TableHeaderProps<T>,
    Omit<TableHeadSearchDropDownProps, "dataIndex" | "searchValue"> {
  showSelectionColumn?: boolean;
  selectionColumnDisabled?: boolean;
  handleRowSelectionChange: TableInternalSelectionChangeActionType;
  selectionColumnChecked?: boolean;
  showExpandColumn?: boolean;
  searchParamsValues: RecordType;
  showActionColumn?: boolean;
  actionColumnWidth?: number;
  fontSize?: string;
}

const LazyLoadedActionActionCell = createLazyLoadedComponent(
  () =>
    import(
      "./ActionColumnCellWrapper" /* webpackChunkName: "table.actionColumnCellWrapper" */
    )
);
EXPAND_COLUMN_WIDTH;

const EXPAND_COLUMN_WIDTH_PX = `${EXPAND_COLUMN_WIDTH}px`;

const TableHeader = <T extends TableRowRecordType>({
  columns,
  headBackground,
  headColor,
  showSelectionColumn,
  selectionType,
  selectionColumnDisabled,
  selectionColumnChecked,
  handleRowSelectionChange,
  showExpandColumn,
  onChange,
  onActionFired,
  searchParamsValues,
  showActionColumn,
  actionColumnWidth,
  fontSize,
}: TableInternalHeaderProps<T>) => {
  const onSelectionChanged = handleRowSelectionChange({
    all: true,
  });

  return (
    <>
      <StyledTableHead headBackground={headBackground} headColor={headColor}>
        <tr>
          {showSelectionColumn && (
            <SelectionView
              isHeadCell
              type={selectionType}
              headBackground={headBackground}
              disabled={selectionColumnDisabled}
              checked={selectionColumnChecked}
              onCheck={onSelectionChanged}
              fontSize={fontSize}
            />
          )}

          {showExpandColumn && (
            <StyledTableRowCell
              isHeadCell
              width={EXPAND_COLUMN_WIDTH_PX}
              headBackground={headBackground}
              fontSize={fontSize}
            />
          )}

          {columns?.map((cellProps, currentColumnIndex) => {
            const { dataIndex, children, align } = cellProps;

            const computedCellKey = `${dataIndex}-col-${currentColumnIndex}`;

            const sharedProps = {
              onActionFired,
              onChange,
              sorterOrder: searchParamsValues.sorterOrder as SorterOrderType,
            };

            const nestedCellProps = {
              ...sharedProps,
              searchParamsValues,
            };

            return (
              <StyledTableRowCell
                key={computedCellKey}
                headBackground={headBackground}
                isHeadCell
                fontSize={fontSize}
              >
                <HeadCellRenderer
                  {...cellProps}
                  searchValue={searchParamsValues[dataIndex]}
                  {...sharedProps}
                />

                {!!children?.length && (
                  <MapCellChildren<T>
                    nestedColumns={children}
                    baseCellKey={computedCellKey}
                    baseCellAlignment={align}
                    baseCellProps={nestedCellProps}
                  />
                )}
              </StyledTableRowCell>
            );
          })}

          <LazyLoadedActionActionCell
            shouldMountChunk={showActionColumn}
            isHeadCell
            headBackground={headBackground}
            actionColumnWidth={actionColumnWidth}
          />
        </tr>
      </StyledTableHead>
    </>
  );
};

export default memo(TableHeader) as typeof TableHeader;
