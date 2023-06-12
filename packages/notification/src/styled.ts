/*
 *
 * Styled: `@exsys-patient-insurance/notification`.
 *
 */
import styled, { css, keyframes } from "styled-components";
import {
  fontSizes,
  zIndices,
  colors,
} from "@exsys-patient-insurance/theme-values";
import { BaseText } from "@exsys-patient-insurance/text";
import { BaseNotificationItemProps } from "./index.interface";

const keyFrameToRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const notificationPropsBasedType = {
  info: {
    backgroundColor: colors.white,
    color: colors.black2,
  },
  success: {
    backgroundColor: colors.lightGreen,
    color: colors.white,
  },
  error: {
    backgroundColor: colors.red,
    color: colors.white,
  },
  warning: {
    backgroundColor: colors.red23,
    color: colors.white,
  },
};

const animation = () => css`
  ${keyFrameToRight} 0.7s
`;

const topRightCss = `
  top: 1rem;
  right: 1rem;
  animation: ${animation};
`;

export const Container = styled.div`
  font-size: ${fontSizes.ff8};
  position: fixed;
  z-index: ${zIndices.loaderFallback};
  ${topRightCss};
`;

export const NotificationItem = styled.div<BaseNotificationItemProps>`
  margin-bottom: 1rem;
  border-radius: 4px;
  box-shadow: 0 0 10px #999;
  opacity: 0.9;
  transition: 0.3s ease;
  min-height: 50px;
  max-height: 200px;
  width: 365px;
  padding: 10px;
  ${topRightCss};
  &:hover {
    box-shadow: 0 0 12px ${colors.white};
    opacity: 1;
  }
  ${({ type }) => {
    const { backgroundColor, color } =
      notificationPropsBasedType[type || "info"];

    return `
      background-color: ${backgroundColor};
      color: ${color};
  `;
  }};
`;

export const NotificationTitle = styled(BaseText)`
  font-weight: 700;
  font-size: ${fontSizes.ff8};
  margin-top: 0;
  margin-bottom: 6px;
  width: 300px;
  min-height: 18px;
  color: currentColor;
`;

export const NotificationDescription = styled(BaseText)`
  margin: 0;
  color: currentColor;
`;

export const StyledButton = styled.button`
  float: right;
  background: none;
  border: none;
  opacity: 0.8;
  cursor: pointer;
  color: currentColor;
`;
