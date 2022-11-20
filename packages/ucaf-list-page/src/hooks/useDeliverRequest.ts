/*
 *
 * Hook: `useDeliverRequest`.
 *
 */
import { useCallback } from "react";
import {
  useAppConfigStore,
  useLoggedInUserName,
} from "@exsys-patient-insurance/app-config-store";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";
import { CapitalBooleanStringType } from "@exsys-patient-insurance/types";
import { RequestDetailsType, RequestTableRecordType } from "../index.interface";

type UseDeliverRequestOptionsType = Pick<
  RequestDetailsType,
  "root_organization_no" | "ucaf_id"
> & {
  patient_card_no?: string;
  insurance_company_no?: number;
  paper_serial: string;
  is_chronic?: CapitalBooleanStringType;
  onSuccess: () => void;
};

const useDeliverRequest = ({
  root_organization_no,
  ucaf_id,
  patient_card_no,
  paper_serial,
  is_chronic,
  onSuccess,
}: UseDeliverRequestOptionsType) => {
  const { addNotification } = useAppConfigStore();
  const loggedInUser = useLoggedInUserName();

  const { loading, mutate } = useBasicMutation({
    apiId: "POST_DELIVER_SERVICES_REQUESTS_ITEM",
  });

  const handleDeliverItem = useCallback(
    (services: RequestTableRecordType[]) => {
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
            delivery_qty,
            delivery_doc_no,
            delivery_date,
            ucaf_delivery_pk,
            approved_quantity,
            unit_discount,
            patientShare,
            is_system_approved,
            qty,
          }) => {
            const baseApprovedQty =
              is_system_approved === "Y"
                ? approved_quantity || qty
                : approved_quantity;

            return {
              ucaf_dtl_pk,
              ucaf_delivery_pk,
              service_code,
              delivery_qty,
              delivery_date,
              delivery_doc_no,
              delivery_by: loggedInUser,
              approved_quantity: baseApprovedQty || undefined,
              unit_discount,
              patientShare,
              record_status: "u",
            };
          }
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
      onSuccess,
      addNotification,
      loggedInUser,
      root_organization_no,
      ucaf_id,
      patient_card_no,
      paper_serial,
      is_chronic,
    ]
  );

  return {
    loading,
    handleDeliverItem,
  };
};

export default useDeliverRequest;
