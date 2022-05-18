/*
 *
 * Styled: `@exsys-clinio/app-header`.
 *
 */
import styled from "styled-components";
import {
  APP_HEADER_HEIGHT,
  APP_HEADER_MARGIN,
  APP_HEADER_HORIZONTAL_PADDING,
} from "@exsys-clinio/global-app-constants";
import { colors, spacings, zIndices } from "@exsys-clinio/theme-values";

import mediaQueries from "@exsys-clinio/media-queries";

export const StyledHeader = styled.header`
  height: ${APP_HEADER_HEIGHT};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${APP_HEADER_HORIZONTAL_PADDING};
  margin-bottom: ${APP_HEADER_MARGIN};
  background-color: ${colors.white};
  z-index: ${zIndices.appHeader};
  border-bottom: 1px solid ${colors.inputBorderColor};
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  -webkit-box-shadow: 0px 2px 0 rgb(0 0 0 / 3%);
  box-shadow: 0px 2px 0 rgb(0 0 0 / 3%);
`;

export const StyledAppLogo = styled.svg`
  height: ${spacings.sp10};
  width: ${spacings.sp18};
  ${mediaQueries.md`
  width: ${spacings.sp25};
 `}
`;
