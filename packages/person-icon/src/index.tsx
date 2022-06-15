/*
 *
 * Package: `@exsys-patient-insurance/person-icon`.
 *
 */
import { memo } from "react";
import BaseStyledSvg, {
  BaseStyledSvgProps,
} from "@exsys-patient-insurance/base-styled-svg";
import { colors } from "@exsys-patient-insurance/theme-values";

const { blue2 } = colors;

const PersonIcon = (props: BaseStyledSvgProps) => (
  <BaseStyledSvg {...props}>
    <path
      fillRule="evenodd"
      d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    />
  </BaseStyledSvg>
);
PersonIcon.defaultProps = {
  viewBox: "0 0 16 16",
  width: "1.4em",
  height: "1.4em",
  color: blue2,
  alignSelf: "center",
};

export default memo(PersonIcon);
