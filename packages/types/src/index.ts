/*
 *
 * Package: `@exsys-clinio/types`.
 *
 */

export interface BaseSvgProps {
  width?: string;
  height?: string;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export type ModalToggleTypeForRef = {
  handleClose: () => void;
  handleOpen: () => void;
  toggle: () => void;
};

export type ModalTogglerRef = React.MutableRefObject<
  ModalToggleTypeForRef | undefined
>;

export interface AppConfigStateType {
  languageId: number;
  authorization: number;
  isRightToLeft: boolean;
}

export * from "./base.interface";
export * from "./form-field.interface";
export * from "./network.interface";
export * from "./styledHelpers.interface";
