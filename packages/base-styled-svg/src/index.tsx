/*
 *
 * Package: `@exsys-patient-insurance/base-styled-svg`.
 *
 */
import { Fragment } from "react";
import StyledSvg, { Circle } from "./styled";
import { BaseStyledSvgPropsChildren } from "./index.interface";

const BaseStyledSvg = ({
  disabled,
  onClick,
  viewBox,
  children,
  circled,
  width,
  height,
  color,
  useDisabledColor,
  ...props
}: BaseStyledSvgPropsChildren) => {
  const Wrapper = circled ? Circle : Fragment;
  const WrapperProps = circled
    ? {
        width,
        height,
        color,
        disabled,
        useDisabledColor,
      }
    : null;

  return (
    <Wrapper {...WrapperProps}>
      <StyledSvg
        viewBox={viewBox}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        width={width}
        height={height}
        color={color}
        useDisabledColor={useDisabledColor}
        {...props}
      >
        {children}
      </StyledSvg>
    </Wrapper>
  );
};
BaseStyledSvg.defaultProps = {
  "aria-hidden": true,
  viewBox: "64 64 896 896",
  color: "currentcolor",
  width: "1em",
  height: "1em",
};

export default BaseStyledSvg;
export type { BaseStyledSvgProps } from "./index.interface";
