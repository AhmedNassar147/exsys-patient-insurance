/*
 *
 * Package: `@exsys-patient-insurance/labeled-input`.
 *
 */
import { useState, useCallback, useLayoutEffect } from "react";
import FieldErrorHint from "@exsys-patient-insurance/field-error-hint";
import { useMakeSelectIsRTLLayout } from "@exsys-patient-insurance/app-config-store";
import { LabelContainer, StyledLabel, LabelWrapperContainer } from "./styled";
import { LabeledInputProps, LabeledInputPropType } from "./index.interface";

const LabeledInput = ({
  type,
  value,
  margin,
  width,
  label,
  height,
  className,
  hidden,
  children,
  labelmarginstart,
  useErrorHint,
  error,
  forceFloatingLabel,
}: LabeledInputProps) => {
  const [focus, setFocus] = useState(false);
  const isRightToLeft = useMakeSelectIsRTLLayout();

  useLayoutEffect(() => {
    if (forceFloatingLabel) {
      setFocus(() => true);
    }
  }, []);

  const onBlur = useCallback(() => setFocus(false), []);
  const onFocus = useCallback(() => setFocus(true), []);

  const float = !!(focus || !!value || value === 0);

  const shouldUseFloatLabeledInput = !type;

  return (
    <>
      <LabelWrapperContainer
        width={width}
        margin={margin}
        hidden={hidden}
        className={className}
      >
        <LabelContainer
          onBlur={shouldUseFloatLabeledInput ? onBlur : undefined}
          onFocus={shouldUseFloatLabeledInput ? onFocus : undefined}
          height={height}
        >
          <StyledLabel
            type={type}
            colon={`${!shouldUseFloatLabeledInput}`}
            float={`${float}`}
            labelmarginstart={labelmarginstart}
            righttoleft={`${isRightToLeft}`}
          >
            {label}
          </StyledLabel>

          {children}
        </LabelContainer>
        {useErrorHint && (
          <FieldErrorHint errorLabelId={error} alignself="flex-start" />
        )}
      </LabelWrapperContainer>
    </>
  );
};
LabeledInput.defaultProps = {
  width: "380px",
  labelmarginstart: "8px",
};

export default LabeledInput;
export type { LabeledInputProps, LabeledInputPropType };
