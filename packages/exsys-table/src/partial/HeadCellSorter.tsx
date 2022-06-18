/*
 *
 * Component: `HeadCellSorter`.
 *
 */
import { memo, useCallback } from "react";
import ArrowIcon from "@exsys-patient-insurance/arrow-icon";
import { colors } from "@exsys-patient-insurance/theme-values";
import { SorterContainer } from "../styled";
import { SORTER_ARROW_PROPS, SORTER_ORDERS } from "../constants";
import { HeadCellSorterProps } from "../index.interface";

const { orange } = colors;
const DEFAULT_ARROW_COLOR = "currentColor";

interface internalSorterProps extends HeadCellSorterProps {
  dataIndex: string;
}

const HeadCellSorter = ({
  dataIndex,
  sorterOrder,
  onSorterChanged,
}: internalSorterProps) => {
  const isAscending = sorterOrder === SORTER_ORDERS.ASC;
  const isDescending = sorterOrder === SORTER_ORDERS.DESC;

  const onClick = useCallback(() => {
    const orderValue =
      sorterOrder === SORTER_ORDERS.ASC
        ? SORTER_ORDERS.DESC
        : SORTER_ORDERS.ASC;

    onSorterChanged("sort", {
      sorterOrder: orderValue,
      orderby: `${dataIndex}, ${orderValue}`,
    })();
  }, [dataIndex, onSorterChanged, sorterOrder]);

  return (
    <SorterContainer title="sort" onClick={onClick}>
      <ArrowIcon
        direction="up"
        {...SORTER_ARROW_PROPS}
        color={isAscending ? orange : DEFAULT_ARROW_COLOR}
      />
      <ArrowIcon
        direction="down"
        {...SORTER_ARROW_PROPS}
        color={isDescending ? orange : DEFAULT_ARROW_COLOR}
      />
    </SorterContainer>
  );
};

export default memo(HeadCellSorter);
