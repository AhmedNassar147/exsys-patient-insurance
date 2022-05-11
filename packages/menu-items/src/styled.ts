/*
 *
 * Styled: `@exsys-clinio/menu-items`.
 *
 */
import styled from "styled-components";
import { MenuItemsBaseProps } from "./index.interface";

export const MenuItemsList = styled.ul<MenuItemsBaseProps>`
  list-style-type: none;
  width: 100%;
  padding: 2px 0 0;
  margin: 0;
  cursor: pointer;
  overflow-x: hidden;
  overflow-y: auto;
  &:focus {
    outline: none;
    border: none;
  }
  height: auto;
  ${({ maxHeight }) =>
    maxHeight &&
    `
    max-height: ${maxHeight};
  `}
`;
