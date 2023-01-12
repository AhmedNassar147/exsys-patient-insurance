/*
 *
 * Hook: `useCreateDocumentUrl`.
 *
 */
import { useMemo, useCallback } from "react";
import {
  useMakeSelectReportData,
  useMakeSelectCurrentLanguageId,
  useMakeSelectIsRTLLayout,
} from "@exsys-patient-insurance/app-config-store";
import {
  DocumentReportDataType,
  DocumentReportItemType,
} from "@exsys-patient-insurance/types";

import generateParams from "../helpers/generateParams";

const defaultOptions = {
  printFormatOrFormats: "pdf",
};

type IConfig = {
  printFormatOrFormats?: string | string[];
  documentNameOrNames: string | string[];
  reportVisitId?: string | number;
  reportData?: DocumentReportDataType;
};

const useCreateDocumentUrl = (options: IConfig) => {
  const {
    printFormatOrFormats,
    documentNameOrNames,
    reportVisitId,
    reportData,
  } = {
    ...defaultOptions,
    ...options,
  };

  const reportWithVisitId = reportVisitId
    ? { P_VISIT_NO: reportVisitId }
    : null;

  const language_id = useMakeSelectCurrentLanguageId();
  const isRightToLeft = useMakeSelectIsRTLLayout();
  const { reportServerUrl, reportServerId } = useMakeSelectReportData();

  const buildDocumentUrl = useCallback(
    (params: DocumentReportItemType, index: number) => {
      const { reportCode, ...otherParams } = params;
      const currentReportFormat = Array.isArray(printFormatOrFormats)
        ? printFormatOrFormats[index]
        : printFormatOrFormats;

      const parameters = generateParams({
        DESTYPE: "cache",
        desformat: currentReportFormat || "pdf",
        ENVID: isRightToLeft ? "AR" : "EN",
        LANGUAGE_ID: language_id,
        ...otherParams,
        ...reportWithVisitId,
      });

      const currentReportName =
        reportCode ||
        (Array.isArray(documentNameOrNames)
          ? documentNameOrNames[index]
          : documentNameOrNames);

      const uri = `${reportServerUrl}${
        currentReportName || ""
      }.rep+${reportServerId}+${parameters}`;

      return uri.replace(/\\/g, "\\\\");
    },
    [
      printFormatOrFormats,
      isRightToLeft,
      language_id,
      reportWithVisitId,
      documentNameOrNames,
      reportServerUrl,
      reportServerId,
    ]
  );

  return useMemo(() => {
    if (Array.isArray(reportData)) {
      return reportData.map(buildDocumentUrl);
    }

    return [buildDocumentUrl(reportData || {}, 0)];
  }, [reportData, buildDocumentUrl]);
};

export default useCreateDocumentUrl;
