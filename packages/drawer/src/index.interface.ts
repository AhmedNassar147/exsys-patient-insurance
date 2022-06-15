/*
 *
 * Types: `@exsys-patient-insurance/drawer`.
 *
 */
import { ModalProps } from "@exsys-patient-insurance/modal";

type DrawerPlacement = "right" | "left" | undefined;

export interface DrawerBaseProps extends Omit<ModalProps, "fullScreen"> {
  placement?: DrawerPlacement;
  isRightToLeft?: string;
}

export interface DrawerProps
  extends Omit<
    DrawerBaseProps,
    "alignMask" | "justifyMask" | "isRightToLeft"
  > {}
