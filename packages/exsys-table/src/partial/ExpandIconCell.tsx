/*
 *
 * Component: `ExpandIconCell`.
 *
 */
import { memo, useCallback } from "react";
import { TableSelectionKeysType } from "@exsys-patient-insurance/types";
import {
  ExpandIconContainer,
  StyledTableRowCell,
  CellContentWrapper,
} from "../styled";
import { EXPAND_COLUMN_WIDTH } from "../constants";

interface ExpandIconCellProps {
  fontSize?: string;
  expanded?: boolean;
  setExpandedKeys: React.Dispatch<React.SetStateAction<TableSelectionKeysType>>;
  currentRowKey: TableSelectionKeysType[0];
  showExpandIcon?: boolean;
}

const ExpandIconCell = ({
  fontSize,
  expanded,
  currentRowKey,
  setExpandedKeys,
  showExpandIcon,
}: ExpandIconCellProps) => {
  const handleClick = useCallback(() => {
    setExpandedKeys((previousSelecetedKeys) => {
      return (
        expanded
          ? (previousSelecetedKeys as []).filter((key) => key !== currentRowKey)
          : [...previousSelecetedKeys, currentRowKey]
      ) as TableSelectionKeysType;
    });
  }, [expanded, currentRowKey, setExpandedKeys]);

  if (!showExpandIcon) {
    return (
      <StyledTableRowCell fontSize={fontSize} width={EXPAND_COLUMN_WIDTH} />
    );
  }

  return (
    <StyledTableRowCell width={EXPAND_COLUMN_WIDTH} fontSize={fontSize}>
      <CellContentWrapper
        disableTranslation
        align="center"
        width={EXPAND_COLUMN_WIDTH}
      >
        <ExpandIconContainer onClick={handleClick}>
          {expanded ? "-" : "+"}
        </ExpandIconContainer>
      </CellContentWrapper>
    </StyledTableRowCell>
  );
};

export default memo(ExpandIconCell);
