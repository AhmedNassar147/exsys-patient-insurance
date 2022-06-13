/*
 *
 * Styled: `@exsys-patient-insurance/async-awaiter`.
 *
 */
import styled from "styled-components";
import { colors, fontSizes } from "@exsys-patient-insurance/theme-values";
import TranslateText from "@exsys-patient-insurance/text";

export const Text = styled(TranslateText)`
  text-align: center;
  font-size: ${fontSizes.ff8};
  height: auto;
  line-height: initial;
  font-weight: 500;
  margin-top: 10px;
  color: ${colors.red};
`;
