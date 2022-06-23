/*
 *
 * Package: `@exsys-patient-insurance/exsys-table`.
 *
 */
import { memo, useMemo, useState, useCallback } from "react";
import LoadingOverlay from "@exsys-patient-insurance/overlay";
import {
  useBoundingClientRect,
  useCurrentPagePrivileges,
} from "@exsys-patient-insurance/hooks";
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";
import useFormManager from "@exsys-patient-insurance/form-manager";
import {
  usePaginatorState,
  OnPaginatorChangedActionType,
} from "@exsys-patient-insurance/paginator";
import {
  TableRowRecordType,
  TableProps,
  TableSelectionKeysType,
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
  dataSource: dataSourceFromProps,
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
  noPagination,
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
  // excel sheet props
  transformDataSourceToExcelSheetDataSet,
  sheetName,
  // aligned Total Cells Props
  useAlignedTotalCells,
  useFloatingLabelsTotalCells,
}: TableProps<T>) => {
  const [selectionColumnChecked, setIsSelectionColumnChecked] = useState(false);
  const [clickedRowKey, setClickedRow] = useState<TableSelectionKeysType[0]>();

  const paginatorHidden = noPagination || totalRecordsInDataBase <= 5;

  const { currentPage, rowsPerPage, setPaginationState } = usePaginatorState(
    totalRecordsInDataBase,
    noPagination
  );

  const tableColumnsLength = columns?.length ?? 0;
  const [elementRef, rect] = useBoundingClientRect([tableColumnsLength]);

  const {
    values: searchParamsValues,
    handleChange: handleSearchChange,
    resetForm: resetSearchParams,
    handleChangeMultipleInputs: handleChangeMultipleSearchParam,
  } = useFormManager({
    initialValues: SEARCH_FORM_INITIAL_STATE,
  });

  const dataSource = useMemo(() => {
    if (!dataSourceFromProps?.length) {
      return [];
    }

    if (paginatorHidden) {
      return dataSourceFromProps;
    }

    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    return dataSourceFromProps.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, rowsPerPage, dataSourceFromProps, paginatorHidden]);

  const dataSourceFromPropsLength = dataSourceFromProps?.length ?? 0;
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
    dataSource: dataSourceFromProps,
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
      const { currentPage, rowsPerPage } = event;

      const indexOfLastItem = currentPage * rowsPerPage;

      if (
        !paginatorHidden &&
        indexOfLastItem > dataSourceFromPropsLength &&
        indexOfLastItem <= totalRecordsInDataBase
      ) {
        const { sorterOrder, ...apiSearchParams } = searchParamsValues;
        onFetchMore?.(dataSourceFromPropsLength, apiSearchParams);
      }

      setPaginationState(() => event);
    },
    [
      paginatorHidden,
      dataSourceFromPropsLength,
      totalRecordsInDataBase,
      setPaginationState,
      onFetchMore,
      searchParamsValues,
    ]
  );

  const onHeadCellActionFired: HeadCellActionFiredType = useCallback(
    (type, sorterConfig) => () => {
      const isUserSearching = type === "search";
      const isUserSorting = type === "sort";

      setPaginationState((previous) => ({
        ...previous,
        currentPage: 1,
      }));

      const nextSearchParams = sorterConfig || {};

      if (isUserSorting) {
        handleChangeMultipleSearchParam(nextSearchParams);
      }

      if (isUserSearching || isUserSorting) {
        const { sorterOrder, ...otherParams } = {
          ...searchParamsValues,
          ...nextSearchParams,
        };
        // @ts-ignore it always be a record but we need to extract the `sorterOrder` from params.
        onSearchAndFilterTable?.(otherParams);
        return;
      }

      resetSearchParams();
      resetTableFilters?.();
    },
    [
      resetTableFilters,
      onSearchAndFilterTable,
      resetSearchParams,
      searchParamsValues,
      setPaginationState,
      handleChangeMultipleSearchParam,
    ]
  );

  const onRowClick: InternalTableRowClickHandler<T> = useCallback(
    (currentRowKey, currentRecord, recordIndex) => () => {
      setClickedRow(currentRowKey);
      onSelectRow?.(currentRecord, recordIndex);
    },
    [onSelectRow]
  );

  const { f_update, f_insert, f_delete } = useCurrentPagePrivileges();

  const canUserEdit = canEdit || f_update !== "N";
  const canUserInsert = canInsert || f_insert !== "N";
  const canUserDelete = canDelete || f_delete !== "N";

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
        hasDataSource={!!dataSourceFromProps?.length}
        canInsert={canUserInsert}
        canDelete={canUserDelete}
        canEdit={canUserEdit}
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
            {...expandProps}
          />

          {!!dataSourceFromPropsLength && useAlignedTotalCells && (
            <tfoot>
              <LazyLoadedCreateTotalCellsRow
                shouldMountChunk={useAlignedTotalCells}
                dataSource={dataSourceFromProps}
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

      {!!dataSourceFromPropsLength && !!footer && (
        <TableFooter
          footerJustify={footerJustify}
          footerPadding={footerPadding}
          footerGap={footerGap}
        >
          {footer(dataSourceFromProps)}
        </TableFooter>
      )}

      <LazyLoadedPaginator
        shouldMountChunk={!paginatorHidden}
        margin="10px 0"
        totalItems={totalRecordsInDataBase}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onChange={handlePaginatorChange}
        showQuickJumper
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
