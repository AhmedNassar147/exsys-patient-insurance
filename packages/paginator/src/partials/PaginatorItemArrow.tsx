/*
 *
 * Component: `PaginatorItemArrow`.
 *
 */
import { memo } from "react";
import ArrowIcon from "@exsys-patient-insurance/arrow-icon";
import { PaginatorItem } from "../styled";

interface PaginatorItemArrowProps {
  direction: "left" | "right";
  disabled?: boolean;
  doubledArrows?: boolean;
  onClick?: () => void;
}

const PaginatorItemArrow = ({
  direction,
  disabled,
  doubledArrows,
  onClick,
}: PaginatorItemArrowProps) => {
  const arrowWidth = doubledArrows ? "0.67em" : "0.85em";
  const arrowHeight = doubledArrows ? "0.84em" : "0.9em";

  const arrowProps = {
    direction,
    width: arrowWidth,
    height: arrowHeight,
    color: "currentColor",
    keepDirection: true,
  };

  return (
    <PaginatorItem disabled={disabled} onClick={disabled ? undefined : onClick}>
      <ArrowIcon {...arrowProps} />
      {doubledArrows && <ArrowIcon {...arrowProps} />}
    </PaginatorItem>
  );
};

export default memo(PaginatorItemArrow);
