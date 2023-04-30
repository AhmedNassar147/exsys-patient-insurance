/*
 *
 * Hook: `useCreateAdmissionBasedSerial`.
 *
 */
import { useEffect, useCallback } from "react";
import { useTableQuery } from "@exsys-patient-insurance/network-hooks";
import type { ServiceRequestItemType } from "@exsys-patient-insurance/services-modal";
import { RecordType } from "@exsys-patient-insurance/types";
import { ServiceItemValuesForPostApiType } from "../index.interface";

interface UseCreateAdmissionBasedSerialType {
  rootOrganizationNo: string;
  patientCardNo: string;
  ucafDate?: string;
  claimFlag?: string;
  ucafType?: string;
  providerNo?: number;
  shouldPerformNewAdmissionRequest: boolean;
  handleSaveServiceRequest: (
    values: ServiceItemValuesForPostApiType,
    showNotificationAndRefetchData?: boolean
  ) => Promise<void>;
}

const useCreateAdmissionBasedSerial = ({
  rootOrganizationNo,
  patientCardNo,
  ucafDate,
  claimFlag,
  ucafType,
  providerNo,
  shouldPerformNewAdmissionRequest,
  handleSaveServiceRequest,
}: UseCreateAdmissionBasedSerialType) => {
  const skipQuery = useCallback(
    ({ service_code }: RecordType) => !service_code,
    []
  );

  const { loading: isPerformingAdmissionRequest, runQuery } = useTableQuery<
    ServiceRequestItemType[]
  >({
    apiId: "QUERY_MI_SERVICES_REQUESTS_TABLE_DATA",
    callOnFirstRender: false,
    disableParamsChangeCheck: !shouldPerformNewAdmissionRequest,
    skipQuery,
    params: {
      root_organization_no: rootOrganizationNo,
      patient_card_no: patientCardNo,
      ucaf_date: ucafDate,
      claim_flag: claimFlag,
      attendance_type: ucafType,
      provider_no: providerNo,
    },
  });

  useEffect(
    () => {
      if (shouldPerformNewAdmissionRequest) {
        const params = {
          search_word: "",
          service_code: "000000",
        };
        runQuery(params, async ({ apiValues }) => {
          const { data } = apiValues;
          const [admissionItem] = data || [];

          if (admissionItem) {
            const {
              service_id,
              price,
              specialty_type,
              copay,
              price_disc_prc,
              approval,
            } = admissionItem;

            handleSaveServiceRequest(
              {
                service_code: service_id,
                qty: 1,
                approved_quantity: 1,
                price,
                record_status: "n",
                specialty_type,
                price_disc_prc,
                patient_share_prc: copay,
                forcedStatus: "P",
                approval,
              } as ServiceItemValuesForPostApiType,
              true
            );
          }
        });
      }
    },
    // eslint-disable-next-line
    [shouldPerformNewAdmissionRequest]
  );

  return {
    isPerformingAdmissionRequest,
  };
};

export default useCreateAdmissionBasedSerial;
