/*
 *
 * Styled: `@exsys-clinio/tag`.
 *
 */
import styled from "styled-components";
import { flexCenteredRowCss, ellipsisCss } from "@exsys-clinio/styled-helpers";
import { colors, fontSizes } from "@exsys-clinio/theme-values";
import TagProps from "./index.interface";

const { inputBorderColor, white2 } = colors;

export const TagWrapper = styled.span<TagProps>`
  ${flexCenteredRowCss};
  display: inline-flex;
  padding: 0 4px;
  font-size: ${fontSizes.ff9};
  border-radius: 3px;
  cursor: default;
  opacity: 1;
  background-color: ${white2};
  gap: 4px;
  ${ellipsisCss};
  background-clip: padding-box;
  -webkit-background-clip: padding-box;
  height: ${({ height }) => height || "auto"};
  line-height: 1.5;
  ${({ color, margin }) => `
    margin: ${margin};
    color: ${color};
    border: 1px solid ${color || inputBorderColor};
  `};
  cursor: default;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
`;
