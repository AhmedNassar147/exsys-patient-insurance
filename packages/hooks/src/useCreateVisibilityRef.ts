/*
 *
 * Hook: `useCreateVisibilityRef`.
 *
 */
import { useCallback, useImperativeHandle } from "react";
import { useOpenCloseActionsWithState } from "./useOpenCloseActionsWithState";
import { ModalTogglerRef } from "@exsys-patient-insurance/types";

interface IProp {
  ref: ModalTogglerRef;
  onClose?: () => void;
}

const useCreateVisibilityRef = ({ ref, onClose }: IProp) => {
  const { visible, handleClose, handleOpen } =
    useOpenCloseActionsWithState(false);

  const _handleClose = useCallback(() => {
    handleClose();
    onClose?.();
  }, [onClose, handleClose]);

  const toggleModal = useCallback(() => {
    if (visible) {
      _handleClose();
      return;
    }

    handleOpen();
  }, [handleOpen, _handleClose, visible]);

  useImperativeHandle(ref, () => ({
    toggle: toggleModal,
    handleClose: _handleClose,
    handleOpen,
  }));

  return {
    visible,
    toggleModal,
    handleOpen,
    handleClose: _handleClose,
  };
};

export default useCreateVisibilityRef;
