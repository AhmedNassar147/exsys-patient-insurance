/*
 *
 * Hook: `useSaveServiceRequest`.
 *
 */
import { useCallback } from "react";
import {
  useGlobalProviderNo,
  useAppConfigStore,
} from "@exsys-patient-insurance/app-config-store";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";
import {
  RequestDetailsType,
  ServiceItemValuesForPostApiType,
} from "../index.interface";

type BaseRequestValuesType = Omit<
  RequestDetailsType,
  "doctor_department_name"
> & {
  patient_card_no?: string;
  insurance_company_no?: number;
};

const useSaveServiceRequest = (
  baseDetailsValues: BaseRequestValuesType,
  onSuccess: () => void
) => {
  const providerNo = useGlobalProviderNo();
  const { addNotification } = useAppConfigStore();

  const { loading, mutate } = useBasicMutation({
    apiId: "POST_SERVICES_REQUESTS_ITEM",
  });

  const handleSaveServiceRequest = useCallback(
    ({
      ucaf_dtl_pk,
      service_code,
      qty,
      price,
      delivery_qty,
      delivery_date,
      delivery_doc_no,
      status,
      record_status,
    }: ServiceItemValuesForPostApiType) => {
      const {
        root_organization_no,
        doctor_provider_no,
        doctor_provider_name,
        attendance_type,
        ucafe_date,
        claim_flag,
        ucaf_id,
        doctor_department_id,
        complain,
        signs,
        primary_diag_code,
        primary_diagnosis,
        ucafe_type,
        is_chronic,
        patient_card_no,
        insurance_company_no,
        provider_notes,
      } = baseDetailsValues;

      if (!service_code) {
        addNotification({
          type: "error",
          message: "plsslctprodct",
        });
        return;
      }

      const data = {
        root_organization_no,
        patient_card_no,
        insurance_company_no,
        provider_notes,
        ucafe_date,
        claim_flag,
        attendance_type,
        provider_no: providerNo,
        ucaf_id,
        doctor_provider_no,
        doctor_provider_name,
        doctor_department_id,
        complain,
        signs,
        primary_diag_code,
        primary_diagnosis,
        ucafe_type,
        is_chronic,
        data: [
          {
            ucaf_dtl_pk: record_status === "n" ? "" : ucaf_dtl_pk,
            service_code,
            delivery_qty,
            qty,
            price,
            delivery_date,
            delivery_doc_no,
            status: status || "O",
            record_status,
          },
        ],
      };

      mutate({
        body: data,
        cb: ({ apiValues, error }) => {
          console.log("data", data);
          console.log("apiValues", apiValues);
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
    handleSaveServiceRequest,
  };
};

export default useSaveServiceRequest;
