/*
 *
 * Styled: `@exsys-patient-insurance/app-sidebar`.
 *
 */
import styled from "styled-components";
import Flex from "@exsys-patient-insurance/flex";
import { APP_HEADER_HEIGHT } from "@exsys-patient-insurance/global-app-constants";
import {
  colors,
  zIndices,
  spacings,
} from "@exsys-patient-insurance/theme-values";

const height = `calc(
  100vh - ${APP_HEADER_HEIGHT}
)`;

export const SideBar = styled.aside<{ width: string }>`
  min-height: ${height};
  max-height: ${height};
  overflow: auto;
  box-shadow: 0 0 6px rgb(0 0 0 / 8%);
  z-index: ${zIndices.drawer};
  background-color: ${colors.white};
  width: ${({ width }) => width};
  min-width: ${({ width }) => width};
  transition: all 0.5s ease;
  position: relative;
  padding: ${spacings.sp3} ${spacings.sp3} 0;
`;

export const SideBarFooter = styled(Flex)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
`;
