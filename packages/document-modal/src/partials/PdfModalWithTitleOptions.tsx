/*
 *
 * Component: `PdfDocumentWithTitleOptions`.
 *
 */
import { memo, useState, forwardRef } from "react";
import { ModalTogglerRef } from "@exsys-patient-insurance/types";
import PdfDocumentModal from "./PdfDocumentModal";
import TitleOptions from "./TitleOptions";
import { PdfDocumentWithTitleOptionsProps } from "../index.interface";

const PdfDocumentWithTitleOptions = (
  {
    documentNames,
    activeName,
    reportVisitId,
    icon,
    onModalClose,
    noButton,
    reportData,
    usePrintIcon,
    iconType = "default",
    buttonLabel,
    buttonWidth,
  }: PdfDocumentWithTitleOptionsProps,
  ref?: ModalTogglerRef
) => {
  const [documentName, setDocumentName] = useState<string>(
    activeName || documentNames[0]
  );

  const titleComponent = (
    <TitleOptions
      options={documentNames}
      activeOption={documentName}
      onChange={setDocumentName}
    />
  );

  return (
    <PdfDocumentModal
      documentName={documentName}
      reportVisitId={reportVisitId}
      icon={icon}
      usePrintIcon={usePrintIcon}
      iconType={iconType}
      onModalClose={onModalClose}
      title={titleComponent}
      noButton={noButton}
      reportData={reportData}
      buttonWidth={buttonWidth}
      buttonLabel={buttonLabel}
      ref={ref}
    />
  );
};
// @ts-ignore ignore the react `forwardRef` misleading types.
export default memo(forwardRef(PdfDocumentWithTitleOptions));
