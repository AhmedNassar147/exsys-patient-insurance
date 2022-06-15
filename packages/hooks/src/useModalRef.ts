/*
 *
 * `useModalRef`: `@exsys-patient-insurance/hooks`.
 *
 */
import { useRef } from "react";
import { ModalToggleTypeForRef } from "@exsys-patient-insurance/types";
import useCreateVisibilityActionsFromRef from "./useCreateVisibilityActionsFromRef";

const useModalRef = () => {
  const modalRef = useRef<ModalToggleTypeForRef>();

  const handlers = useCreateVisibilityActionsFromRef(modalRef);

  return {
    ...handlers,
    modalRef,
  };
};

export default useModalRef;
