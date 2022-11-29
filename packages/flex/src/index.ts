/*
 *
 * Packages: `@exsys-patient-insurance/flex`.
 *
 */
import styled from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";
import {
  ellipsisCssHelper,
  fontSizeCssHelper,
} from "@exsys-patient-insurance/styled-helpers";
import type {
  EllipsisCssHelperProps,
  ColorsType,
  TextFontSizeProps,
} from "@exsys-patient-insurance/types";

type StringBool = "true" | "";

export interface FlexProps extends EllipsisCssHelperProps, TextFontSizeProps {
  column?: StringBool;
  wrap?: StringBool;
  reverse?: boolean;
  justify?: string;
  align?: string;
  height?: string;
  minHeight?: string;
  alignSelf?: string;
  margin?: string;
  marginInLineEnd?: string;
  paddingInLineStart?: string;
  width?: string;
  lineheight?: string;
  minWidth?: string;
  maxWidth?: string;
  padding?: string;
  borderBottom?: boolean;
  overflow?: string;
  backgroundColor?: string;
  gap?: string;
  flex?: number | string;
  bordered?: boolean;
  dashed?: boolean;
  inlined?: boolean;
  borderColor?: ColorsType;
  order?: number;
  maxHeight?: string;
  cursor?: string;
  color?: ColorsType;
  fontWeight?: string;
}

const { grey4 } = colors;

export default styled.div<FlexProps>`
  font-family: Roboto;
  display: ${({ inlined }) => (inlined ? "inline-flex" : "flex")};
  flex-direction: ${({ column, reverse }) =>
    column
      ? reverse
        ? "column-reverse"
        : "column"
      : reverse
      ? "row-reverse"
      : "row"};
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ align }) => align && `align-items: ${align}`};
  ${({ minHeight }) => minHeight && `min-height: ${minHeight}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}`};
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf}`};
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ marginInLineEnd }) =>
    marginInLineEnd && `margin-inline-end: ${marginInLineEnd}`};
  ${({ paddingInLineStart }) =>
    paddingInLineStart && `padding-inline-start: ${paddingInLineStart}`};
  ${({ lineheight }) => lineheight && `line-height: ${lineheight}`};
  ${({ width }) => width && `width: ${width}`};
  ${({ minWidth }) => minWidth && `min-width: ${minWidth}`};
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}`};
  ${({ padding }) => padding && `padding: ${padding}`};
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight}`};
  border-bottom: ${({ borderBottom }) =>
    borderBottom ? `solid 1px ${grey4}` : "none"};
  overflow: ${({ overflow }) => overflow};
  flex-wrap: ${({ wrap }) => (wrap === "true" ? "wrap" : "nowrap")};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "transparent"};
  ${({ gap }) => gap && `gap: ${gap}`};
  ${({ order }) => order && `order: ${order}`};
  ${({ flex }) => flex && `flex: ${flex}`};
  ${({ bordered, dashed }) =>
    bordered &&
    `
    border: 1px ${dashed ? "dashed" : "solid"} ${grey4};
    border-radius: 4px;
  `};
  ${({ borderColor }) =>
    borderColor &&
    `
    border-color: ${colors[borderColor]};
  `};
  ${({ color }) =>
    color &&
    `
    color: ${colors[color]};
  `};
  ${({ cursor }) =>
    cursor &&
    `
    cursor: ${cursor};
  `};
  ${ellipsisCssHelper};
  ${fontSizeCssHelper};
`;
