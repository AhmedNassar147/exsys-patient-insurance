/*
 *
 * document: `@exsys-patient-insurance/types`.
 *
 */
import { RecordTypeWithAnyValue } from "./base.interface";

export type DocumentReportItemType = RecordTypeWithAnyValue;

export type DocumentReportDataType =
  | DocumentReportItemType
  | DocumentReportItemType[];
