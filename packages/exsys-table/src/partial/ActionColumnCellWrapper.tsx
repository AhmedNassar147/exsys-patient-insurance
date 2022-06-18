/*
 *
 * Component: `ActionColumnCellWrapper`.
 *
 */
import { ColorNamesType } from "@exsys-patient-insurance/types";
import { StyledTableRowCell, CellContentWrapper } from "../styled";
import { ACTION_COLUMN_WIDTH } from "../constants";

interface ActionColumnCellWrapperProps
  extends React.PropsWithChildren<{
    headBackground?: ColorNamesType;
    fontSize?: string;
    isHeadCell?: boolean;
    onClick?: () => void;
    title?: string;
    disabled?: boolean;
    actionColumnWidth?: number;
  }> {}

const ActionColumnCellWrapper = ({
  onClick,
  headBackground,
  fontSize,
  children,
  isHeadCell,
  title,
  disabled,
  actionColumnWidth,
}: ActionColumnCellWrapperProps) => {
  const width = actionColumnWidth || ACTION_COLUMN_WIDTH;

  return (
    <StyledTableRowCell
      isHeadCell={isHeadCell}
      width={width}
      headBackground={headBackground}
      fontSize={fontSize}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      <CellContentWrapper
        display={isHeadCell ? "block" : "flex"}
        align="center"
        width={width}
        ellipsis="true"
        fontSize={fontSize}
        disableTranslation={typeof children !== "string"}
      >
        {children}
      </CellContentWrapper>
    </StyledTableRowCell>
  );
};
ActionColumnCellWrapper.defaultProps = {
  children: "action",
};

export default ActionColumnCellWrapper;
