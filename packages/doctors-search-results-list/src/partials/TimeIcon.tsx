/*
 *
 * Component: `TimeIcon`.
 *
 */
import { memo } from "react";
import { colors } from "@exsys-patient-insurance/theme-values";
import BaseStyledSvg from "@exsys-patient-insurance/base-styled-svg";

const TimeIcon = memo(() => (
  <BaseStyledSvg
    alignSelf="flex-start"
    width="25"
    height="24"
    viewBox="0 0 25 24"
  >
    <path
      d="M10.8257 12.8105L14.7388 15.8431C14.8824 15.9477 15.0619 16 15.2773 16C15.4568 16 15.6363 15.9477 15.7799 15.8693C16.0671 15.6601 16.0671 15.3464 15.8158 15.1373L11.8668 12.0784C11.8668 11.9216 11.795 11.7908 11.6514 11.6863V8.52288C11.6514 8.23529 11.3283 8 10.9334 8C10.5385 8 10.2154 8.23529 10.2154 8.52288V11.6863C10.0718 11.7908 10 11.9477 10 12.1046C10 12.4706 10.359 12.7582 10.8257 12.8105Z"
      fill={colors.appPrimary}
    />
    <path
      d="M4 16.8774C4 18.9677 5.03226 20 7.12258 20H16.8774C18.9677 20 20 18.9677 20 16.8774V7.12258C20 5.03226 18.9677 4 16.8774 4H7.12258C5.03226 4 4 5.03226 4 7.12258V16.8774ZM12 5.29032C15.6903 5.29032 18.7097 8.30968 18.7097 12C18.7097 15.6903 15.6903 18.7097 12 18.7097C8.30968 18.7097 5.29032 15.6903 5.29032 12C5.29032 8.30968 8.30968 5.29032 12 5.29032Z"
      fill={colors.appPrimary}
    />
  </BaseStyledSvg>
));

export default TimeIcon;
