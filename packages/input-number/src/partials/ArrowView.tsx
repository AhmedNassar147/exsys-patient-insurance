/*
 *
 * Component: `ArrowView`.
 *
 */
import { memo } from "react";
import ArrowIcon from "@exsys-patient-insurance/arrow-icon";
import { ArrowWrapper } from "../styled";

interface ArrowViewProps {
  onClick: () => void;
  disabled?: boolean;
  direction: "up" | "down";
}

const ArrowView = ({ onClick, disabled, direction }: ArrowViewProps) => (
  <ArrowWrapper disabled={disabled} onClick={disabled ? undefined : onClick}>
    <ArrowIcon
      disabled={disabled}
      direction={direction}
      width="0.7em"
      height="0.7em"
    />
  </ArrowWrapper>
);

export default memo(ArrowView);
