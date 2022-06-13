/*
 *
 * Styled: `@exsys-patient-insurance/loading-icon`.
 *
 */
import styled, { keyframes } from "styled-components";
import LoadingIconProps from "./index.interface";

const loadingKeyFrames = keyframes`
    0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div<LoadingIconProps>`
  box-sizing: border-box;
  display: block;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 2px solid ${({ color }) => color};
  border-radius: 50%;
  animation-delay: -0.3s;
  animation: ${loadingKeyFrames} 1s linear infinite;
  border-color: ${({ color }) => color} transparent transparent transparent;
  &[disabled] {
    pointer-events: none;
    cursor: not-allowed;
  }
`;
