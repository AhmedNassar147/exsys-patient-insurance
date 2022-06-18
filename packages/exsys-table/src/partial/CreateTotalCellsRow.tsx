/*
 *
 * Component: `CreateTotalCellsRow`.
 *
 */
import { memo, useCallback } from "react";
import Flex from "@exsys-patient-insurance/flex";
import { calculateTotalValueFromArrayObjectProp } from "@exsys-patient-insurance/helpers";
import {
  TableRowRecordType,
  TableColumnProps,
  TableAlignTotalCellsPropType,
  TableColumnsTotalsType,
} from "@exsys-patient-insurance/types";
import {
  ExpandedRow,
  StyledTableRowCell,
  LabeledViewLikeInputForTotalCell,
  FlexForTotalCell,
} from "../styled";
import { SELECTION_COLUMN_WIDTH, EXPAND_COLUMN_WIDTH } from "../constants";

interface CreateTotalCellsRowProps<T extends TableRowRecordType>
  extends Omit<TableAlignTotalCellsPropType, "useAlignedTotalCells"> {
  dataSource: T[];
  columns: TableColumnProps<T>[];
  showExpandColumn?: boolean;
  hasSelectionColumn?: boolean;
  showActionColumn?: boolean;
  actionColumnWidth?: number;
  columnsTotals?: TableColumnsTotalsType;
}

// export type RenderValueFromPastCellsTotalsType = {
//   [x in string]: number;
// };

const CreateTotalCellsRow = <T extends TableRowRecordType>({
  dataSource,
  columns,
  useFloatingLabelsTotalCells,
  showExpandColumn,
  hasSelectionColumn,
  showActionColumn,
  actionColumnWidth,
  columnsTotals,
}: CreateTotalCellsRowProps<T>) => {
  // const previousTotals = useRef<RenderValueFromPastCellsTotalsType>({});

  const CellFlex = (
    useFloatingLabelsTotalCells
      ? LabeledViewLikeInputForTotalCell
      : FlexForTotalCell
  ) as React.ElementType;

  const createTotalCells = useCallback(
    (cols: TableColumnProps<T>[], isChildCell?: boolean) => {
      return cols.map(
        ({
          dataIndex,
          width,
          totalCellProps,
          title: baseCellTitle,
          children,
        }) => {
          const { title: totalCellTitle, isFragment } = totalCellProps || {};
          // let currentTotalValue = renderValueFromPastCellsTotals
          // ? renderValueFromPastCellsTotals(previousTotals.current)
          // : calculateTotalValueFromArrayObjectProp(dataIndex, dataSource);

          const hasTotalColumns = !!columnsTotals;

          let currentTotalValue = isFragment
            ? 0
            : hasTotalColumns
            ? (columnsTotals as TableColumnsTotalsType)[dataIndex]
            : calculateTotalValueFromArrayObjectProp(dataIndex, dataSource);

          currentTotalValue = +(currentTotalValue || 0).toFixed(2);

          const celFlexProps = useFloatingLabelsTotalCells
            ? {
                value: currentTotalValue,
                label: totalCellTitle || baseCellTitle,
              }
            : null;

          const cellElementProps = {
            width: "100%",
            height: "30px",
            bordered: false,
            justify: "center",
            lineheight: "33px",
            padding: "0px",
            margin: "0px",
            ...celFlexProps,
          };

          if (isChildCell) {
            return (
              <CellFlex {...cellElementProps} width={width} endBordered>
                {currentTotalValue}
              </CellFlex>
            );
          }

          return (
            <StyledTableRowCell key={dataIndex} width={width} isHeadCell>
              {!isFragment && (
                <CellFlex {...cellElementProps}>{currentTotalValue}</CellFlex>
              )}

              {!!children?.length && (
                <Flex width="100%">{createTotalCells(children, true)}</Flex>
              )}
            </StyledTableRowCell>
          );
        }
      );
    },
    [columnsTotals, dataSource, useFloatingLabelsTotalCells]
  );

  if (!columns?.length || !dataSource?.length) {
    return null;
  }

  return (
    <ExpandedRow>
      {hasSelectionColumn && (
        <StyledTableRowCell width={SELECTION_COLUMN_WIDTH} />
      )}
      {showExpandColumn && <StyledTableRowCell width={EXPAND_COLUMN_WIDTH} />}
      {createTotalCells(columns)}
      {showActionColumn && <StyledTableRowCell width={actionColumnWidth} />}
    </ExpandedRow>
  );
};

export default memo(CreateTotalCellsRow);
