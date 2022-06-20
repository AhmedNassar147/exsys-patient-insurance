/*
 *
 * Styled: `@exsys-patient-insurance/date-picker-field`.
 *
 */
import styled from "styled-components";

export const StyledDateInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  border: none;
  outline: 0;
  &::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
`;
