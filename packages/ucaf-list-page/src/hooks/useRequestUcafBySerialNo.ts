/*
 *
 * Hook: `useRequestUcafBySerialNo`.
 *
 */
import { useCallback } from "react";
import { useParams } from "react-router-dom";
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
    ucafe_date: defaultUcafDate,
    stamped: defaultStamped,
    agreed: defaultAgreed,
    expected_days: defaultNoOfDays,
    expected_amount: defaultAmount,
  },
} = requestsData;

interface UseRequestUcafBySerialNoOptions {
  handleChange: onChangeEvent;
  root_organization_no: string;
  patient_card_no: string;
  paper_serial: string;
}

const useRequestUcafBySerialNo = ({
  handleChange,
  root_organization_no,
  patient_card_no,
  paper_serial,
}: UseRequestUcafBySerialNoOptions) => {
  const { addNotification } = useAppConfigStore();
  const globalProviderNo = useGlobalProviderNo();
  const { pageType } = useParams();

  const handleRequestsResponse: OnResponseActionType<RequestsDataType> =
    useCallback(
      ({ apiValues, error }) => {
        const { details } = apiValues || {};
        const { doctor_provider_no, doctor_department_id } = details || {};

        if (!doctor_provider_no || !doctor_department_id) {
          addNotification({
            type: "error",
            message: "invldsrialno",
          });
        }

        const data =
          error || !apiValues
            ? initialValues.requestsData
            : {
                ...apiValues,
                details: {
                  ...details,
                  ucafe_type: details.ucafe_type || defaultUcafType,
                  claim_flag: details.claim_flag || defaultClaimType,
                  ucafe_date: details.ucafe_date || defaultUcafDate,
                  stamped: details.stamped || defaultStamped,
                  agreed: details.agreed || defaultAgreed,
                  expected_days: details.expected_days || defaultNoOfDays,
                  expected_amount: details.expected_amount || defaultAmount,
                },
              };

        handleChange({
          name: "requestsData",
          value: data,
        });
      },
      [handleChange]
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
