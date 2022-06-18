/*
 *
 * Component: `HeadCellRenderer`.
 *
 */
import { memo } from "react";
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";
import Flex from "@exsys-patient-insurance/flex";
import {
  TableRowRecordType,
  TableColumnProps,
} from "@exsys-patient-insurance/types";
import { CellContentWrapper } from "../styled";
import {
  TableHeadSearchDropDownProps,
  SorterOrderType,
} from "../index.interface";

const LazyLoadedSearchDropDown = createLazyLoadedComponent(
  () =>
    import(
      "./SearchDropDown" /* webpackChunkName: `exsys-patient-insurance.exsys-table.search-dropdown` */
    )
);

const LazyLoadedHeadCellSorter = createLazyLoadedComponent(
  () =>
    import(
      "./HeadCellSorter" /* webpackChunkName: `exsys-patient-insurance.exsys-table.head-cell-sorter` */
    )
);

interface HeadCellRendererProps<T extends TableRowRecordType>
  extends TableColumnProps<T>,
    TableHeadSearchDropDownProps {
  sorterOrder?: SorterOrderType;
}

const HeadCellRenderer = <T extends TableRowRecordType>({
  title,
  searchable,
  ellipsis,
  align,
  width,
  dataIndex,
  onActionFired,
  onChange,
  sorter,
  searchValue,
  sorterOrder,
}: HeadCellRendererProps<T>) => {
  if (searchable || sorter) {
    return (
      <CellContentWrapper
        align="start"
        width={width}
        title={ellipsis ? title : ""}
        ellipsis={ellipsis ? "true" : undefined}
        disableTranslation
      >
        <Flex width="85%">
          <CellContentWrapper
            display="block"
            align={align}
            width="100%"
            ellipsis="true"
            padding="0"
          >
            {title}
          </CellContentWrapper>

          <LazyLoadedHeadCellSorter
            shouldMountChunk={!!sorter}
            dataIndex={dataIndex}
            sorterOrder={sorterOrder}
            onSorterChanged={onActionFired}
          />
        </Flex>

        <LazyLoadedSearchDropDown
          shouldMountChunk={!!searchable}
          dataIndex={dataIndex}
          onActionFired={onActionFired}
          onChange={onChange}
          searchValue={searchValue}
        />
      </CellContentWrapper>
    );
  }

  return (
    <CellContentWrapper
      display="block"
      align={align}
      width={width}
      title={ellipsis ? title : ""}
      ellipsis={ellipsis ? "true" : undefined}
    >
      {title}
    </CellContentWrapper>
  );
};

export default memo(HeadCellRenderer) as typeof HeadCellRenderer;
