/*
 *
 * Styled: `@exsys-patient-insurance/exsys-table`.
 *
 */
import styled, { css } from "styled-components";
import { colors, zIndices } from "@exsys-patient-insurance/theme-values";
import { BaseText } from "@exsys-patient-insurance/text";
import Flex from "@exsys-patient-insurance/flex";
import DropDown from "@exsys-patient-insurance/drop-down";
import LabeledViewLikeInput from "@exsys-patient-insurance/labeled-view-like-input";
import {
  ellipsisCssHelper,
  flexCenteredRowCss,
  flexCenteredColumnCss,
} from "@exsys-patient-insurance/styled-helpers";
import {
  TableContainerProps,
  TableStyledHeadProps,
  TableFooterProps,
  ColorNamesType,
} from "@exsys-patient-insurance/types";
import {
  TableStyledCellProps,
  InternalTableStyledCellHeadProps,
} from "./index.interface";

const {
  inputBorderColor,
  white2,
  black2,
  appPrimary,
  red23,
  blue,
  orange,
  lightOrange,
  red,
  yellow,
  darkPink,
} = colors;

const getCellWidth = (width: string | number) =>
  !isNaN(+width) ? `${width}px` : width;

export const TableContainer = styled.div<TableContainerProps>`
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: ${({ width }) => width};
  overflow-x: auto;
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ order }) => order && `order: ${order}`};
`;

export const TableContentWrapper = styled.div<TableContainerProps>`
  width: 100%;
  max-height: ${({ height }) => height};
  overflow-y: auto;
  position: relative;
`;

export const StyledTable = styled.table`
  border-collapse: separate;
  table-layout: auto;
  border-spacing: 0;
  max-width: 100%;
`;

export const StyledTableHead = styled.thead<TableStyledHeadProps>`
  background-color: ${({ headBackground }) =>
    headBackground ? colors[headBackground] : "transparent"};
  color: ${({ headColor }) => (headColor ? colors[headColor] : "transparent")};
`;

export const StyledTableRowCell = styled.td<InternalTableStyledCellHeadProps>`
  position: relative;
  padding: 0;
  margin: 0;
  color: currentColor;
  font-size: ${({ fontSize }) => fontSize};
  ${({ isHeadCell, headBackground }) =>
    isHeadCell &&
    `
    background-color: ${
      headBackground ? colors[headBackground] : "transparent"
    };
    position: sticky;
    top: 0;
    font-weight: bold;
    z-index: ${zIndices.tableCell};
  `};
  ${({ width }) =>
    width &&
    `
    width: ${getCellWidth(width)};
  `};

  ${({ noBorder }) =>
    !noBorder &&
    `
    border-inline-end: 1px solid ${inputBorderColor};
    border-bottom: 1px solid ${inputBorderColor};
  `};

  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed;
  `};
  transition: all 0.3s ease;
`;

const flexTotalCellCss = css<{ endBordered?: boolean }>`
  ${({ endBordered }) =>
    endBordered &&
    `
    &:not(:last-child) {
      border-inline-end: 1px solid ${inputBorderColor};
    }
  `}
`;

export const LabeledViewLikeInputForTotalCell = styled(LabeledViewLikeInput)`
  ${flexTotalCellCss};
`;

export const FlexForTotalCell = styled(Flex)`
  ${flexTotalCellCss};
`;

const cellContentCss = css<TableStyledCellProps>`
  width: ${({ width }) => (width ? getCellWidth(width) : "unset")};
  ${ellipsisCssHelper};
  text-align: ${({ align }) => align || "center"};
  font-size: inherit;
  color: inherit;
`;

export const NestedCellsContainer = styled(Flex)<{ noBorder?: boolean }>`
  ${({ noBorder }) => !noBorder && `border-top: 1px solid ${inputBorderColor}`};
  width: 100%;
`;

interface CellContentWrapperProps extends TableStyledCellProps {
  useInlineEndBorder?: boolean;
}

const cellColorsCss = css`
  &.red {
    color: ${red23} !important;
  }

  &.red-bg {
    background-color: ${red23} !important;
  }

  &.blue {
    color: ${blue} !important;
  }

  &.orange {
    color: ${orange} !important;
  }

  &.orange-bg {
    background-color: ${lightOrange} !important;
  }
  &.yellow-bg {
    background-color: ${yellow} !important;
  }
  &.darkPink-bg {
    background-color: ${darkPink} !important;
  }
`;

export const CellContentWrapper = styled(BaseText)<CellContentWrapperProps>`
  ${flexCenteredRowCss};
  position: relative;
  ${({ display }) => display && `display: ${display}`};
  ${cellContentCss};
  justify-content: ${({ align }) => align || "center"};
  padding: ${({ padding }) => padding || "3px"};
  ${({ minHeight }) => minHeight && `min-height: ${minHeight}`};
  ${({ useInlineEndBorder }) =>
    useInlineEndBorder &&
    `
    &:not(:last-child) {
      border-inline-end: 1px solid ${inputBorderColor};
    }
  `};
  ${cellColorsCss};
  word-break: unset;
  word-wrap: anywhere;
`;
CellContentWrapper.defaultProps = {
  tag: "div",
};

const fullHeightCssHelper = css`
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
`;

export const SorterContainer = styled.div`
  text-align: center;
  ${flexCenteredColumnCss};
  margin-inline-start: 4px;
  &:hover {
    transform: scale(1.2);
    background-color: ${white2};
    color: ${appPrimary};
  }
  transition: transform 0.25s, color 0.1s;
`;

export const StyledDropdown = styled(DropDown)`
  ${flexCenteredRowCss};
  ${fullHeightCssHelper};
  &:hover {
    top: 5px;
    bottom: 5px;
    transform: scale(1.3);
    background-color: ${white2};
    color: ${appPrimary};
  }
  transition: transform 0.25s, color 0.1s;
`;

export const TableFooter = styled.div<TableFooterProps>`
  display: flex;
  color: ${black2};
  background-color: ${white2};
  border-bottom: 1px solid ${inputBorderColor};
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  align-items: center;
  justify-content: ${({ footerJustify }) => footerJustify};
  padding: ${({ footerPadding }) => footerPadding};
  ${({ footerGap }) =>
    footerGap &&
    `
    gap: ${footerGap};
  `};
`;

export const ExpandIconContainer = styled.span`
  cursor: pointer;
  display: inline-block;
  width: 18px;
  height: 18px;
  color: inherit;
  line-height: 1.2;
  text-align: center;
  background: inherit;
  border: 1px solid ${inputBorderColor};
  border-radius: 2px;
  transition: all 0.3s;
  user-select: none;
  &:hover {
    border-color: ${appPrimary};
  }
`;

export const ExpandedRow = styled.tr`
  background-color: ${white2};
  transition: all 0.3s, height 0s;
`;

export const BodyRow = styled.tr<{
  selectedRowBackgroundColor: ColorNamesType;
  selected?: boolean;
}>`
  ${({ selectedRowBackgroundColor, selected }) =>
    !!selected &&
    selectedRowBackgroundColor &&
    `
  background-color: ${colors[selectedRowBackgroundColor]};
`};
  ${cellColorsCss};
  transition: all 0.3s ease-in-out;
`;

export const ExpandedRowCell = styled(StyledTableRowCell)`
  padding: 4px;
  min-height: 30px;
`;

export const EmptyView = styled(BaseText)`
  height: 55px;
  padding: 0;
  margin: 0;
  width: 100%;
  font-weight: bold;
  ${flexCenteredColumnCss};
  color: ${red};
`;
EmptyView.defaultProps = {
  tag: "div",
};
