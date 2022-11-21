/*
 *
 * Component: `BodyCellRenderer`.
 *
 */
import { memo } from "react";
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";
import {
  TableRowRecordType,
  TableColumnProps,
} from "@exsys-patient-insurance/types";
import { CellContentWrapper } from "../styled";
import { InternalBaseBodyCellRendererProps } from "../index.interface";

const LazyLoadedInputsNode = createLazyLoadedComponent(
  () =>
    import(
      "./BodyCellInputNode" /* webpackChunkName: "exsys-patient-insurance.exsys-table.input-node" */
    )
);

interface InternalBodyCellRendererProps<T extends TableRowRecordType>
  extends InternalBaseBodyCellRendererProps<T> {
  cellProps: TableColumnProps<T>;
}

const BodyCellRenderer = <T extends TableRowRecordType>({
  currentRecordIndex,
  currentRecord,
  showEditableInputs,
  onInputChange,
  recordInputsDisabled,
  cellProps: {
    render,
    dataIndex,
    width,
    ellipsis,
    align,
    inputProps,
    valueFixedBy,
    titleDataIndex,
  },
}: InternalBodyCellRendererProps<T>) => {
  const valueOfDataIndex = currentRecord[dataIndex];
  const actualValue =
    typeof valueOfDataIndex === "number"
      ? valueOfDataIndex
      : valueOfDataIndex || "";
  const shouldLoadLazyLoadedInput = !!(
    showEditableInputs && inputProps?.inputType
  );

  const cellBodyValue =
    !shouldLoadLazyLoadedInput &&
    (render
      ? render?.(actualValue, currentRecord, currentRecordIndex)
      : actualValue);

  const hasFixedByValue = typeof valueFixedBy === "number";
  const cellTitle = titleDataIndex ? currentRecord[titleDataIndex] : undefined;

  return (
    <CellContentWrapper
      align={align}
      width={width}
      ellipsis={ellipsis ? "true" : undefined}
      title={cellTitle}
      disableTranslation
    >
      <LazyLoadedInputsNode
        shouldMountChunk={shouldLoadLazyLoadedInput}
        inputProps={inputProps}
        dataIndex={dataIndex}
        currentRecord={currentRecord}
        rowIndex={currentRecordIndex}
        onInputChange={onInputChange}
        recordInputsDisabled={recordInputsDisabled}
      />

      {typeof cellBodyValue === "number" && hasFixedByValue
        ? cellBodyValue.toFixed(valueFixedBy)
        : cellBodyValue}
    </CellContentWrapper>
  );
};

export default memo(BodyCellRenderer) as typeof BodyCellRenderer;
