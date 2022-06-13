/*
 *
 * Types: `@exsys-patient-insurance/field-error-hint`.
 *
 */
export interface StyledTextProps {
  margin?: string;
  height?: string;
  alignself?: string;
  lineheight?: string | number;
  tag?: string;
  padding?: string;
}

export default interface IProps extends StyledTextProps {
  errorLabelId?: string;
  forceRenderIfNoError?: boolean;
}
