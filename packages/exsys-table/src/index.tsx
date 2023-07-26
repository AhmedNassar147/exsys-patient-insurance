/*
 *
 * Package: `@exsys-patient-insurance/exsys-table`.
 *
 */
import { memo, useMemo, useState, useCallback, useLayoutEffect } from "react";
import LoadingOverlay from "@exsys-patient-insurance/overlay";
import { useBoundingClientRect } from "@exsys-patient-insurance/hooks";
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";
import useFormManager from "@exsys-patient-insurance/form-manager";
import {
  TableRowRecordType,
  TableProps,
  TableSelectionKeysType,
  OnPaginatorChangedActionType,
} from "@exsys-patient-insurance/types";
import useExpandableTableRows from "./hooks/useExpandableTableRows";
import useCreateExcelSheet from "./hooks/useCreateExcelSheet";
import TableBody from "./partial/TableBody";
import TableHeader from "./partial/TableHeader";
import generateFixedColumns from "./helpers/generateFixedColumns";
import createRowSelectionValuesForChangeEvent from "./helpers/createRowSelectionValuesForChangeEvent";
import {
  TableContainer,
  StyledTable,
  TableContentWrapper,
  TableFooter,
  EmptyView,
} from "./styled";
import {
  SEARCH_FORM_INITIAL_STATE,
  TABLE_DEFAULT_PROPS,
  TABLE_EDITABLE_CELL_TYPES,
  ACTION_COLUMN_CONTENTS_TYPES,
  ACTION_ICON_NAMES,
} from "./constants";
import {
  TableInternalSelectionChangeActionType,
  HeadCellActionFiredType,
  InternalTableRowClickHandler,
} from "./index.interface";

const LazyLoadedPaginator = createLazyLoadedComponent(
  () =>
    import(
      "@exsys-patient-insurance/paginator" /* webpackChunkName: "exsys-patient-insurance.exsys-table.paginator" */
    )
);

const LazyLoadedTableDefaultHeaderTools = createLazyLoadedComponent(
  () =>
    import(
      "@exsys-patient-insurance/table-default-header-tools" /* webpackChunkName: "exsys-patient-insurance.table-default-header-tools" */
    )
);

const LazyLoadedCreateTotalCellsRow = createLazyLoadedComponent(
  () =>
    import(
      "./partial/CreateTotalCellsRow" /* webpackChunkName: "exsys-patient-insurance.exsys-table.create-total-cells-row" */
    )
);

