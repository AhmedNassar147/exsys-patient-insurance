/*
 *
 * Styled: `@exsys-patient-insurance/base-page-wrapper`.
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
import type { SizeType } from "@exsys-patient-insurance/app-sidebar";
import { SIDE_BAR_SIZES } from "./constants";

const height = `calc(
  100vh - ${APP_HEADER_HEIGHT} - ${APP_FOOTER_HEIGHT}
)`;

export const BasePageWrapper = styled(Flex)`
  position: absolute;
  left: 2px;
  right: 2px;
  top: ${APP_HEADER_HEIGHT};
  bottom: 0;
  width: calc(100% - 4px);
  height: ${height};
`;

export const BasePageContent = styled.div<{ sideBarSize: SizeType }>`
  flex: 1;
  overflow-y: auto;
  padding: ${APP_HEADER_MARGIN} ${APP_HEADER_HORIZONTAL_PADDING};
  ${({ sideBarSize }) => {
    const currentSideBarWidth = SIDE_BAR_SIZES[sideBarSize];
    const width = `calc(100% - ${currentSideBarWidth})`;
    return `
    min-width: ${width};
    max-width: ${width};
  `;
  }}
`;

export const ScreenItemContainer = styled(Flex)<{ selected?: boolean }>`
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
  ${({ selected }) =>
    selected &&
    `
    background-color: ${colors.lightGrey};
    color: ${colors.appPrimary};
  `};
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
