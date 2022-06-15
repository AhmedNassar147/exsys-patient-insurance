/*
 *
 * Styled: `@exsys-patient-insurance/drawer`.
 *
 */
import styled, { css, keyframes } from "styled-components";
import Modal from "@exsys-patient-insurance/modal";
import { DrawerBaseProps } from "./index.interface";

const createFirstTransitionTransformXValue = ({
  isRightToLeft,
  placement,
  width,
}: DrawerBaseProps) => {
  const invisibleAreaSize = width;
  const isRightToLeftBoolean = isRightToLeft === "true";

  let transformX = "";
  switch (placement) {
    case "right":
      transformX = !isRightToLeftBoolean
        ? `calc(100vw - ${invisibleAreaSize} + 150px)`
        : `${invisibleAreaSize}`;
      break;

    case "left":
      transformX = isRightToLeftBoolean
        ? `calc(${invisibleAreaSize} - 150px - 100vw)`
        : `-${invisibleAreaSize}`;
      break;

    default:
      transformX = isRightToLeftBoolean
        ? `${invisibleAreaSize}`
        : `-${invisibleAreaSize}`;
      break;
  }

  return transformX;
};

const createLastTransitionTransformXValue = ({
  isRightToLeft,
  placement,
  width,
}: DrawerBaseProps) => {
  const invisibleAreaSize = width;
  const isRightToLeftBoolean = isRightToLeft === "true";

  let transformX = "";
  switch (placement) {
    case "right":
      transformX = !isRightToLeftBoolean
        ? `calc(100vw - ${invisibleAreaSize})`
        : `0px`;
      break;

    case "left":
      transformX = !isRightToLeftBoolean
        ? `0px`
        : `calc(${invisibleAreaSize} - 100vw)`;
      break;

    default:
      transformX = "0px";
      break;
  }

  return transformX;
};

export const createDrawerVisiblityKeyFrame = (
  props: DrawerBaseProps
) => keyframes`
  0% {
    opacity: 0;
    transform: translateX(${createFirstTransitionTransformXValue(props)});
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
`;

const animation = (props: DrawerBaseProps) =>
  css`
    ${createDrawerVisiblityKeyFrame(props)} 0.25s linear;
    visibility: visible;
  `;

// @ts-ignore ignore this for now.
export const StyledModal: typeof Modal = styled<DrawerBaseProps>(Modal)`
  > .modal-container-wrapper {
    border-radius: 0px;
    height: ${({ height }) => height || "100%"};
    ${({ visible }) =>
      visible &&
      css`
        animation: ${animation};
        transform: translateX(${createLastTransitionTransformXValue});
      `};
  }
`;
