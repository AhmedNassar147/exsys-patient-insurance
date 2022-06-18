/*
 *
 * Styled: `@exsys-patient-insurance/paginator`.
 *
 */
import styled, { css } from "styled-components";
import {
  disabledBackgroundCss,
  flexCenteredRowCss,
} from "@exsys-patient-insurance/styled-helpers";
import { BaseText } from "@exsys-patient-insurance/text";
import { colors, fontSizes } from "@exsys-patient-insurance/theme-values";
import { PaginatorBaseProps, PaginatorItemProps } from "./index.interface";

const { black2, white, inputBorderColor, blue2, appPrimary } = colors;

export const StyledList = styled.ul<PaginatorBaseProps>`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  padding: 0;
  color: ${black2};
  font-size: ${fontSizes.ff8};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  float: right;
  ${({ margin }) => margin && `margin: ${margin}`};
`;

const baseItemCss = css`
  ${flexCenteredRowCss};
  display: inline-flex;
  user-select: none;
  list-style: none;
  height: 29px;
  background-color: ${white};
  &:not(:last-child) {
    margin-inline-end: 4px;
  }
`;

export const InputsWrapper = styled.li`
  ${baseItemCss};
`;

const paginatorItemCss = css`
  height: 30px;
  min-width: 29px;
  /* padding: 4px; */
  color: ${black2};
  border: 1px solid ${inputBorderColor};
  transition: all 0.3s ease-in-out;
  border-radius: 2px;
`;

export const BasePaginatorItem = styled(BaseText)`
  ${baseItemCss};
  ${paginatorItemCss};
  padding: 4px 6px;
`;
BasePaginatorItem.defaultProps = {
  tag: "li",
};

export const PaginatorItem = styled(InputsWrapper)<PaginatorItemProps>`
  ${paginatorItemCss};
  cursor: pointer;
  ${({ disabled }) =>
    !disabled &&
    `
    &:hover {
      border: 1px solid ${blue2};
      color: ${inputBorderColor};
    };
  `};
  ${({ disabled }) => disabled && disabledBackgroundCss};
  ${({ selected }) =>
    selected &&
    `
      border: 1px solid ${appPrimary};
      color: ${appPrimary};
  `};
`;
