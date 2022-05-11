/*
 *
 * Package: `@exsys-clinio/arrow-icon`.
 *
 */
import { memo, useMemo } from "react";
import BaseStyledSvg, {
  BaseStyledSvgProps,
} from "@exsys-clinio/base-styled-svg";
import { useMakeSelectIsRTLLayout } from "@exsys-clinio/app-config-store";
import { colors } from "@exsys-clinio/theme-values";
import { ArrowDirectionType } from "@exsys-clinio/types";

const { inputLabelColor } = colors;

interface ArrowIconProps extends BaseStyledSvgProps {
  direction?: ArrowDirectionType;
  keepDirection?: boolean;
}

// NOTE, original direction is pointing to right when `ltr`.
const ArrowIcon = ({ direction, keepDirection, ...props }: ArrowIconProps) => {
  const isRightToLeft = useMakeSelectIsRTLLayout();

  const svgTransform = useMemo(() => {
    let rotateValue = "0";
    switch (direction) {
      case "left":
        rotateValue = isRightToLeft && !keepDirection ? "0" : "180";
        break;
      case "down":
        rotateValue = "90";
        break;
      case "up":
        rotateValue = "-90";
        break;
      default:
        rotateValue = isRightToLeft && !keepDirection ? "180" : "0";
    }

    return `rotate(${rotateValue})`;
  }, [keepDirection, direction, isRightToLeft]);

  return (
    <BaseStyledSvg {...props} transform={svgTransform}>
      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
    </BaseStyledSvg>
  );
};
ArrowIcon.defaultProps = {
  color: inputLabelColor,
};
export default memo(ArrowIcon);
