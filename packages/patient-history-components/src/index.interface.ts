/*
 *
 * Types: `@exsys-patient-insurance/patient-history-components`.
 *
 */
import {
  CapitalBooleanStringType,
  RecordTypeWithAnyValue,
} from "@exsys-patient-insurance/types";

export interface HistoryContainerViewProps {
  minHeight?: string;
  maxHeight?: string;
  fullscreen?: boolean;
  noborder?: boolean;
  isDrawerHistory?: boolean;
}

export interface HistoryViewProps extends HistoryContainerViewProps {
  loading?: boolean;
  noData?: boolean;
  htmlString: string;
  current_doctor_only?: CapitalBooleanStringType;
  current_specialty_only?: CapitalBooleanStringType;
  getHistory?: () => void;
  onOptionChanged?: (fieldName: string) => void;
  onToggle?: () => void;
  noHistoryLabel?: boolean;
  hideButtonOptions?: boolean;
}

export type PatientHistoryWithAPiQueryRefValuesType = {
  fetchPatientHistory: (apiParams?: RecordTypeWithAnyValue) => Promise<void>;
};

export type PatientHistoryWithAPiQueryRefType = React.MutableRefObject<
  PatientHistoryWithAPiQueryRefValuesType | undefined
>;
