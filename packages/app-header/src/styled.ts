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
import { colors, spacings } from "@exsys-clinio/theme-values";
import mediaQueries from "@exsys-clinio/media-queries";

export const StyledHeader = styled.header`
  height: ${APP_HEADER_HEIGHT};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${APP_HEADER_HORIZONTAL_PADDING};

  margin-bottom: ${APP_HEADER_MARGIN};
  background-color: ${colors.appPrimary};
`;

export const StyledAppLogo = styled.svg`
  height: ${spacings.sp10};
  width: ${spacings.sp18};
  ${mediaQueries.md`
  width: ${spacings.sp25};
 `}
`;
