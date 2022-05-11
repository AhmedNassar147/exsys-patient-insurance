/*
 *
 * Component: `ModalFooter`.
 *
 */
import { memo, useCallback } from "react";
import Button from "@exsys-clinio/button";
import { ModalFooterWrapper } from "../styled";
import { DEFAULT_MODAL_FOOTER_PROPS } from "../constants";
import { FooterProps } from "../index.interface";

const {
  okText: defaultOkText,
  cancelText: defaultCancelText,
} = DEFAULT_MODAL_FOOTER_PROPS;

const ModalFooter = ({
  onOk,
  onClose,
  loading,
  disabled,
  okText,
  cancelText,
  noCancelButton,
  withOkButton,
  className,
}: FooterProps) => {
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleOk = useCallback(() => {
    (onOk || onClose)?.();
  }, [onClose, onOk]);

  return (
    <ModalFooterWrapper className={className}>
      {!noCancelButton && (
        <Button
          onClick={handleClose}
          disabled={loading}
          type="danger"
          label={cancelText || defaultCancelText}
        />
      )}

      {withOkButton && (
        <Button
          onClick={handleOk}
          loading={loading}
          type="primary"
          disabled={disabled || loading}
          label={okText || defaultOkText}
        />
      )}
    </ModalFooterWrapper>
  );
};
ModalFooter.defaultProps = DEFAULT_MODAL_FOOTER_PROPS;

export default memo(ModalFooter);
