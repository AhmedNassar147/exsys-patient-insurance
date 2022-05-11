/*
 *
 * Component: `Modal`.
 *
 */
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import {
  useOpenCloseActionsWithState,
  useStopPropagation,
} from "@exsys-clinio/hooks";
import CloseIcon from "@exsys-clinio/close-icon";
import { colors } from "@exsys-clinio/theme-values";
import { ModalTogglerRef } from "@exsys-clinio/types";
import ModalFooter from "./ModalFooter";
import { DEFAULT_MODAL_PROPS } from "../constants";
import {
  ModalMaskContainer,
  ModalContentWrapper,
  ModalHeader,
  ModalBody,
  ModalTitle,
} from "../styled";
import { ModalProps } from "../index.interface";

const exsysPortalElement = document?.querySelector?.("#exsys-portals");

const Modal = (props: ModalProps, ref: ModalTogglerRef) => {
  const {
    visible,
    onClose,
    maskClosable,
    title,
    noFooter,
    destroyOnClose,
    children,
    closable,
    height,
    width,
    topSpace,
    className,
    fullScreen,
    noCancelButton,
    afterClose,
    noHeader,
    bodyMaxHeight,
    bodyPadding,
    keyboard,
    zIndex,
    usePortal,
    alignMask,
    justifyMask,
    onlyAllowCloseActionWhenNotClosable,
    onContextMenu,
    bodyMinHeight,
    closeIconSize,
    reverseHeader,
    ...modalFooterProps
  } = { ...DEFAULT_MODAL_PROPS, ...props };

  const {
    visible: modalVisible,
    handleClose: closeModalAction,
    handleOpen: openModalAction,
    setVisibility,
  } = useOpenCloseActionsWithState(() => visible || false);

  const isFirstRenderRef = useRef(true);

  useEffect(
    () => {
      if (typeof visible === "boolean" && visible !== modalVisible) {
        isFirstRenderRef.current = false;
        setVisibility(() => visible);
      }
    },
    // eslint-disable-next-line
    [visible, isFirstRenderRef]
  );

  const handleClose = useCallback(() => {
    if (!closable && !onlyAllowCloseActionWhenNotClosable) {
      return;
    }

    isFirstRenderRef.current = false;

    closeModalAction();
    onClose?.();
    afterClose?.();
  }, [
    closable,
    onClose,
    closeModalAction,
    afterClose,
    onlyAllowCloseActionWhenNotClosable,
    isFirstRenderRef,
  ]);

  const handleOpen = useCallback(() => {
    isFirstRenderRef.current = false;
    openModalAction();
  }, [openModalAction, isFirstRenderRef]);

  const toggle = useCallback(() => {
    if (modalVisible) {
      handleClose();
      return;
    }

    handleOpen();
  }, [handleClose, modalVisible, handleOpen]);

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === "Escape" && modalVisible) {
        handleClose();
      }
    },
    [handleClose, modalVisible]
  );

  useEffect(() => {
    if (keyboard) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (keyboard) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleKeyDown, keyboard]);

  useImperativeHandle(ref, () => ({
    handleClose,
    handleOpen,
    toggle,
  }));

  const preventBodyToClose = useStopPropagation();

  const shouldDestroyModal =
    (isFirstRenderRef.current && !modalVisible) ||
    (!modalVisible && destroyOnClose);

  if (shouldDestroyModal) {
    return null;
  }

  const modalNode = (
    <>
      <ModalMaskContainer
        visible={modalVisible}
        onClick={maskClosable ? handleClose : undefined}
        zIndex={zIndex}
        alignMask={alignMask}
        justifyMask={justifyMask}
        className={className}
        onContextMenu={onContextMenu || preventBodyToClose}
      >
        <ModalContentWrapper
          onClick={preventBodyToClose}
          visible={modalVisible}
          height={height}
          width={width}
          topSpace={topSpace}
          fullScreen={fullScreen}
          zIndex={zIndex}
          className="modal-container-wrapper"
        >
          {!noHeader && (
            <ModalHeader
              align="center"
              justify="space-between"
              reverse={reverseHeader}
            >
              <ModalTitle
                children={title}
                tag={typeof title === "string" ? "p" : "fragment"}
              />
              {closable && (
                <CloseIcon
                  hoverColor={colors.appPrimary}
                  onClick={handleClose}
                  width="24px"
                  size={closeIconSize}
                />
              )}
            </ModalHeader>
          )}
          <ModalBody
            bodyMaxHeight={bodyMaxHeight}
            bodyPadding={bodyPadding}
            bodyMinHeight={bodyMinHeight}
          >
            {children}
          </ModalBody>
          {!noFooter && (
            <ModalFooter
              onClose={handleClose}
              noCancelButton={!closable || noCancelButton}
              {...modalFooterProps}
            />
          )}
        </ModalContentWrapper>
      </ModalMaskContainer>
    </>
  );

  return usePortal
    ? createPortal(modalNode, exsysPortalElement as Element)
    : modalNode;
};

// @ts-ignore ignore the react `forwardRef` misleading type.
export default forwardRef(Modal);
