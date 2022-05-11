/*
 *
 * Styled: `@exsys-clinio/text`.
 *
 */
import { css } from "styled-components";
import {
  ellipsisCssHelper,
  fontSizeCssHelper,
} from "@exsys-clinio/styled-helpers";
import { TextPropsStyleSheet } from "./index.interface";

const colonCss = css`
  &:after {
    content: " : ";
  }
`;

const maxLinesCss = css<TextPropsStyleSheet>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const textStyleCss = css<TextPropsStyleSheet>`
  text-align: ${({ align }) => align || "-webkit-auto"};
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  ${({ width }) => width && `width: ${width}`};
  ${({ flex }) => flex && `flex: ${flex}`};
  ${({ cursor }) => cursor && `cursor: ${cursor}`};
  ${({ lineheight }) => lineheight && `line-height: ${lineheight}`};
  font-weight: ${({ weight }) => weight || "bold"};
  ${fontSizeCssHelper};
  ${({ colon }) => !!colon && colonCss};
  ${ellipsisCssHelper};
  ${({ indent }) => indent && `text-indent: ${indent}`};
  ${({ lines }) => lines && maxLinesCss}
`;

export default textStyleCss;
