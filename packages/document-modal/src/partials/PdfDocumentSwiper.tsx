/*
 *
 * Component: `PdfDocumentModalSwiper`.
 *
 */
import { forwardRef, memo, useCallback } from "react";
import { useCreateVisibilityRef } from "@exsys-patient-insurance/hooks";
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";
import { ModalTogglerRef } from "@exsys-patient-insurance/types";
import useCreateDocumentUrl from "../hooks/useCreateDocumentUrl";
import { PdfDocumentModalSwiperProps } from "../index.interface";

const LazyLoadedModalCarousel = createLazyLoadedComponent(
  () =>
    import(
      "@exsys-patient-insurance/modal-carousel" /* webpackChunkName: "app-structure.modal-carousel" */
    )
);

const PdfDocumentModalSwiper = (
  {
    reportData,
    documentNames,
    title,
    onModalClose,
    onSelectedDocumentName,
    printFormatOrFormats,
  }: PdfDocumentModalSwiperProps,
  ref: ModalTogglerRef
) => {
  const urls = useCreateDocumentUrl({
    reportData,
    printFormatOrFormats,
    documentNameOrNames: documentNames,
  });

  const { toggleModal, visible } = useCreateVisibilityRef({
    ref,
    onClose: onModalClose,
  });

  const onIndexChanged = useCallback(
    (currentDocumentIndex: number) => {
      onSelectedDocumentName?.(documentNames[currentDocumentIndex]);
    },
    [documentNames, onSelectedDocumentName]
  );

  return (
    <LazyLoadedModalCarousel
      visible={visible}
      shouldMountChunk={visible}
      onClose={toggleModal}
      title={title}
      data={urls}
      fullScreen
      destroyOnClose
      onIndexChanged={onIndexChanged}
      height="unset"
    />
  );
};

// @ts-ignore ignore the react `forwardRef` misleading types.
export default memo(forwardRef(PdfDocumentModalSwiper));
