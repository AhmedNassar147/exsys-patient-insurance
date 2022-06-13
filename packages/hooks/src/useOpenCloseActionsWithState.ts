/*
 *
 * `useOpenCloseActionsWithState`: `@exsys-patient-insurance/hooks`.
 *
 */
import { useState, useCallback } from "react";

export type UseOpenCloseActionsWithStateResultsType = {
  visible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
};

export const DEFAULT_OPEN_CLOSE_PROVIDER_STATE_OPTIONS: UseOpenCloseActionsWithStateResultsType =
  Object.freeze({
    visible: false,
    setVisibility: () => null,
    handleOpen: () => null,
    handleClose: () => null,
  });

export const useOpenCloseActionsWithState = (
  defaultOpen?: (() => boolean) | boolean
): UseOpenCloseActionsWithStateResultsType => {
  const [visible, setVisibility] = useState<boolean>(defaultOpen || false);

  const handleOpen = useCallback(() => setVisibility(true), []);
  const handleClose = useCallback(() => setVisibility(false), []);

  return {
    visible,
    setVisibility,
    handleOpen,
    handleClose,
  };
};
