/*
 *
 * Package: `@exsys-patient-insurance/media-queries`.
 *
 */
import {
  css,
  FlattenSimpleInterpolation,
  CSSObject,
  SimpleInterpolation,
} from "styled-components";
import { KeysOfRecord } from "@exsys-patient-insurance/types";
import { breakpoints } from "./breakpoints";

type BreakPointsKeysType = KeysOfRecord<typeof breakpoints>;
type MediaQueryType = Record<
  BreakPointsKeysType,
  (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => FlattenSimpleInterpolation
>;

// Iterate through the sizes and create a media template.
// 'xs' is from 0 to 'sm', we don't use a media query to target it: 'mobile-first'.
const media = Object.keys(breakpoints).reduce((acc, label) => {
  if (process.env.NODE_ENV !== "production") {
    if (label === "xs") {
      throw new Error("Please do not set the 'xs' breakpoint.");
    }
  }

  const viewportQuery = `(min-width: ${
    breakpoints[label as BreakPointsKeysType]
  }px)`;

  acc[label as BreakPointsKeysType] = (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media ${viewportQuery} {
      ${css(first, ...interpolations)};
    }
  `;

  return acc;
}, {} as MediaQueryType);

export default media;
