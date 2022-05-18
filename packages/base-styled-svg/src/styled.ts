/*
 *
 * Styled: `@exsys-clinio/base-styled-svg`.
 *
 */
import styled from "styled-components";
import { colors } from "@exsys-clinio/theme-values";
import { BaseStyledSvgProps } from "./index.interface";

export const Circle = styled.section<BaseStyledSvgProps>`
  ${({ width, height, color, disabled, useDisabledColor }) => `
    cursor: pointer;
    width: calc(${width} + 1px);
    height: calc(${height} + 1px);
    border: 2px solid ${color};
    padding: 2px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    ${
      disabled &&
      `
      pointer-events: none;
      cursor: not-allowed;
      ${
        useDisabledColor &&
        `
        border-color: ${colors.disabledTextColor};
      `
      }
    `
    };
  `};
`;

const StyledSvg = styled.svg<BaseStyledSvgProps>`
  ${({
    margin,
    marginInlineStart,
    marginInlineEnd,
    alignSelf,
    width,
    height,
    color,
    stroke,
    strokeInColor,
    strokeWidth,
    transform,
  }) => `
    cursor: pointer;
    width: ${width};
    height: ${height};
    ${color && `fill: ${color}`};
    ${
      stroke || strokeInColor ? `stroke: ${strokeInColor ? color : stroke}` : ""
    };
    ${strokeWidth ? `stroke-width: ${strokeWidth}` : ""};
    ${alignSelf ? `align-self: ${alignSelf}` : ""};
    ${margin ? `margin: ${margin}` : ""};
    ${marginInlineStart ? `margin-inline-start: ${marginInlineStart}` : ""};
    ${marginInlineEnd ? `margin-inline-end: ${marginInlineEnd}` : ""};
    ${transform ? `transform: ${transform}` : ""};
  `};
  ${({ disabled, useDisabledColor }) =>
    disabled &&
    `
    pointer-events: none;
    cursor: not-allowed;
    ${
      useDisabledColor &&
      `
      fill: ${colors.disabledTextColor};
    `
    }
  `};
  transition: all 0.2s ease-in-out;
`;

export default StyledSvg;
