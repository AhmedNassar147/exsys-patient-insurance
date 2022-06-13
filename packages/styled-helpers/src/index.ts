/*
 *
 * Package: `@exsys-patient-insurance/styled-helpers`.
 *
 */
import { css } from "styled-components";
import {
  fontSizes,
  colors,
  spacings,
} from "@exsys-patient-insurance/theme-values";
import type {
  TextFontSizeProps,
  EllipsisCssHelperProps,
} from "@exsys-patient-insurance/types";

interface DisabledCssHelperProps {
  disabled?: boolean;
}

type FlexProps = {
  justify?: string;
  align?: string;
};

export const fontSizeCssHelper = css<TextFontSizeProps>`
  font-size: ${({ fontSize }) => fontSizes[fontSize || "ff9"]};
`;

const disabledCss = css`
  cursor: not-allowed !important;
  color: rgba(0, 0, 0, 0.6) !important;
`;

export const disabledBackgroundCss = css`
  ${disabledCss};
  background-color: rgba(0, 0, 0, 0.03) !important;
`;

export const disabledCssHelper = css<DisabledCssHelperProps>`
  ${({ disabled }) => disabled && disabledCss}
`;

export const ellipsisCss = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const ellipsisCssHelper = css<EllipsisCssHelperProps>`
  ${({ ellipsis }) => ellipsis === "true" && ellipsisCss}
`;

export const flexCenteredRowCss = css<FlexProps>`
  display: flex;
  ${({ justify, align }) => `
    justify-content: ${justify || "center"};
    align-items: ${align || "center"};
  `}
`;

export const flexCenteredColumnCss = css<FlexProps>`
  ${flexCenteredRowCss};
  flex-direction: column;
`;

export const customScrollbar = css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 80%;
    background: ${colors.grey3};
    border-radius: ${spacings.sp2};
  }
`;
