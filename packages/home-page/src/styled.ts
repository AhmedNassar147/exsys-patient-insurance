/*
 *
 * Styled: `@exsys-patient-insurance/home-page`.
 *
 */
import styled from "styled-components";
import Flex from "@exsys-patient-insurance/flex";
import {
  APP_HEADER_HEIGHT,
  APP_FOOTER_HEIGHT,
  APP_HEADER_MARGIN,
  APP_HEADER_HORIZONTAL_PADDING,
} from "@exsys-patient-insurance/global-app-constants";

const height = `calc(
  100vh - ${APP_HEADER_HEIGHT} - ${APP_FOOTER_HEIGHT} - ${APP_HEADER_MARGIN}
)`;

export const HomePageWrapper = styled(Flex)`
  position: absolute;
  left: 2px;
  right: 2px;
  top: calc(${APP_HEADER_HEIGHT});
  bottom: 0;
  width: 100%;
  height: ${height};
`;

export const HomePageContent = styled.div`
  flex: 1;
  padding: ${APP_HEADER_MARGIN} ${APP_HEADER_HORIZONTAL_PADDING};
`;
