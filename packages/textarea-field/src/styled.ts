/*
 *
 * Styled: `@exsys-patient-insurance/textarea-field`.
 *
 */
import styled from "styled-components";
import {
  inputCssHelper,
  INTERNAL_INPUT_FIELD_SIZES,
  BaseInputFieldProps,
} from "@exsys-patient-insurance/input-field";

export const TextAreaInput = styled.textarea<BaseInputFieldProps>`
  ${inputCssHelper};
  overflow: hidden;
  min-height: ${INTERNAL_INPUT_FIELD_SIZES.default};
  transition: height 0.05s ease-in-out;
  line-height: 1.3;
  padding-top: 5px;
`;
