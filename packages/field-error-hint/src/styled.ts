/*
 *
 * Styled: `@exsys-patient-insurance/field-error-hint`.
 *
 */
import styled from "styled-components";
import Text from "@exsys-patient-insurance/text";
import { colors, fontSizes } from "@exsys-patient-insurance/theme-values";
import { StyledTextProps } from "./index.interface";

export const StyledText = styled(Text)<StyledTextProps>`
  display: block;
  color: ${colors.red};
  font-size: ${fontSizes.ff9};
  height: ${({ height }) => height};
  align-self: ${({ alignself }) => alignself};
  ${({ lineheight }) => lineheight && `line-height: ${lineheight}`};
`;

StyledText.defaultProps = {
  tag: "span",
  margin: "1px 0px 2px",
  weight: "400",
  height: "unset",
  ellipsis: "true",
  alignself: "flex-end",
};

export default StyledText;
