/*
 *
 * Hook: `useDeliverRequest`.
 *
 */
import { useCallback } from "react";
import {
  useGlobalProviderNo,
  useAppConfigStore,
  useLoggedInUserName,
} from "@exsys-patient-insurance/app-config-store";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";
import { RequestDetailsType, RequestTableRecordType } from "../index.interface";

type BaseRequestValuesType = Pick<
  RequestDetailsType,
  "root_organization_no" | "ucaf_id" | "is_chronic"
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
  const loggedInUser = useLoggedInUserName();

  const { loading, mutate } = useBasicMutation({
    apiId: "POST_DELIVER_SERVICES_REQUESTS_ITEM",
  });

  const handleDeliverItem = useCallback(
    (services: RequestTableRecordType[]) => {
      const {
        root_organization_no,
        ucaf_id,
        patient_card_no,
        paper_serial,
        is_chronic,
      } = baseDetailsValues;

      const data = {
        root_organization_no,
        patient_card_no,
        paper_serial,
        ucaf_id,
        is_chronic: is_chronic || "N",
        data: services.map(
          ({
            ucaf_dtl_pk,
            service_code,
            qty,
            delivery_qty,
            delivery_doc_no,
            delivery_date,
            ucaf_delivery_pk,
          }) => ({
            ucaf_dtl_pk,
            ucaf_delivery_pk,
            service_code,
            qty,
            delivery_qty,
            delivery_date,
            delivery_doc_no,
            delivery_by: loggedInUser,
            record_status: "u",
          })
        ),
      };

      mutate({
        body: data,
        cb: ({ apiValues, error }) => {
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
    [
      mutate,
      providerNo,
      baseDetailsValues,
      onSuccess,
      addNotification,
      loggedInUser,
    ]
  );

  return {
    loading,
    handleDeliverItem,
  };
};

export default useDeliverRequest;
