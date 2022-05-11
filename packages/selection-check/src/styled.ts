/*
 *
 * Styled: `@exsys-clinio/selection-check`.
 *
 */
import styled, { css } from "styled-components";
import { colors, fontSizes } from "@exsys-clinio/theme-values";
import {
  flexCenteredRowCss,
  disabledBackgroundCss,
  disabledCssHelper,
  ellipsisCss,
} from "@exsys-clinio/styled-helpers";
import { BaseSelectionCheckProps } from "@exsys-clinio/types";

const { inputLabelColor, white, inputBorderColor, appPrimary } = colors;
const { ff8: mediumFont } = fontSizes;

const radioBorderMode = css<BaseSelectionCheckProps>`
  ${({ mode }) =>
    mode === "radio" &&
    `
    border-radius: 50%;
  `};
`;

const radioCheckMarkCss = css<BaseSelectionCheckProps>`
  background-color: ${({ checked }) => (checked ? appPrimary : white)};
  opacity: 1;
  width: 8px;
  ${radioBorderMode};
  ${({ disabled }) => disabled && disabledBackgroundCss}
`;

const checkBoxMarkCss = css<BaseSelectionCheckProps>`
  transform: rotate(45deg);
  width: 4px;
  ${({ checked }) =>
    checked &&
    `
    border-bottom: 2px solid ${white};
    border-right: 2px solid ${white};
    opacity: 1;
  `};
`;

export const SelectedContainer = styled.label<BaseSelectionCheckProps>`
  z-index: 1;
  color: ${inputLabelColor};
  font-size: ${mediumFont};
  display: ${({ block }) => (block === "true" ? "block" : "inline-block")};
  ${({ width }) => (width ? `width: ${width}` : "")};
  cursor: pointer;
  ${flexCenteredRowCss};
  justify-content: flex-start;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  ${ellipsisCss};
  overflow: ${({ overflow }) => overflow};
  ${disabledCssHelper};
  ${({ height }) =>
    height &&
    `
    height: ${height};
    line-height: ${height};
  `}
  ${({ margin }) =>
    margin &&
    `
    margin: ${margin};
  `}
`;

export const CheckWrapper = styled.span<BaseSelectionCheckProps>`
  position: relative;
  min-width: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  background-color: ${white};
  border: 1px solid ${inputBorderColor};
  border-radius: 2px;
  ${radioBorderMode};
  margin-inline-end: ${({ wrapperMarginEnd }) => wrapperMarginEnd};
  border-collapse: separate;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  &:hover {
    border-color: ${appPrimary};
  }
  ${flexCenteredRowCss};
  ${({ checked, mode, disabled }) =>
    checked &&
    !disabled &&
    `
    border: 1px solid ${appPrimary};
    background-color: ${mode === "radio" ? white : appPrimary};
  `}
  ${({ disabled }) => disabled && disabledBackgroundCss}
`;

export const CheckMark = styled.span<BaseSelectionCheckProps>`
  display: inline-block;
  height: 8px;
  opacity: 0;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  ${({ mode }) => (mode === "radio" ? radioCheckMarkCss : checkBoxMarkCss)}
`;
