/*
 *
 * Component: `PatientHistoryWithApiQuery`.
 *
 */
import { forwardRef, memo, useCallback, useImperativeHandle } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import { MIN_PATIENT_FILE_NO_LENGTH } from "@exsys-patient-insurance/global-app-constants";
import {
  RecordTypeWithAnyValue,
  CapitalBooleanStringType,
  ApiIdsTypes,
  OnResponseActionType,
} from "@exsys-patient-insurance/types";
import PatientHistoryView from "./PatientHistoryView";
import { PatientHistoryWithAPiQueryRefType } from "../index.interface";

export const INITIAL_FORM_STATE = {
  noData: false,
  htmlString: "",
  current_doctor_only: "N" as CapitalBooleanStringType,
  current_specialty_only: "N" as CapitalBooleanStringType,
};

const skipPatientHistoryQuery = ({ patientfileno }: RecordTypeWithAnyValue) =>
  !patientfileno || patientfileno.length < MIN_PATIENT_FILE_NO_LENGTH;

interface PatientHistoryWithApiQueryProps {
  apiId: ApiIdsTypes;
  maxHeight?: string;
  apiParams?: RecordTypeWithAnyValue;
  skipQuery?: boolean | ((params: RecordTypeWithAnyValue) => boolean);
}

const PatientHistoryWithApiQuery = (
  { maxHeight, apiParams, skipQuery, apiId }: PatientHistoryWithApiQueryProps,
  ref: PatientHistoryWithAPiQueryRefType
) => {
  const {
    values: { noData, htmlString, current_doctor_only, current_specialty_only },
    handleChange,
    handleChangeMultipleInputs,
  } = useFormManager({
    initialValues: INITIAL_FORM_STATE,
  });

  const handleHistoryResponse: OnResponseActionType<RecordTypeWithAnyValue> =
    useCallback(
      ({ apiValues }) => {
        const { patientHtml } = apiValues || {};

        const noData = !Boolean(patientHtml);

        handleChangeMultipleInputs({
          noData,
          htmlString: noData ? "" : patientHtml,
        });
      },
      [handleChangeMultipleInputs]
    );

  const { loading, runQuery } = useBasicQuery({
    apiId: apiId,
    skipQuery:
      typeof skipQuery === "undefined" ? skipPatientHistoryQuery : skipQuery,
    callOnFirstRender: true,
    onResponse: handleHistoryResponse,
    params: {
      ...apiParams,
      current_doctor_only,
      current_specialty_only,
    },
  });

  useImperativeHandle(ref, () => ({
    fetchPatientHistory: (apiParams?: RecordTypeWithAnyValue) =>
      runQuery(apiParams),
  }));

  const onOptionChanged = useCallback(
    (fieldName: string) => {
      const values = {
        current_doctor_only,
        current_specialty_only,
      };

      const nextValue = values[fieldName as keyof typeof values];

      handleChange({
        name: fieldName,
        value: nextValue === "N" ? "Y" : "N",
      });
    },
    [current_doctor_only, current_specialty_only, handleChange]
  );

  return (
    <PatientHistoryView
      onOptionChanged={onOptionChanged}
      htmlString={htmlString}
      current_doctor_only={current_doctor_only}
      current_specialty_only={current_specialty_only}
      loading={loading}
      noData={noData}
      noborder
      maxHeight={maxHeight}
    />
  );
};

// @ts-ignore ignore the react `forwardRef` misleading types.
export default memo(forwardRef(PatientHistoryWithApiQuery));
