/*
 *
 * Component: `PdfDocumentModal`.
 *
 */
import { forwardRef, memo } from "react";
import BaseDocumentModal from "./BaseDocumentModal";
import { ModalTogglerRef } from "@exsys-patient-insurance/types";
import useCreateDocumentUrl from "../hooks/useCreateDocumentUrl";
import { PdfDocumentModalIProps } from "../index.interface";

const PdfDocumentModal = (
  { reportData, reportVisitId, documentName, ...props }: PdfDocumentModalIProps,
  ref: ModalTogglerRef
) => {
  const [linkUrl] = useCreateDocumentUrl({
    reportData,
    documentNameOrNames: documentName,
    reportVisitId,
  });

  return (
    <BaseDocumentModal
      ref={ref}
      {...props}
      documentName={documentName}
      linkUrl={linkUrl}
    />
  );
};

// @ts-ignore ignore the react `forwardRef` misleading types.
export default memo(forwardRef(PdfDocumentModal));
