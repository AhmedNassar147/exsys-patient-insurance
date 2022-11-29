/*
 *
 * Package: `@exsys-patient-insurance/labeled-view-like-input`.
 *
 */
import LabeledInput from "@exsys-patient-insurance/labeled-input";
import Flex from "@exsys-patient-insurance/flex";
import { LabeledViewLikeInputProps } from "./index.interface";

const LabeledViewLikeInput = ({
  value,
  children,
  minWidth,
  padding,
  bordered,
  align,
  ellipsis,
  lineheight,
  justify,
  onClick,
  color,
  fontSize,
  fontWeight,
  ...props
}: LabeledViewLikeInputProps) => (
  <LabeledInput {...props} value={value}>
    <Flex
      width="100%"
      height="32px"
      lineheight={lineheight}
      minWidth={minWidth}
      bordered={bordered}
      padding={padding}
      align={align}
      ellipsis={ellipsis}
      justify={justify}
      onClick={onClick}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children || value}
    </Flex>
  </LabeledInput>
);
LabeledViewLikeInput.defaultProps = {
  padding: "0 6px",
  bordered: true,
  lineheight: "32px",
};

export default LabeledViewLikeInput;
