/*
 *
 * Styled: `@exsys-patient-insurance/app-footer`.
 *
 */
import styled from "styled-components";
import {
  APP_FOOTER_HEIGHT,
  APP_HEADER_HORIZONTAL_PADDING,
} from "@exsys-patient-insurance/global-app-constants";
import { colors, fontSizes } from "@exsys-patient-insurance/theme-values";
import { flexCenteredRowCss } from "@exsys-patient-insurance/styled-helpers";

export const StyledFooter = styled.footer`
  position: fixed;
  z-index: 0;
  bottom: 0;
  background-color: ${colors.white};
  width: 100%;
  color: ${colors.lightBlack};
  font-size: ${fontSizes.ff9};
  padding: 6px ${APP_HEADER_HORIZONTAL_PADDING};
  text-align: center;
  height: ${APP_FOOTER_HEIGHT};
  font-family: Roboto;
  ${flexCenteredRowCss};
`;

export const FooterImage = styled.img`
  margin-inline-start: 10px;
  margin-inline-end: -10px;
`;
