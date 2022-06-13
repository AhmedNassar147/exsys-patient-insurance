/*
 *
 * Package: `@exsys-patient-insurance/field-error-hint`.
 *
 */
import { memo } from "react";
import StyledTranslateText from "./styled";
import IProps from "./index.interface";

const FieldErrorHint = ({
  errorLabelId,
  forceRenderIfNoError,
  ...props
}: IProps) => {
  if (!errorLabelId && !forceRenderIfNoError) {
    return null;
  }

  return <StyledTranslateText {...props}>{errorLabelId}</StyledTranslateText>;
};
FieldErrorHint.defaultProps = StyledTranslateText.defaultProps;

export default memo(FieldErrorHint);
