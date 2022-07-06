/*
 *
 * Styled: `@exsys-patient-insurance/modal-carousel`.
 *
 */
import styled from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";
import { CarouselDotsView } from "./index.interface";

const { gray1, appPrimary } = colors;

export const DotView = styled.section<CarouselDotsView>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  color: ${gray1};
  background: ${gray1};
  opacity: 1;
  margin-inline-end: 6px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    `
    color: ${appPrimary};
    background: ${appPrimary};
  `}
`;
