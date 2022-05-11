/*
 *
 * Styled: `@exsys-clinio/input-field`.
 *
 */
import styled, { css } from "styled-components";
import { colors, fontSizes } from "@exsys-clinio/theme-values";
import {
  flexCenteredRowCss,
  disabledBackgroundCss,
} from "@exsys-clinio/styled-helpers";
import { INPUT_FIELD_SIZES } from "./constants";
import { BaseInputFieldProps, AddonAfterWrapperProps } from "./index.interface";

const {
  appPrimary,
  black2,
  inputBorderColor,
  gray1,
  white,
  red,
  lightPink,
} = colors;
const { ff8: medium, ff7: large } = fontSizes;

const redBorderCssHelper = css<BaseInputFieldProps>`
  ${({ useRedBorderWhenError }) =>
    useRedBorderWhenError &&
    `
    border-width: 1px;
    border-style: solid;
    border-color: ${red};
  `}
`;

const focusCss = css<BaseInputFieldProps>`
  ${({ disabled, useShadow }) =>
    !disabled &&
    !useShadow &&
    `
    border-color: ${appPrimary};
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
  `};
  ${redBorderCssHelper};
`;

export const InputFieldContainer = styled.div<BaseInputFieldProps>`
  padding: 0;
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};
  position: relative;
`;

export const InputFieldWrapper = styled.div<BaseInputFieldProps>`
  position: relative;
  padding: 0;
  margin: 0;
  ${flexCenteredRowCss};
  justify-content: flex-start;
  gap: 3px;
  width: 100%;
  line-height: 1.5715;
  box-sizing: border-box;
  border-style: solid;
  outline: none;
  border-width: ${({ borderWidth }) => borderWidth || "1px"};
  border-color: ${({ borderColor }) => borderColor || inputBorderColor};
  ${({ inputWrapperWrapContent }) =>
    inputWrapperWrapContent &&
    `
   flex-wrap: wrap;
  `};
  border-radius: 3px;
  cursor: pointer;
  background-color: ${({ required }) => (required ? lightPink : white)};
  color: ${({ color }) => color || black2};
  ${({ size, height: _height }) => {
    const height = _height || INPUT_FIELD_SIZES[size || "default"];
    const isAutoSize = size === "auto";
    const isLargeSize = size === "large";

    return `
    font-size: ${isLargeSize ? large : medium};
    min-height: ${isAutoSize ? INPUT_FIELD_SIZES.default : height};
    height: ${isAutoSize ? "auto" : height};
  `;
  }};
  ${({ useShadow }) =>
    useShadow &&
    `
    box-shadow: 4px 6.9px 18.7px 2.3px rgb(17 81 125 / 9%);
    padding: 0px 8px;
    border: none;
    border-radius: 16px;
  `};
  ${redBorderCssHelper};
  ${({ inputWrapperPadding }) =>
    inputWrapperPadding &&
    `
    padding: ${inputWrapperPadding};
  `};
  ${({ disabled }) => disabled && disabledBackgroundCss}
  &:hover,
  &:focus {
    ${focusCss};
  }
  ${({ autoFocus }) => !!autoFocus && focusCss};
  transition: all 0.6s ease-in-out;
`;

export const inputCssHelper = css<BaseInputFieldProps>`
  flex: 1;
  width: auto;
  border: none;
  outline: none;
  line-height: 1;
  background-color: transparent;
  padding: 0px 5px;
  caret-color: ${appPrimary};
  color: currentcolor;
  cursor: text;
  font-weight: ${({ fontWeight }) => fontWeight};
  max-width: ${({ addonAfterWidth }) => `calc(100% - ${addonAfterWidth || 0})`};
  ${({ internalInputHeight }) =>
    internalInputHeight &&
    `
    height: ${internalInputHeight};
  `};

  ${({ internalInputMaxHeight }) =>
    internalInputMaxHeight &&
    `
      max-height: ${internalInputMaxHeight};
    `};

  ${({ internalInputMinWidth }) =>
    internalInputMinWidth &&
    `
    min-width: ${internalInputMinWidth};
  `};
  ${({ internalInputMaxWidth }) =>
    internalInputMaxWidth &&
    `
    max-width: ${internalInputMaxWidth};
  `};
  &::placeholder {
    color: ${gray1} !important;
    line-height: 1.5;
    opacity: 1;
  }
  &[type="text"],
  &[type="password"],
  textarea {
    -webkit-appearance: none;
  }
  &[contentEditable="false"],
  &[role="div"] {
    cursor: pointer;
    caret-color: transparent;
  }
  &:hover,
  :focus {
    border: none;
    outline: none;
  }
  &[disabled] {
    cursor: not-allowed;
    background-color: transparent;
  }
`;

export const StyledInput = styled.input<BaseInputFieldProps>`
  ${inputCssHelper};
`;

export const AddonAfterWrapper = styled.section<AddonAfterWrapperProps>`
  position: absolute;
  top: 50%;
  ${({ righttoleft }) => (righttoleft === "true" ? "left: 0px" : "right: 0px")};
  width: ${({ addonAfterWidth }) => addonAfterWidth};
  transform: translateY(-50%);
  ${flexCenteredRowCss};
  justify-content: flex-start;
  gap: 4px;
  box-sizing: border-box;
  text-align: center;
  height: 100%;
  cursor: inherit;
  color: currentcolor;
  z-index: 1;
`;
