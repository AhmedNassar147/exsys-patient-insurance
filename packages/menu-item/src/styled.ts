/*
 *
 * Styled: `@exsys-patient-insurance/menu-item`.
 *
 */
import styled from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";
import { BaseText } from "@exsys-patient-insurance/text";
import {
  ellipsisCss,
  disabledCssHelper,
  flexCenteredRowCss,
} from "@exsys-patient-insurance/styled-helpers";
import { MenuItemProps } from "./index.interface";

const { lightGrey, inputLabelColor, white2, grey4 } = colors;

export const ChildrenContainer = styled(BaseText)`
  ${ellipsisCss};
  flex: 1 1 auto;
  padding: 0;
  margin: 0;
  line-height: initial;
  text-align: initial;
`;
ChildrenContainer.defaultProps = {
  tag: "span",
};

export const BaseMenuItem = styled.li<MenuItemProps>`
  ${flexCenteredRowCss};
  justify-content: flex-start;
  list-style-type: none;
  width: ${({ width }) => width || "100%"};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  gap: 4px;
  ${ellipsisCss};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  ${({ height }) => `
    height: ${height};
    line-height: ${height};
  `};
  ${({ selected, selectedColor }) =>
    selected &&
    `
    background-color: ${white2};
    color: ${selectedColor || inputLabelColor};
    font-weight: 600;
  `};
  ${disabledCssHelper};
  ${({ disabled }) =>
    disabled
      ? `
        background-color: rgba(0, 0, 0, 0.022) !important;
        cursor: not-allowed;
      `
      : `
    &:hover {
      background-color: ${lightGrey};
    };
  `};
  ${({ bordered }) =>
    bordered &&
    `
    border: 1px solid ${grey4};
    border-radius: 2px;
  `}
  transition: all 0.3s ease-in-out;
`;
