/*
 *
 * Component: `TableBody`.
 *
 */
import { memo, Fragment, useCallback } from "react";
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";
import {
  TableRowRecordType,
  ColorNamesType,
  TableColumnProps,
  TableSelectionProps,
  TableSelectionKeysType,
  TableExpandedRowRenderType,
  TableActionColumnProps,
  TableCellInputFunctionsType,
  TableBodyRowClickEvents,
  TableRowClassNameType,
} from "@exsys-patient-insurance/types";
import SelectionView from "./SelectionView";
import ExpandIconCell from "./ExpandIconCell";
import BodyCellRenderer from "./BodyCellRenderer";
import MapCellChildren from "./MapCellChildren";
import {
  StyledTableRowCell,
  ExpandedRow,
  ExpandedRowCell,
  BodyRow,
} from "../styled";
import {
  TableInternalSelectionChangeActionType,
  InternalTableRowClickHandler,
} from "../index.interface";

interface TableBodyProps<T>
  extends Omit<
      TableSelectionProps<T>,
      "disabledRowsSelection" | "onSelectionChanged"
    >,
    TableCellInputFunctionsType<T>,
    TableActionColumnProps<T>,
    Omit<TableBodyRowClickEvents<T>, "onSelectRow"> {
  dataSource: T[];
  rowKey: string;
  columns: TableColumnProps<T>[];
  disabledRowsSelection: TableSelectionKeysType;
  handleRowSelectionChange: TableInternalSelectionChangeActionType;
  showSelectionColumn?: boolean;
  fontSize?: string;
  expandedRowRender?: TableExpandedRowRenderType<T>;
  rowsWithExpandCell: TableSelectionKeysType;
  expandedKeys: TableSelectionKeysType;
  setExpandedKeys: React.Dispatch<React.SetStateAction<TableSelectionKeysType>>;
  showEditableInputs?: boolean;
  selectedRowBackgroundColor?: ColorNamesType;
  onRowClick: InternalTableRowClickHandler<T>;
  clickedRowKey?: TableSelectionKeysType[0];
  actionColumnWidth?: number;
  rowClassName?: TableRowClassNameType<T>;
}

const LazyLoadedActionColumnIcon = createLazyLoadedComponent(
  () =>
    import(
      "./ActionColumnIcon" /* webpackChunkName: "table.actionColumnIcon" */
    )
);

const TableBody = <T extends TableRowRecordType>({
  dataSource,
  rowKey,
  showSelectionColumn,
  selectionType,
  columns,
  disabledRowsSelection,
  handleRowSelectionChange,
  selectionKeys,
  fontSize,
  expandedRowRender,
  rowsWithExpandCell,
  expandedKeys,
  setExpandedKeys,
  onPressActionIcon,
  actionIcon,
  actionRowDisabled,
  actionLabelId,
  onInputChange,
  recordInputsDisabled,
  showEditableInputs,
  selectedRowBackgroundColor,
  onDoubleClick,
  onRowClick,
  clickedRowKey,
  actionColumnWidth,
  rowClassName,
}: TableBodyProps<T>) => {
  const columnsLength = columns?.length ?? 0;
  const showActionColumn = !!onPressActionIcon;
  const hasExpandRowRender = !!expandedRowRender;
  const expandedRowColSpan = columnsLength + ~~showActionColumn;

  const onRowDoubleClick = useCallback(
    (currentRecord: T, recordIndex: number) => () => {
      onDoubleClick?.(currentRecord, recordIndex);
    },
    [onDoubleClick]
  );

  return (
    <tbody>
      {dataSource.map((record, currentRecordIndex) => {
        const currentRowKey = record[rowKey] as TableSelectionKeysType[0];

        const onClickSelection = handleRowSelectionChange({
          key: currentRowKey,
        });

        const showExpandCell = rowsWithExpandCell?.includes?.(
          currentRowKey as never
        );

        const isRowChecked = selectionKeys?.includes?.(currentRowKey as never);

        const rowExpanded = expandedKeys?.includes(currentRowKey as never);
        const showExpandedRow =
          hasExpandRowRender && showExpandCell && rowExpanded;
        const selectionAndExpandColumnsSpan =
          ~~!!showSelectionColumn + ~~hasExpandRowRender;

        return (
          <Fragment key={currentRowKey}>
            <BodyRow
              // @ts-ignore ignore this for now.
              selectedRowBackgroundColor={selectedRowBackgroundColor}
              onClick={onRowClick(currentRowKey, record, currentRecordIndex)}
              onDoubleClick={onRowDoubleClick(record, currentRecordIndex)}
              selected={isRowChecked || clickedRowKey === currentRowKey}
              className={rowClassName?.(record)}
            >
              {showSelectionColumn && (
                <SelectionView
                  type={selectionType}
                  onCheck={onClickSelection}
                  fontSize={fontSize}
                  checked={isRowChecked}
                  disabled={disabledRowsSelection?.includes?.(
                    currentRowKey as never
                  )}
                />
              )}

              {hasExpandRowRender ? (
                <ExpandIconCell
                  fontSize={fontSize}
                  currentRowKey={currentRowKey}
                  expanded={rowExpanded}
                  setExpandedKeys={setExpandedKeys}
                  showExpandIcon={showExpandCell}
                />
              ) : null}

              {columns?.map((cellProps, currentColumnIndex) => {
                const { dataIndex, align, children, titleDataIndex } =
                  cellProps;
                const hasNestedColumns = !!children?.length;

                const computedCellKey = `${dataIndex}-col-${currentColumnIndex}`;

                const sharedProps = {
                  currentRecordIndex,
                  currentRecord: record,
                  fontSize,
                  showEditableInputs,
                  onInputChange,
                  recordInputsDisabled,
                  titleDataIndex,
                };

                return (
                  <StyledTableRowCell key={computedCellKey} fontSize={fontSize}>
                    {!hasNestedColumns && (
                      <BodyCellRenderer<T>
                        {...sharedProps}
                        cellProps={cellProps}
                      />
                    )}

                    {hasNestedColumns && (
                      <MapCellChildren<T>
                        nestedColumns={children as TableColumnProps<T>[]}
                        baseCellAlignment={align}
                        baseCellKey={computedCellKey}
                        baseCellProps={sharedProps}
                        isBodyCells
                      />
                    )}
                  </StyledTableRowCell>
                );
              })}

              <LazyLoadedActionColumnIcon
                shouldMountChunk={showActionColumn}
                onPressActionIcon={onPressActionIcon}
                actionRowDisabled={actionRowDisabled}
                actionLabelId={actionLabelId}
                actionIcon={actionIcon}
                actionColumnWidth={actionColumnWidth}
                fontSize={fontSize}
                currentRecord={record}
                rowIndex={currentRecordIndex}
              />
            </BodyRow>

            {showExpandedRow && (
              <ExpandedRow>
                <StyledTableRowCell
                  colSpan={selectionAndExpandColumnsSpan}
                  fontSize={fontSize}
                />
                <ExpandedRowCell
                  fontSize={fontSize}
                  colSpan={expandedRowColSpan}
                >
                  {expandedRowRender?.(record, currentRecordIndex)}
                </ExpandedRowCell>
              </ExpandedRow>
            )}
          </Fragment>
        );
      })}
    </tbody>
  );
};

export default memo(TableBody) as typeof TableBody;
