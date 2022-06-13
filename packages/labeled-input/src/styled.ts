/*
 *
 * Styled: `@exsys-patient-insurance/labeled-input`.
 *
 */
import styled from "styled-components";
import Text from "@exsys-patient-insurance/text";
import { colors } from "@exsys-patient-insurance/theme-values";
import { BaseLabeledInputProps, LabelProps } from "./index.interface";

const { inputLabelColor, gray1, white, appPrimary } = colors;

export const LabelWrapperContainer = styled.div<BaseLabeledInputProps>`
  position: relative;
  box-sizing: border-box;
  visibility: visible;
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ width }) => width && `width: ${width}`};
  &[hidden] {
    display: none;
    visibility: hidden;
  }
`;

export const LabelContainer = styled.div<BaseLabeledInputProps>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  ${({ height }) => height && `height: ${height}`}
`;

export const StyledLabel = styled(Text)<LabelProps>`
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
  margin-inline-end: 6px;
  background-color: transparent;
  ${({ type, float, labelmarginstart, righttoleft }) =>
    !type &&
    `
    margin-inline-end: 0px;
    position: absolute;
    pointer-events: none;
    color: ${gray1};
    line-height: 1;
    z-index: 1;
    ${
      righttoleft === "true"
        ? `right: ${labelmarginstart}`
        : `left: ${labelmarginstart}`
    };
    font-weight: 500;
    ${
      float === "true" &&
      `
      top: -3px;
      transform: translate(0, -3px);
      color: ${appPrimary};
      background-color: ${white};
      line-height: 0.9;
      ${righttoleft === "true" ? `right: 8px` : `left: 8px`};
    `
    };
  `}
  transition: all 0.3s ease;
`;
StyledLabel.defaultProps = {
  color: inputLabelColor,
  size: "medium",
  tag: "label",
  weight: "bold",
};
