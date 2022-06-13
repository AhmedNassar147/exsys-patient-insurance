/*
 *
 * Package: `@exsys-patient-insurance/close-icon`.
 *
 */
import styled from "styled-components";
import CloseIconProps from "./index.interface";

const CloseIcon = styled.div<CloseIconProps>`
  display: inline-block;
  text-align: center;
  line-height: 1;
  ${({ color, hoverColor, width, disabled, margin, size }) => `
    margin: ${margin};
    color: ${color};
    font-size: ${size};
    width: ${width};
    pointer-events: ${disabled ? "none" : "auto"};
    cursor: ${disabled ? "none" : "pointer"};
    ${
      !disabled &&
      `
      &:hover {
        color: ${hoverColor};
        transform: scale(1.2);
      }
    `
    }
  `}
  transition: all 0.2s ease-in-out;
`;
CloseIcon.defaultProps = {
  size: "0.9em",
  color: "currentcolor",
  hoverColor: "currentcolor",
  children: "⛌",
  margin: "-2px 0 0",
  role: "button",
  width: "auto",
};

export default CloseIcon;
