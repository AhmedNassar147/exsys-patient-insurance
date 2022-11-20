/*
 *
 * Hook: `useLinkServices`.
 *
 */
import { useCallback } from "react";
import {
  useAppConfigStore,
  useGlobalProviderNo,
  useLoggedInUserName,
} from "@exsys-patient-insurance/app-config-store";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";
import calculatePatientShareAndDiscount from "../helpers/calculatePatientShareAndDiscount";
import { RequestTableRecordType } from "../index.interface";

type UseLinkServicesOptionsType = {
  root_organization_no: string;
  ucaf_id?: number;
  patient_card_no?: string;
  paper_serial: string;
  insurance_company_no?: number;
  ucafe_date?: string;
  provider_notes?: string;
  onSuccess: () => void;
};

const useLinkServices = ({
  root_organization_no,
  ucaf_id,
  patient_card_no,
  paper_serial,
  ucafe_date,
  provider_notes,
  insurance_company_no,

  onSuccess,
}: UseLinkServicesOptionsType) => {
  const { addNotification } = useAppConfigStore();
  const providerNo = useGlobalProviderNo();
  const loggedInUser = useLoggedInUserName();

  const { loading: isLinkingServices, mutate } = useBasicMutation({
    apiId: "POST_LINK_MI_SERVICES",
  });

  const makeLinkServicesRequest = useCallback(
    (services: RequestTableRecordType[]) => {
      const data = {
        root_organization_no,
        insurance_company_no,
        patient_card_no,
        paper_serial,
        ucaf_id,
        ucafe_date,
        data: services.map(
          ({
            ucaf_dtl_pk,
            service_code,
            qty,
            price,
            delivery_qty,
            delivery_doc_no,
            delivery_date,
            status,
            patient_share_prc,
            price_disc_prc,
            is_system_approved,
            approved_quantity,
          }) => {
            const { patientShare, unit_discount } =
              calculatePatientShareAndDiscount(
                price,
                patient_share_prc,
                price_disc_prc
              );

            return {
              ucaf_dtl_pk,
              provider_no: providerNo,
              provider_notes,
              service_code,
              qty,
              price,
              unit_discount,
              unit_patient_share: patientShare,
              delivery_qty,
              delivery_date,
              delivery_doc_no,
              status,
              record_status: "u",
              is_system_approved,
              approved_quantity,
              delivery_by: loggedInUser,
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
      addNotification,
      root_organization_no,
      ucaf_id,
      patient_card_no,
      paper_serial,
      ucafe_date,
      provider_notes,
      insurance_company_no,
      onSuccess,
      loggedInUser,
    ]
  );

  return {
    isLinkingServices,
    makeLinkServicesRequest,
  };
};

export default useLinkServices;
