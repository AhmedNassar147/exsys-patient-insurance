/*
 *
 * Component: `SelectionView`.
 *
 */
import { memo } from "react";
import SelectedCheck from "@exsys-patient-insurance/selection-check";
import {
  TableSelectionType,
  ColorNamesType,
} from "@exsys-patient-insurance/types";
import { CellContentWrapper, StyledTableRowCell } from "../styled";
import { SELECTION_COLUMN_WIDTH } from "../constants";

interface SelectionViewProps {
  checked?: boolean;
  onCheck?: () => void;
  type?: TableSelectionType;
  disabled?: boolean;
  headBackground?: ColorNamesType;
  isHeadCell?: boolean;
  fontSize?: string;
}

const SelectionView = ({
  headBackground,
  isHeadCell,
  checked,
  onCheck,
  type,
  disabled,
  fontSize,
}: SelectionViewProps) => {
  const selectionHidden = !!(type === "radio" && isHeadCell);

  return (
    <StyledTableRowCell
      headBackground={headBackground}
      isHeadCell={isHeadCell}
      width={SELECTION_COLUMN_WIDTH}
      fontSize={fontSize}
    >
      <CellContentWrapper
        align="center"
        width={SELECTION_COLUMN_WIDTH}
        disableTranslation
      >
        {!selectionHidden && (
          <SelectedCheck
            wrapperMarginEnd="0"
            mode={type}
            checked={checked}
            onChange={onCheck}
            disabled={disabled}
          />
        )}
      </CellContentWrapper>
    </StyledTableRowCell>
  );
};

export default memo(SelectionView);
