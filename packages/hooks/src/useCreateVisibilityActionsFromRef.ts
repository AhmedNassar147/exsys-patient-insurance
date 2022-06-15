/*
 *
 * `useCreateVisibilityActionsFromRef`: `@exsys-patient-insurance/hooks`.
 *
 */
import { useCallback } from "react";
import { ModalTogglerRef } from "@exsys-patient-insurance/types";

const useCreateVisibilityActionsFromRef = (ref: ModalTogglerRef) => {
  const toggle = useCallback(() => {
    if (ref?.current?.toggle) {
      ref.current.toggle();
    }
  }, [ref]);

  const close = useCallback(() => {
    if (ref?.current?.handleClose) {
      ref.current.handleClose();
    }
  }, [ref]);

  const open = useCallback(() => {
    if (ref?.current?.handleOpen) {
      ref.current.handleOpen();
    }
  }, [ref]);

  return {
    toggle,
    close,
    open,
  };
};

export default useCreateVisibilityActionsFromRef;
