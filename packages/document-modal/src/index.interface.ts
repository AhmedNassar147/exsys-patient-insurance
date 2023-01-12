/*
 *
 * Types: `@exsys-patient-insurance/document-modal`.
 *
 */
import { ButtonTypes } from "@exsys-patient-insurance/button";
import {
  DocumentReportDataType,
  StringNumber,
} from "@exsys-patient-insurance/types";

export interface BasePdfProps {
  title?: React.ReactNode;
  onModalClose?: () => void;
}

export interface BaseDocumentModalProps extends BasePdfProps {
  linkUrl: string;
  icon?: React.ReactNode;
  documentName: string;
  noButton?: boolean;
  blockButton?: boolean;
  usePrintIcon?: boolean;
  buttonLabel?: string;
  buttonWidth?: string;
  iconType?: ButtonTypes;
  buttonDisabled?: boolean;
}

export interface PdfDocumentModalIProps
  extends Omit<BaseDocumentModalProps, "linkUrl"> {
  reportData?: DocumentReportDataType;
  reportVisitId?: StringNumber;
}

export interface PdfDocumentWithTitleOptionsProps
  extends Omit<BasePdfProps, "title"> {
  documentNames: string[];
  activeName?: string;
  icon?: React.ReactNode;
  reportVisitId?: StringNumber;
  noButton?: boolean;
  usePrintIcon?: boolean;
  reportData?: DocumentReportDataType;
  iconType?: ButtonTypes;
  buttonLabel?: string;
  buttonWidth?: string;
}

export interface PdfDocumentModalSwiperProps extends BasePdfProps {
  reportData: DocumentReportDataType;
  documentNames: string[];
  onSelectedDocumentName?: (currentName: string) => void;
  printFormatOrFormats?: string | string[];
}
