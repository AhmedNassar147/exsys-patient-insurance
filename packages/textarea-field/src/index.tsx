/*
 *
 * Package: `@exsys-patient-insurance/textarea-field`.
 *
 */
import { memo, useRef, useState, useEffect } from "react";
import InputField, {
  INTERNAL_INPUT_FIELD_SIZES,
  INPUT_FIELD_DEFAULT_PROPS,
} from "@exsys-patient-insurance/input-field";
import { TextAreaInput } from "./styled";
import TextAreaFieldProps from "./index.interface";

const { default: inputDefaultHeight } = INTERNAL_INPUT_FIELD_SIZES;
const {
  type,
  size,
  internalInputHeight: _,
  ...defaultProps
} = INPUT_FIELD_DEFAULT_PROPS;

const TextAreaField = ({
  value,
  initialInputHeight,
  ...props
}: TextAreaFieldProps) => {
  const textAreaRef = useRef<HTMLInputElement>(null);
  const [internalInputHeight, setTextAreaHeight] = useState<string>(
    () => initialInputHeight || inputDefaultHeight
  );

  useEffect(
    () => {
      if (initialInputHeight) {
        setTextAreaHeight(() => initialInputHeight);
      }
    },
    // eslint-disable-next-line
    [initialInputHeight]
  );

  return (
    <InputField
      size="auto"
      ref={textAreaRef}
      value={value}
      customInputComponent={TextAreaInput}
      internalInputHeight={internalInputHeight}
      {...props}
    />
  );
};
TextAreaField.defaultProps = {
  internalInputMaxHeight: "150px",
  initialInputHeight: inputDefaultHeight,
  ...defaultProps,
};

export default memo(TextAreaField);
