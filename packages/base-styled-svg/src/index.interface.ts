/*
 *
 * Types: `@exsys-patient-insurance/base-styled-svg`.
 *
 */
import { BaseSvgProps } from "@exsys-patient-insurance/types";

export interface BaseStyledSvgProps extends Omit<BaseSvgProps, "style"> {
  disabled?: boolean;
  stroke?: string;
  strokeWidth?: string;
  strokeInColor?: boolean;
  marginInlineStart?: string;
  marginInlineEnd?: string;
  margin?: string;
  alignSelf?: string;
  viewBox?: string;
  transform?: string;
  circled?: boolean;
  useDisabledColor?: boolean;
  title?: string;
}

export interface BaseStyledSvgPropsChildren
  extends BaseStyledSvgProps,
    React.PropsWithChildren<{
      enableBackground?: string;
      x?: string;
      y?: string;
      xmlSpace?: string;
    }> {}
