/*
 *
 * Styled: `@exsys-patient-insurance/swipe-views`.
 *
 */
import styled from "styled-components";
import { colors } from "@exsys-patient-insurance/theme-values";
import {
  BaseSwipeViewsProps,
  SwipeFrameProps,
} from "@exsys-patient-insurance/types";

export const SwipeWrapper = styled.div<BaseSwipeViewsProps>`
  display: inline-flex;
  background: ${colors.white};
  flex-flow: row nowrap;
  &:focus {
    outline: none;
  }
  ${({ width, height, margin }) => `
    width: ${width};
    height: ${height};
    margin: ${margin};
  `};
  white-space: nowrap;
  overflow: hidden;
  will-change: scroll-position;
  position: relative;
  -webkit-overflow-scrolling: touch;
`;

export const FramesWrapper = styled.div<SwipeFrameProps>`
  width: inherit;
  display: block;
  box-sizing: border-box;
  transition-duration: 0.9s;
  transition-property: all;
  transform: ${({ transformValue }) => `translateX(${transformValue})`};
`;

export const SwipeFrame = styled.div<{ alignFrameContent?: string }>`
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: ${({ alignFrameContent }) => alignFrameContent || "center"};
  flex: 0 0 auto;
  overflow: hidden;
  vertical-align: top;
  white-space: normal;
  border-radius: 0;
  padding: 0;
`;
SwipeFrame.defaultProps = {
  // @see {@link https://www.w3.org/TR/wai-aria-practices/#carousel}
  "aria-roledescription": "slide",
  role: "group",
};
