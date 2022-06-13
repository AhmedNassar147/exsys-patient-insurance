/*
 *
 * Types: `@exsys-patient-insurance/modal`.
 *
 */
export interface ModalMaskProps {
  visible?: boolean;
  zIndex?: number;
  alignMask?: string;
  justifyMask?: string;
}

export interface ModalBodyProps extends ModalMaskProps {
  width?: string;
  height?: string;
  topSpace?: string;
  fullScreen?: boolean;
  bodyMaxHeight?: string;
  bodyPadding?: string;
  zIndex?: number;
  bodyMinHeight?: string;
}

export interface FooterProps {
  onClose?: () => void;
  onOk?: () => void;
  loading?: boolean;
  disabled?: boolean;
  okText?: string;
  cancelText?: string;
  noCancelButton?: boolean;
  withOkButton?: boolean;
  className?: string;
}

export interface BaseProps
  extends FooterProps,
    ModalBodyProps,
    React.PropsWithChildren<{
      title?: React.ReactNode;
      noFooter?: boolean;
      destroyOnClose?: boolean;
      closable?: boolean;
      afterClose?: () => void;
      noHeader?: boolean;
    }> {}

export interface ModalProps extends BaseProps {
  maskClosable?: boolean;
  keyboard?: boolean;
  onlyAllowCloseActionWhenNotClosable?: boolean;
  usePortal?: boolean;
  closeIconSize?: string;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  reverseHeader?: boolean;
}