const ExsysTable = <T extends TableRowRecordType>({
  columnsTotals,
  order,
  width,
  margin,
  height,
  className,
  columns,
  headBackground,
  headColor,
  loading,
  rowKey,
  totalRecordsInDataBase, // must be sent as a number or you will get error
  dataSource,
  selectionType,
  onSelectionChanged,
  disabledRowsSelection,
  selectionKeys,
  footer,
  footerJustify,
  footerPadding,
  footerGap,
  bodyCellFontSize,
  headCellFontSize,
  onFetchMore,
  onSearchAndFilterTable,
  resetTableFilters,
  expandedRowRender,
  // action column props
  onPressActionIcon,
  actionIcon,
  actionRowDisabled,
  actionLabelId,
  actionColumnWidth,
  onInputChange,
  recordInputsDisabled,
  showEditableInputs,
  onSelectRow,
  onDoubleClick,
  selectedRowBackgroundColor,
  rowClassName,
  rowCellClassName,
  // header tools props
  hideTableHeaderTools,
  onPressSaveOrEdit,
  onPressPrintPdf,
  onPressAdd,
  onPressDelete,
  onPressInfoIcon,
  canInsert,
  canDelete,
  canEdit,
  withInfo,
  withExcel,
  withPdf,
  showSaveIcon,
  selectedRowKey,
  // excel sheet props
  transformDataSourceToExcelSheetDataSet,
  sheetName,
  // aligned Total Cells Props
  useAlignedTotalCells,
  useFloatingLabelsTotalCells,
  rowsPerPage: _rowsPerPage,
  currentPage: _currentPage,
  noPagination: _noPagination,
}: TableProps<T>) => {
  const rowsPerPage = _rowsPerPage || 1;
  const currentPage = _currentPage || 1;
  const noPagination = typeof _noPagination === "undefined" || !!_noPagination;

  const [selectionColumnChecked, setIsSelectionColumnChecked] = useState(false);
  const [clickedRowKey, setClickedRow] = useState<TableSelectionKeysType[0]>();

  const tableColumnsLength = columns?.length ?? 0;
  const [elementRef, rect] = useBoundingClientRect([
    tableColumnsLength,
    loading,
  ]);

  useLayoutEffect(() => {
    if (loading) {
      setClickedRow(undefined);
    }
  }, [loading]);

  useLayoutEffect(() => {
    setClickedRow(selectedRowKey);
  }, [selectedRowKey]);

  const {
    values: searchParamsValues,
    handleChange: handleSearchChange,
    resetForm: resetSearchParams,
    handleChangeMultipleInputs: handleChangeMultipleSearchParam,
  } = useFormManager({
    initialValues: SEARCH_FORM_INITIAL_STATE,
  });

  const dataSourceLength = dataSource.length;
  const containerWidthNumber = rect?.width ?? 200;
  const hasSelectionColumn = !!onSelectionChanged;
  const showExpandColumn = !!expandedRowRender;
  const showActionColumn = !!onPressActionIcon;

  const { doesAnyColumnHasInputType, adjustedColumns } = useMemo(
    () =>
      generateFixedColumns({
        containerWidthNumber,
        columnsFromProps: columns,
        hasSelectionColumn,
        showExpandColumn,
      }),
    [containerWidthNumber, columns, hasSelectionColumn, showExpandColumn]
  );

  const excelSheetProps = useCreateExcelSheet({
    shouldProcessColumnsAndData: !hideTableHeaderTools && withExcel,
    dataSource,
    columns: adjustedColumns,
    transformDataSourceToExcelSheetDataSet,
    sheetName,
    hasActionColumn: showActionColumn,
  });

  const disabledSelectionsKeys = useMemo(() => {
    if (dataSource?.length && disabledRowsSelection) {
      const keys =
        disabledRowsSelection instanceof Function
          ? dataSource.map((row, rowIndex) =>
              disabledRowsSelection(row, rowIndex) ? row[rowKey] : undefined
            )
          : disabledRowsSelection;

      return keys.filter(Boolean);
    }

    return [];
  }, [dataSource, disabledRowsSelection, rowKey]);

  const expandProps = useExpandableTableRows<T>(
    rowKey,
    dataSource,
    showExpandColumn
  );

  const handleRowSelectionChange: TableInternalSelectionChangeActionType =
    useCallback(
      ({ all, key }) =>
        () => {
          const { nextSelectionKeys, nextSelectionRows } =
            createRowSelectionValuesForChangeEvent({
              rowKey,
              dataSource,
              selectionType,
              alreadySelectedKeys: selectionKeys,
              nextSelectionKey: key as TableSelectionKeysType[0],
              isAllSelectionAction: all,
              wasAllSelectionColumnChecked: selectionColumnChecked,
              disabledSelectionKeys: disabledSelectionsKeys,
            });

          if (selectionType !== "radio" && all) {
            setIsSelectionColumnChecked((previous) => !previous);
          }
          onSelectionChanged?.(nextSelectionKeys, nextSelectionRows);
        },
      [
        rowKey,
        dataSource,
        selectionType,
        selectionKeys,
        selectionColumnChecked,
        disabledSelectionsKeys,
        onSelectionChanged,
      ]
    );

  const handlePaginatorChange: OnPaginatorChangedActionType = useCallback(
    (event) => {
      const { sorterOrder, ...apiSearchParams } = searchParamsValues;
      onFetchMore?.({ ...event, searchParams: apiSearchParams });
    },
    [onFetchMore, searchParamsValues]
  );

  const onHeadCellActionFired: HeadCellActionFiredType = useCallback(
    (type, sorterConfig) => () => {
      const isUserSearching = type === "search";
      const isUserSorting = type === "sort";

      const nextSearchParams = {
        ...(sorterConfig || null),
      };

      if (isUserSorting) {
        handleChangeMultipleSearchParam(nextSearchParams);
      }

      const paginationEvent = {
        currentPage: 1,
        rowsPerPage,
      };

      if (isUserSearching || isUserSorting) {
        const { sorterOrder, ...otherParams } = {
          ...searchParamsValues,
          ...nextSearchParams,
        };
        onSearchAndFilterTable?.({
          ...paginationEvent,
          searchParams: otherParams,
        });
        return;
      }

      resetSearchParams();
      resetTableFilters?.(paginationEvent);
    },
    [
      resetTableFilters,
      onSearchAndFilterTable,
      resetSearchParams,
      searchParamsValues,
      handleChangeMultipleSearchParam,
      rowsPerPage,
    ]
  );

  const onRowClick: InternalTableRowClickHandler<T> = useCallback(
    (currentRowKey, currentRecord, recordIndex) => () => {
      setClickedRow(currentRowKey);
      onSelectRow?.(currentRecord, recordIndex);
    },
    [onSelectRow]
  );

  const doesTableHasAnySelectedRecord =
    !!clickedRowKey || !!selectionKeys?.length;

  const byAnyWayUserIsEditing =
    doesTableHasAnySelectedRecord &&
    doesAnyColumnHasInputType &&
    showEditableInputs;

  return (
    <TableContainer
      width={width}
      margin={margin}
      order={order}
      className={className}
      ref={elementRef}
    >
      <LazyLoadedTableDefaultHeaderTools
        shouldMountChunk={!hideTableHeaderTools}
        onPressSaveOrEdit={onPressSaveOrEdit}
        onPressPrintPdf={onPressPrintPdf}
        onPressAdd={onPressAdd}
        onPressDelete={onPressDelete}
        onPressInfoIcon={onPressInfoIcon}
        isEditing={byAnyWayUserIsEditing}
        showSaveIcon={showSaveIcon}
        hasSelectedRow={doesTableHasAnySelectedRecord}
        hasDataSource={!!dataSourceLength}
        canInsert={canInsert}
        canDelete={canDelete}
        canEdit={canEdit}
        withInfo={withInfo}
        withExcel={withExcel}
        withPdf={withPdf}
        excelSheetProps={excelSheetProps}
      />

      <TableContentWrapper height={height}>
        <StyledTable cellSpacing={0}>
          <TableHeader
            columns={adjustedColumns}
            headBackground={headBackground}
            headColor={headColor}
            selectionType={selectionType}
            showSelectionColumn={hasSelectionColumn}
            selectionColumnDisabled={!dataSourceLength}
            handleRowSelectionChange={handleRowSelectionChange}
            selectionColumnChecked={selectionColumnChecked}
            showExpandColumn={showExpandColumn}
            searchParamsValues={searchParamsValues}
            onChange={handleSearchChange}
            onActionFired={onHeadCellActionFired}
            showActionColumn={showActionColumn}
            actionColumnWidth={actionColumnWidth}
            fontSize={headCellFontSize}
          />

          <TableBody<T>
            dataSource={dataSource}
            rowKey={rowKey}
            columns={adjustedColumns}
            selectionType={selectionType}
            showSelectionColumn={hasSelectionColumn}
            selectionKeys={selectionKeys}
            handleRowSelectionChange={handleRowSelectionChange}
            disabledRowsSelection={disabledSelectionsKeys}
            fontSize={bodyCellFontSize}
            expandedRowRender={expandedRowRender}
            onPressActionIcon={onPressActionIcon}
            actionIcon={actionIcon}
            actionRowDisabled={actionRowDisabled}
            actionLabelId={actionLabelId}
            onInputChange={onInputChange}
            recordInputsDisabled={recordInputsDisabled}
            showEditableInputs={showEditableInputs}
            onDoubleClick={onDoubleClick}
            selectedRowBackgroundColor={selectedRowBackgroundColor}
            onRowClick={onRowClick}
            clickedRowKey={clickedRowKey}
            actionColumnWidth={actionColumnWidth}
            rowClassName={rowClassName}
            rowCellClassName={rowCellClassName}
            {...expandProps}
          />

          {!!dataSourceLength && useAlignedTotalCells && (
            <tfoot>
              <LazyLoadedCreateTotalCellsRow
                shouldMountChunk={useAlignedTotalCells}
                dataSource={dataSource}
                columns={adjustedColumns}
                showExpandColumn={showExpandColumn}
                showActionColumn={showActionColumn}
                hasSelectionColumn={hasSelectionColumn}
                actionColumnWidth={actionColumnWidth}
                useFloatingLabelsTotalCells={useFloatingLabelsTotalCells}
                columnsTotals={columnsTotals}
              />
            </tfoot>
          )}
        </StyledTable>

        {(!tableColumnsLength || !dataSourceLength) && (
          <EmptyView>ntd</EmptyView>
        )}
      </TableContentWrapper>

      {!!dataSourceLength && !!footer && (
        <TableFooter
          footerJustify={footerJustify}
          footerPadding={footerPadding}
          footerGap={footerGap}
        >
          {footer(dataSource)}
        </TableFooter>
      )}

      <LazyLoadedPaginator
        shouldMountChunk={!noPagination}
        margin="10px 0"
        totalItems={totalRecordsInDataBase}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onChange={handlePaginatorChange}
        hideOnSinglePage
      />
      {(loading || !tableColumnsLength) && <LoadingOverlay visible />}
    </TableContainer>
  );
};
ExsysTable.defaultProps = TABLE_DEFAULT_PROPS;
// @ts-ignore ignore react
export default memo(ExsysTable) as typeof ExsysTable;
export {
  TABLE_DEFAULT_PROPS,
  TABLE_EDITABLE_CELL_TYPES,
  ACTION_COLUMN_CONTENTS_TYPES,
  ACTION_ICON_NAMES,
};
