/*
 *
 * Styled: `@exsys-clinio/drop-down`.
 *
 */
import styled from "styled-components";
import Modal, { ModalProps } from "@exsys-clinio/modal";
import { InternalTriggerProps } from "./index.interface";

interface ModalWrapperProps extends ModalProps {
  top: string;
  left: string;
  right: string;
  isRightToLeft: string;
}

export const StyledModal = styled(Modal)<ModalWrapperProps>`
  background-color: transparent;
  > .modal-container-wrapper {
    ${({ top, left, right, width, isRightToLeft }) => `
      width: ${width};
      max-width: ${width};
      top: ${top};
      ${
        isRightToLeft === "true"
          ? `right: calc(100vw - ${right})`
          : `
        left: ${left};
        right: ${right};
      `
      };
    `};
    border-radius: 3px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const InternalTrigger = styled.div<InternalTriggerProps>`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: ${({ triggerWidth }) => triggerWidth};
  ${({ margin }) =>
    margin &&
    `
    margin: ${margin};
  `};
  &:hover,
  &:focus {
    outline: none;
    border: none;
  }
  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed !important;
  `}
`;
