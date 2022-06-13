/*
 *
 * Styled : `@exsys-patient-insurance/image`
 *
 */
import styled, { css, keyframes } from "styled-components";
import { colors, spacings } from "@exsys-patient-insurance/theme-values";
import { flexCenteredRowCss } from "@exsys-patient-insurance/styled-helpers";
import { WrapperProps, VisibilityProps } from "./index.interface";

const defaultSize = "sp9";

const renderAvatarSize = ({ width, height }: WrapperProps) => css`
  width: ${spacings[width || defaultSize]};
  height: ${spacings[height || defaultSize]};
`;

const renderBorderRadius = ({ borderRadius }: VisibilityProps) =>
  borderRadius
    ? css`
        border-radius: ${borderRadius};
      `
    : "";

export const Container = styled.div<WrapperProps>`
  ${renderAvatarSize};
  ${renderBorderRadius};
  /* background-color: ${colors.grey3}; */
  position: relative;
`;

export const SmoothNoImage = styled.div<Pick<WrapperProps, "borderRadius">>`
  ${flexCenteredRowCss};
  width: 100%;
  height: 100%;
  ${renderBorderRadius};
  background-color: ${colors.grey3};
  text-transform: capitalize;
  color: ${colors.lighterBlack};
`;

export const BaseImage = styled.img<VisibilityProps>`
  transition: opacity 1s;
  width: 100%;
  height: 100%;
  ${renderBorderRadius};
  object-fit: contain;
  ${(props) => `
    opacity: ${props.visible ? 1 : 0};
  `}
`;

export const SmoothPlaceHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 245, 245, 0.34);
`;

const preloaderBlock = keyframes`
  from {
    background-position: 0%, 0;
  }
  to {
    background-position: 170%, 0;
  }
`;

export const Loader = styled.span<Pick<WrapperProps, "borderRadius">>`
  display: inline-block;
  width: 100%;
  height: 100%;
  ${renderBorderRadius};
  background-image: linear-gradient(
    to right,
    ${colors.lightGrey},
    ${colors.white},
    ${colors.lightGrey}
  );
  background-size: 200%;
  animation: ${preloaderBlock} 2s linear 0s infinite reverse forwards;
`;
