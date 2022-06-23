/*
 *
 * Hook: `useDeliverRequest`.
 *
 */
import { useCallback } from "react";
import {
  useGlobalProviderNo,
  useAppConfigStore,
} from "@exsys-patient-insurance/app-config-store";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";
import { RequestDetailsType, RequestTableRecordType } from "../index.interface";

type BaseRequestValuesType = Pick<
  RequestDetailsType,
  | "root_organization_no"
  | "doctor_provider_no"
  | "ucafe_date"
  | "claim_flag"
  | "claim_flag"
  | "ucaf_id"
  | "doctor_department_id"
  | "ucafe_type"
> & {
  patient_card_no?: string;
  insurance_company_no?: number;
  paper_serial: string;
};

const useDeliverRequest = (
  baseDetailsValues: BaseRequestValuesType,
  onSuccess: () => void
) => {
  const providerNo = useGlobalProviderNo();
  const { addNotification } = useAppConfigStore();

  const { loading, mutate } = useBasicMutation({
    apiId: "POST_DELIVER_SERVICES_REQUESTS_ITEM",
  });

  const handleDeliverItem = useCallback(
    (services: RequestTableRecordType[]) => {
      const {
        root_organization_no,
        doctor_provider_no,
        ucafe_date,
        claim_flag,
        ucaf_id,
        doctor_department_id,
        ucafe_type,
        patient_card_no,
        insurance_company_no,
        paper_serial,
      } = baseDetailsValues;

      const data = {
        root_organization_no,
        patient_card_no,
        insurance_company_no,
        ucafe_date,
        claim_flag,
        provider_no: providerNo,
        ucaf_id,
        doctor_provider_no,
        doctor_department_id,
        ucafe_type,
        paper_serial,
        data: services.map(({ ucaf_dtl_pk, service_code, qty }) => ({
          ucaf_dtl_pk,
          service_code,
          qty,
        })),
      };

      mutate({
        body: data,
        cb: ({ apiValues, error }) => {
          console.log("data delivery", data);
          console.log("delivery apiValues", apiValues);
          const isError = !!error || apiValues?.status !== "success";
          if (!isError) {
            onSuccess();
          }

          addNotification({
            type: isError ? "error" : "success",
            message: isError ? error || "flssve" : "succmsg",
          });
        },
      });
    },
    [mutate, providerNo, baseDetailsValues, onSuccess, addNotification]
  );

  return {
    loading,
    handleDeliverItem,
  };
};

export default useDeliverRequest;
