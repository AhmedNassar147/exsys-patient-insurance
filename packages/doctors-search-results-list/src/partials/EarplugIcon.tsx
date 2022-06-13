/*
 *
 * Component: `EarplugIcon`.
 *
 */
import { memo } from "react";
import { colors } from "@exsys-patient-insurance/theme-values";
import BaseStyledSvg from "@exsys-patient-insurance/base-styled-svg";

const EarplugIcon = memo(() => (
  <BaseStyledSvg
    alignSelf="flex-start"
    width="25"
    height="24"
    viewBox="0 0 25 24"
  >
    <path
      fill={colors.appPrimary}
      d="M8.333 4v1.684H6.667v3.369c0 1.86 1.491 3.368 3.333 3.368s3.333-1.507 3.333-3.368V5.684h-1.666V4h2.5c.46 0 .833.377.833.842v4.21c0 2.504-1.802 4.582-4.167 4.983v1.333c0 1.628 1.306 2.948 2.917 2.948a2.92 2.92 0 002.73-1.906A2.523 2.523 0 0115 14.105c0-1.395 1.12-2.526 2.5-2.526s2.5 1.13 2.5 2.526a2.523 2.523 0 01-1.813 2.43C17.675 18.528 15.882 20 13.75 20c-2.532 0-4.583-2.073-4.583-4.632v-1.333C6.802 13.635 5 11.556 5 9.053v-4.21C5 4.376 5.373 4 5.833 4h2.5zm9.167 9.263a.838.838 0 00-.833.842c0 .465.373.842.833.842.46 0 .833-.377.833-.842a.838.838 0 00-.833-.842z"
    />
  </BaseStyledSvg>
));

export default EarplugIcon;
