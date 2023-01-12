/*
 *
 * Component: `BaseDocumentModal`.
 *
 */
import { forwardRef, memo } from "react";
import Modal from "@exsys-patient-insurance/modal";
import { useCreateVisibilityRef } from "@exsys-patient-insurance/hooks";
import { ModalTogglerRef } from "@exsys-patient-insurance/types";
import DocumentButton from "./DocumentButton";
import { BaseDocumentModalProps } from "../index.interface";

const BaseDocumentModal = (
  {
    documentName,
    icon,
    noButton,
    onModalClose,
    title,
    linkUrl,
    blockButton,
    usePrintIcon,
    buttonDisabled,
    buttonLabel,
    buttonWidth,
    iconType = "default",
  }: BaseDocumentModalProps,
  ref: ModalTogglerRef
) => {
  const { toggleModal, visible } = useCreateVisibilityRef({
    ref,
    onClose: onModalClose,
  });

  return (
    <>
      {!noButton && (
        <DocumentButton
          onClick={toggleModal}
          icon={icon}
          block={blockButton}
          usePrintIcon={usePrintIcon}
          iconType={iconType}
          disabled={buttonDisabled}
          buttonLabel={buttonLabel}
          width={buttonWidth}
        />
      )}

      <Modal
        ref={ref}
        visible={visible}
        title={title || documentName}
        fullScreen
        closable
        noFooter
        onClose={toggleModal}
        destroyOnClose
        usePortal
      >
        <object data={linkUrl} width="100%" height="100%">
          {`Your browser does not support pdf files.`}
        </object>
      </Modal>
    </>
  );
};

// @ts-ignore ignore the react `forwardRef` misleading types.
export default memo(forwardRef(BaseDocumentModal));
