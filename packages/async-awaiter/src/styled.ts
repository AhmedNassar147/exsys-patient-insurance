/*
 *
 * Styled: `@exsys-clinio/async-awaiter`.
 *
 */
import styled from "styled-components";
import { colors, fontSizes } from "@exsys-clinio/theme-values";
import TranslateText from "@exsys-clinio/text";

export const Text = styled(TranslateText)`
  text-align: center;
  font-size: ${fontSizes.ff8};
  height: auto;
  line-height: initial;
  font-weight: 500;
  margin-top: 10px;
  color: ${colors.red};
`;
