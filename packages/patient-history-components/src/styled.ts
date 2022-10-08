/*
 *
 * Styled: `@exsys-patient-insurance/patient-history-components`.
 *
 */
import styled, { css } from "styled-components";
import { BaseText } from "@exsys-patient-insurance/text";
import Flex from "@exsys-patient-insurance/flex";
import { colors } from "@exsys-patient-insurance/theme-values";
import { HistoryContainerViewProps } from "./index.interface";

const heightCssHelper = css<HistoryContainerViewProps>`
  ${({ minHeight }) => minHeight && `min-height: ${minHeight}`};
  ${({ maxHeight }) => maxHeight && `min-height: ${maxHeight}`};
`;

export const HistoryContainer = styled.div<HistoryContainerViewProps>`
  min-height: 375px;
  max-height: 381px;
  width: 100%;
  border: 1px solid ${colors.grey4};
  border-radius: 6px;
  padding: 0.3em 0.5em;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 12px;
  ${heightCssHelper};
  ${({ fullscreen }) =>
    fullscreen &&
    `
    min-height: 100%;
    max-height: 100%;

  `};

  ${({ noborder }) =>
    noborder &&
    `
    border: 0px;
    border-radius: 0px;
    padding: 0;
  `};

  ${({ isDrawerHistory }) =>
    isDrawerHistory &&
    `
      min-height: calc(100vh - 340px);
  `}
`;

export const HistoryInnerRenderer = styled(Flex)<HistoryContainerViewProps>`
  ${heightCssHelper};
  ${({ isDrawerHistory }) =>
    isDrawerHistory &&
    `
    /* overflow: hidden; */
    min-height: 100px;
    max-height: calc(100vh - 300px);
  `};
`;

const selectedCss = `
  border: 2px solid ${colors.appPrimary}
`;

const disabledCss = `
  cursor: not-allowed;
  color: ${colors.white};
  background-color: ${colors.disabledBg};
`;

const HistoryButton = styled(BaseText)<{ marginend?: string }>`
  min-width: ${({ minWidth }) => minWidth || "50px"};
  ${({ height }) => `
  height: ${height || "29px"};
  line-height: ${height || "29px"};
`};
  border: solid 1px ${colors.grey4};
  background-color: ${colors.white2};
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  margin-inline-end: ${({ marginend }) => marginend || "13px"};
  border-radius: 4px;
  padding: 0px 5px;
  cursor: pointer;
  ${({ selected, disabled, customSelectedCss }) =>
    disabled ? disabledCss : selected && (customSelectedCss || selectedCss)};
`;

HistoryButton.defaultProps = {
  tag: "section",
};

export { HistoryButton };
