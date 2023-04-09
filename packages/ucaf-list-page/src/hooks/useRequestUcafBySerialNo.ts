/*
 *
 * Hook: `useRequestUcafBySerialNo`.
 *
 */
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { getCurrentDateString } from "@exsys-patient-insurance/helpers";
import {
  useAppConfigStore,
  useGlobalProviderNo,
} from "@exsys-patient-insurance/app-config-store";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import {
  OnResponseActionType,
  onChangeEvent,
} from "@exsys-patient-insurance/types";
import { initialValues } from "../constants";
import { RequestsDataType } from "../index.interface";

const { requestsData } = initialValues;

const {
  details: {
    ucafe_type: defaultUcafType,
    claim_flag: defaultClaimType,
    stamped: defaultStamped,
    agreed: defaultAgreed,
    expected_days: defaultNoOfDays,
    expected_amount: defaultAmount,
    written_by_doctor: defaultWrittenByDoctor,
  },
} = requestsData;

interface UseRequestUcafBySerialNoOptions {
  handleChange: onChangeEvent;
  root_organization_no: string;
  patient_card_no: string;
  paper_serial: string;
  isHospitalUser: boolean;
}

const useRequestUcafBySerialNo = ({
  handleChange,
  root_organization_no,
  patient_card_no,
  paper_serial,
  isHospitalUser,
}: UseRequestUcafBySerialNoOptions) => {
  const { addNotification } = useAppConfigStore();
  const globalProviderNo = useGlobalProviderNo();
  const { pageType } = useParams();

  const handleRequestsResponse: OnResponseActionType<RequestsDataType> =
    useCallback(
      ({ apiValues, error }) => {
        const { details } = apiValues || {};
        const {
          doctor_provider_no,
          doctor_provider_name,
          ucafe_type,
          claim_flag,
          ucafe_date,
          stamped,
          agreed,
          expected_days,
          expected_amount,
          written_by_doctor,
          primary_diagnosis,
          primary_diag_code,
          patientExceedLimit,
        } = details || {};

        if (!doctor_provider_no && !error) {
          addNotification({
            type: "error",
            message: "invldsrialno",
          });
        }

        const hasPatientExceededLimits = patientExceedLimit === "Y";

        if (hasPatientExceededLimits) {
          addNotification({
            type: "error",
            message: "ptntexceedlimit",
          });
        }

        if (error) {
          addNotification({
            type: "error",
            message: error,
            duration: 4000,
          });
        }

        const data = {
          ...(error || !apiValues
            ? initialValues.requestsData
            : {
                ...apiValues,
                details: {
                  ...details,
                  ucafe_type: ucafe_type || defaultUcafType,
                  claim_flag: claim_flag || defaultClaimType,
                  ucafe_date:
                    ucafe_date || getCurrentDateString({ useDateTime: true }),
                  stamped: stamped || defaultStamped,
                  agreed: agreed || defaultAgreed,
                  expected_days: expected_days || defaultNoOfDays,
                  expected_amount: expected_amount || defaultAmount,
                  written_by_doctor:
                    written_by_doctor || defaultWrittenByDoctor,
                  doctor_name: isHospitalUser ? doctor_provider_name : "",
                },
              }),
          isNewConsultation: !primary_diagnosis && !primary_diag_code,
          hasPatientExceededLimits,
        };

        handleChange({
          name: "requestsData",
          value: data,
        });
      },
      [handleChange, addNotification]
    );

  const { runQuery: fetchUcafRequests, loading: requestsLoading } =
    useBasicQuery<RequestsDataType>({
      apiId: "QUERY_UCAF_REQUESTS_DATA",
      disableParamsChangeCheck: true,
      onResponse: handleRequestsResponse,
      checkAllParamsValuesToQuery: true,
      params: {
        root_organization_no,
        patient_card_no: patient_card_no,
        paper_serial,
        provider_no: globalProviderNo,
        pageType,
      },
    });

  return {
    fetchUcafRequests,
    requestsLoading,
  };
};

export default useRequestUcafBySerialNo;
