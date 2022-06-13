/*
 *
 * Styled: `@exsys-patient-insurance/modal`.
 *
 */
import styled, { css, keyframes } from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";
import { BaseText } from "@exsys-patient-insurance/text";
import Flex from "@exsys-patient-insurance/flex";
import { flexCenteredRowCss } from "@exsys-patient-insurance/styled-helpers";
import { ModalMaskProps, ModalBodyProps } from "./index.interface";

export const visiblityKeyFrame = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.80);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const hiddenKeyFrame = keyframes`
  50% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
`;

const animation = ({ visible }: ModalBodyProps) =>
  css`
    ${visible
      ? css`
          ${visiblityKeyFrame} 0.35s ease;
          visibility: visible;
        `
      : css`
          ${hiddenKeyFrame} 0.2s ease;
          opacity: 0;
          visibility: hidden;
        `};
  `;

export const ModalMaskContainer = styled.div<ModalMaskProps>`
  position: fixed;
  inset: 0;
  z-index: ${({ zIndex }) => zIndex};
  height: 100%;
  background-color: ${colors.inputLabelColor};
  pointer-events: auto;
  display: none;
  opacity: 0;
  visibility: hidden;
  ${({ visible, alignMask, justifyMask }) =>
    visible &&
    css`
      visibility: visible;
      opacity: 1;
      display: flex;
      justify-content: ${justifyMask};
      align-items: ${alignMask};
    `};
`;

export const ModalContentWrapper = styled.section<ModalBodyProps>`
  position: relative;
  background-color: ${colors.white};
  background-clip: padding-box;
  border: 0;
  pointer-events: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${({ height, width, zIndex, topSpace }) =>
    css`
      width: ${width};
      top: ${topSpace || "unset"};
      z-index: ${zIndex};
      border-radius: 4px;
      height: ${height || "initial"};
    `};

  ${({ fullScreen }) =>
    fullScreen &&
    `
      border-radius: 4px;
      height: 97%;
      width: 98%;
  `};
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
  max-height: 100%;
  animation: ${animation};
`;

export const ModalHeader = styled(Flex)`
  width: 100%;
  min-height: 35px;
  max-height: 55px;
  border-bottom: 1px solid ${colors.gray0};
  padding: 6px;
  color: ${colors.lightBlack};
  overflow: auto;
`;

export const ModalBody = styled.section<ModalBodyProps>`
  width: 100%;
  overflow: auto;
  background-color: ${colors.white};
  flex: 1;
  min-height: ${({ bodyMinHeight }) => bodyMinHeight || "45px"};
  max-height: ${({ bodyMaxHeight }) => bodyMaxHeight || "max-content"};
  padding: ${({ bodyPadding }) => bodyPadding || "6px"};
`;

export const ModalFooterWrapper = styled.section`
  width: 100%;
  padding: 6px;
  min-height: 40px;
  max-height: 45px;
  border-top: 1px solid ${colors.gray0};
  ${flexCenteredRowCss};
  justify-content: flex-end;
  gap: 10px;
  line-height: 1;
`;

export const ModalTitle = styled(BaseText)`
  margin: 0;
  color: ${({ color }) => color || colors.black2};
  font-size: 16px;
  word-wrap: break-word;
  font-weight: 600;
  line-height: 1.17;
`;
