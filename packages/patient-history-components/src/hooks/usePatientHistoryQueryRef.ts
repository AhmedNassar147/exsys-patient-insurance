/*
 *
 * Hook: `usePatientHistoryQueryRef`.
 *
 */
import { useRef, useCallback } from "react";
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";
import { PatientHistoryWithAPiQueryRefValuesType } from "../index.interface";

const usePatientHistoryQueryRef = () => {
  const queryablePatientHistoryRef =
    useRef<PatientHistoryWithAPiQueryRefValuesType>(null);

  const fetchPatientHistory = useCallback(
    (apiParams?: RecordTypeWithAnyValue) =>
      queryablePatientHistoryRef.current?.fetchPatientHistory?.(apiParams),
    [queryablePatientHistoryRef]
  );

  return {
    queryablePatientHistoryRef,
    fetchPatientHistory,
  };
};

export default usePatientHistoryQueryRef;
