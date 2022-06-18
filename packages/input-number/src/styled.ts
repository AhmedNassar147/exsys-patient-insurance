/*
 *
 * Styled: `@exsys-patient-insurance/input-number`.
 *
 */
import styled from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";
import { disabledBackgroundCss } from "@exsys-patient-insurance/styled-helpers";

const { inputBorderColor, white, lighterBlack } = colors;

export const ArrowWrapper = styled.span<{ disabled?: boolean }>`
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  height: 49%;
  overflow: hidden;
  color: ${lighterBlack};
  line-height: 1.1;
  text-align: center;
  transition: all 0.1s linear;
  box-shadow: 4px 6.9px 18.7px 2.3px rgb(17 81 125 / 6%);
  border-inline-start: 1px solid ${inputBorderColor};
  background-color: ${white};
  user-select: none;
  ${({ disabled }) => disabled && disabledBackgroundCss};
  &:last-child {
    border-top: 1px solid ${inputBorderColor};
  }
`;
