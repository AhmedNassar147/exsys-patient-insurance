/*
 *
 * Styled: `@exsys-patient-insurance/button`.
 *
 */
import styled, { css, keyframes } from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";
import {
  flexCenteredRowCss,
  ellipsisCss,
  disabledBackgroundCss,
} from "@exsys-patient-insurance/styled-helpers";
import {
  BUTTON_TYPE_STYLES,
  BUTTON_SIZE_STYLES,
  BUTTON_SHAPES,
  BUTTON_TYPES,
} from "./constants";
import { BaseProps } from "./index.interface";

const keyFrameBlinker = keyframes`
  25% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }

  75% {
    opacity: 0.8;
  }

  100% {
    opacity: 1;
  }
`;

const shadowCss = css`
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  -webkit-box-shadow: 0px 2px 0 rgb(0 0 0 / 3%);
  box-shadow: 0px 2px 0 rgb(0 0 0 / 3%);
`;

const buttonTypeCssHelper = css<BaseProps>`
  ${({
    backgroundcolor,
    ghost,
    styleType,
    borderWidth,
    color: colorFromProps,
  }) => {
    const {
      color,
      backgroundColor,
      border,
      hoverBorder,
      hoverColor,
      ghostColor,
    } = BUTTON_TYPE_STYLES[styleType || "default"];

    const isPrimaryButton = styleType === BUTTON_TYPES.PRIMARY;
    const isDangerButton = styleType === BUTTON_TYPES.DANGER;
    const isLinkButton = styleType === BUTTON_TYPES.LINK;
    const isGhost = !!ghost;

    const dangerOrPrimaryColor = isGhost ? ghostColor : color;

    return css`
      background-image: none;
      background-color: ${ghost
        ? "transparent"
        : backgroundcolor || backgroundColor};
      border: ${border};
      ${borderWidth && `border-width: ${borderWidth}`};
      color: ${colorFromProps
        ? colorFromProps
        : isPrimaryButton || isDangerButton
        ? dangerOrPrimaryColor
        : color};
      ${isLinkButton ? "" : shadowCss}
      &:hover {
        opacity: 0.75;
        border: ${hoverBorder};
        color: ${ghost ? ghostColor : hoverColor};
        ${borderWidth && `border-width: ${borderWidth}`};
      }
    `;
  }};
`;

const buttonSizeCssHelper = css<BaseProps>`
  ${({
    height: customHeight,
    size,
    shape,
    width,
    block,
    padding: _padding,
    borderRadius,
  }) => {
    const { height, fontSize, padding } = BUTTON_SIZE_STYLES[size || "default"];

    const latestHeight = customHeight || height;
    const isRoundShape = shape === BUTTON_SHAPES.ROUND;
    const isCircleShape = shape === BUTTON_SHAPES.CIRCLE;
    const radius = isCircleShape
      ? "50%"
      : isRoundShape
      ? latestHeight
      : borderRadius || "4px";

    return css`
      height: ${latestHeight};
      font-size: ${fontSize};
      padding: ${isCircleShape ? "0" : _padding || padding};
      border-radius: ${radius};
      width: ${block ? "100%" : isCircleShape ? latestHeight : width};
    `;
  }};
`;

const buttonStyleSheetCss = css<BaseProps>`
  outline: none;
  border: none;
  line-height: 1.499;
  font-weight: 400;
  gap: 7px;
  ${({ blink }) =>
    blink &&
    css`
      animation: ${keyFrameBlinker} 2.5s linear infinite;
    `}
  ${buttonTypeCssHelper};
  ${buttonSizeCssHelper};
  ${({ minWidth }) => minWidth && `min-width: ${minWidth}`};
  ${({ margin }) => margin && `margin: ${margin}`};
  ${ellipsisCss};
  ${flexCenteredRowCss};
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  user-select: none;
  touch-action: manipulation;
  cursor: pointer;
  > svg,
  img {
    margin-top: 1px !important;
  }
  &[disabled] {
    ${disabledBackgroundCss};
    opacity: 1;
    border-color: ${colors.inputBorderColor};
    text-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    pointer-events: none;
    &:hover {
      opacity: 1;
      border-color: ${colors.inputBorderColor};
    }
  }
`;

export const StyledButton = styled.button<BaseProps>`
  ${buttonStyleSheetCss}
`;

export const StyledLink = styled.a<BaseProps>`
  ${buttonStyleSheetCss}
  text-decoration: none;
`;
