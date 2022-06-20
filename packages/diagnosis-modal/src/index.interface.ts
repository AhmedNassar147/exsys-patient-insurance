/*
 *
 * Types: `@exsys-patient-insurance/diagnosis-modal`.
 *
 */
import {
  CapitalBooleanStringType,
  SmallBooleanStringType,
  RecordType,
} from "@exsys-patient-insurance/types";

export interface DiagnosisItemType {
  user_code: string;
  diag_code: number;
  diage_name: string;
  chronic_flag: CapitalBooleanStringType;
  acute_flag: CapitalBooleanStringType;
  favorite: SmallBooleanStringType;
}

export type OnSelectDiagnosisType = (item: DiagnosisItemType) => void;

export interface DiagnosisModalProps {
  visible: boolean;
  onClose: () => void;
  departmentId: number;
  onSelectDiagnosis: OnSelectDiagnosisType;
}

export type ResponseType = RecordType<DiagnosisItemType[]>;
