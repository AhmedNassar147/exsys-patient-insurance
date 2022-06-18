/*
 *
 * Component: `MapCellChildren`.
 *
 */
import { memo, useCallback, Children } from "react";
import {
  TableRowRecordType,
  RecordType,
  TableCellAlignment,
  TableColumnProps,
} from "@exsys-patient-insurance/types";
import HeadCellRenderer from "./HeadCellRenderer";
import BodyCellRenderer from "./BodyCellRenderer";
import { CellContentWrapper, NestedCellsContainer } from "../styled";
import {
  TableHeadSearchDropDownProps,
  SorterOrderType,
  InternalBaseBodyCellRendererProps,
} from "../index.interface";

interface NestedCellProps
  extends Omit<TableHeadSearchDropDownProps, "dataIndex" | "searchValue"> {
  sorterOrder?: SorterOrderType;
  searchParamsValues: RecordType;
}

interface MapCellChildrenProps<T extends TableRowRecordType> {
  nestedColumns: TableColumnProps<T>[];
  baseCellAlignment?: TableCellAlignment;
  baseCellKey: string;
  baseCellProps?: InternalBaseBodyCellRendererProps<T> | NestedCellProps;
  isBodyCells?: boolean;
}

const MapCellChildren = <T extends TableRowRecordType>({
  nestedColumns,
  baseCellAlignment,
  baseCellKey,
  baseCellProps,
  isBodyCells,
}: MapCellChildrenProps<T>) => {
  const renderNestedCells = useCallback(
    (nestedCellsMap: TableColumnProps<T>[]) => {
      let elementsGroup: JSX.Element[] = [];

      for (const cellProps of nestedCellsMap) {
        const { width, align: childAlign, dataIndex, children } = cellProps;
        const hasMoreNestedChildren = !!children && !!children.length;

        const computedCellProps = {
          ...cellProps,
          align: childAlign || baseCellAlignment,
          width: "100%",
        };

        elementsGroup.push(
          <CellContentWrapper
            key={`${baseCellKey}-${dataIndex}`}
            display={isBodyCells || !hasMoreNestedChildren ? "flex" : "block"}
            align={computedCellProps.align}
            width={width}
            padding="0"
            useInlineEndBorder
            minHeight="28px"
          >
            {isBodyCells ? (
              !hasMoreNestedChildren ? (
                <BodyCellRenderer<T>
                  cellProps={computedCellProps}
                  {...((baseCellProps ||
                    null) as InternalBaseBodyCellRendererProps<T>)}
                />
              ) : null
            ) : (
              <HeadCellRenderer
                {...computedCellProps}
                searchValue={
                  (baseCellProps as NestedCellProps)?.searchParamsValues?.[
                    dataIndex
                  ]
                }
                {...((baseCellProps || null) as NestedCellProps)}
              />
            )}

            {hasMoreNestedChildren && (
              <NestedCellsContainer noBorder={isBodyCells}>
                {renderNestedCells(children as TableColumnProps<T>[])}
              </NestedCellsContainer>
            )}
          </CellContentWrapper>
        );
      }

      return Children.toArray(elementsGroup);
    },
    [baseCellAlignment, baseCellKey, baseCellProps, isBodyCells]
  );

  if (!nestedColumns || !nestedColumns.length) {
    return null;
  }

  return (
    <NestedCellsContainer wrap="true" noBorder={isBodyCells}>
      {renderNestedCells(nestedColumns)}
    </NestedCellsContainer>
  );
};

export default memo(MapCellChildren) as typeof MapCellChildren;
