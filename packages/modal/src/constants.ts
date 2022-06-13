/*
 *
 * Constants: `@exsys-patient-insurance/modal`.
 *
 */
import { zIndices } from "@exsys-patient-insurance/theme-values";

export const DEFAULT_MODAL_FOOTER_PROPS = Object.freeze({
  withOkButton: true,
  okText: "ok",
  cancelText: "cncl",
});

export const DEFAULT_MODAL_PROPS = Object.freeze({
  title: "Title",
  destroyOnClose: true,
  width: "810px",
  closable: true,
  maskClosable: true,
  zIndex: zIndices.modal,
  keyboard: true,
  onlyAllowCloseActionWhenNotClosable: false,
  alignMask: "center",
  justifyMask: "center",
  closeIconSize: "1.1em",
  ...DEFAULT_MODAL_FOOTER_PROPS,
});
