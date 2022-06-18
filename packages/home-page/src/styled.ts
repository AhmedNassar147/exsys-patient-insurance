/*
 *
 * Styled: `@exsys-patient-insurance/home-page`.
 *
 */
import { Link } from "react-router-dom";
import styled from "styled-components";
import Flex from "@exsys-patient-insurance/flex";
import { colors, fontSizes } from "@exsys-patient-insurance/theme-values";
import { ellipsisCss } from "@exsys-patient-insurance/styled-helpers";
import { BaseText } from "@exsys-patient-insurance/text";
import {
  APP_HEADER_HEIGHT,
  APP_FOOTER_HEIGHT,
  APP_HEADER_MARGIN,
  APP_HEADER_HORIZONTAL_PADDING,
} from "@exsys-patient-insurance/global-app-constants";

const height = `calc(
  100vh - ${APP_HEADER_HEIGHT} - ${APP_FOOTER_HEIGHT}
)`;

export const HomePageWrapper = styled(Flex)`
  position: absolute;
  left: 2px;
  right: 2px;
  top: ${APP_HEADER_HEIGHT};
  bottom: 0;
  width: 100%;
  height: ${height};
`;

export const HomePageContent = styled.div`
  flex: 1;
  padding: ${APP_HEADER_MARGIN} ${APP_HEADER_HORIZONTAL_PADDING};
`;

export const ScreenItemContainer = styled(Flex)`
  transition: all 0.3s ease;
  padding-inline-start: 4px;
  font-size: ${fontSizes.ff8};
  text-decoration: none;
  color: ${colors.closeBlack};
  cursor: pointer;
  &:hover {
    background-color: ${colors.lightGrey};
    color: ${colors.appPrimary};
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const StyledText = styled(BaseText)`
  ${ellipsisCss};
`;
