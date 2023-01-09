/*
 *
 * Styled: `@exsys-patient-insurance/client-dashboard-page`.
 *
 */
import styled from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";
import { CARD_HEIGHT } from "./constants";

const { white } = colors;

export const ChartCardView = styled.div<{ width?: string }>`
  padding: 5px;
  background-color: ${white};
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.15);
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  ${({ width }) =>
    width &&
    `
    width: ${width};
    max-width: ${width};
  `};
  height: ${CARD_HEIGHT};
  max-height: ${CARD_HEIGHT};
  border-radius: 8px;
`;
