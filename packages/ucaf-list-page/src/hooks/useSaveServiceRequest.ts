/*
 *
 * Hook: `useSaveServiceRequest`.
 *
 */
import { useCallback } from "react";
import {
  useGlobalProviderNo,
  useAppConfigStore,
  useCurrentUserType,
  useLoggedInUserName,
} from "@exsys-patient-insurance/app-config-store";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";
import { CapitalBooleanStringType } from "@exsys-patient-insurance/types";
import calculatePatientShareAndDiscount from "../helpers/calculatePatientShareAndDiscount";
import {
  RequestDetailsType,
  ServiceItemValuesForPostApiType,
} from "../index.interface";

type UseSaveServiceRequestOptionsType = Omit<
  RequestDetailsType,
  "doctor_department_name"
> & {
  patient_card_no?: string;
  insurance_company_no?: number;
  paper_serial: string;
  is_chronic?: CapitalBooleanStringType;
  onSuccess: () => void;
};

const PAGE_NAME = "tpaUcaf";

const useSaveServiceRequest = ({
  root_organization_no,
  doctor_provider_no,
  doctor_provider_name,
  doctor_name,
  ucafe_date,
  ucafe_type,
  claim_flag,
  ucaf_id,
  doctor_department_id,
  primary_diag_code,
  primary_diagnosis,
  is_chronic,
  patient_card_no,
  insurance_company_no,
  provider_notes,
  paper_serial,
  agreed,
  stamped,
  expected_amount,
  expected_days,
  admission_reason,
  onSuccess,
}: UseSaveServiceRequestOptionsType) => {
  const providerNo = useGlobalProviderNo();
  const { isDoctorUser } = useCurrentUserType();
  const { addNotification } = useAppConfigStore();
  const loggedInUser = useLoggedInUserName();

  const { loading, mutate } = useBasicMutation({
    apiId: "POST_SERVICES_REQUESTS_ITEM",
  });

  const handleSaveServiceRequest = useCallback(
    async (
      {
        ucaf_dtl_pk,
        service_code,
        qty,
        price,
        delivery_qty,
        delivery_date,
        delivery_doc_no,
        record_status,
        inClinicService,
        specialty_type,
        patient_share_prc,
        price_disc_prc,
        status,
        forcedStatus,
        approval,
        reply_notes,
        is_system_approved,
        approval_reply,
        approved_quantity,
        new_request_price,
        requested_provider,
        isSendingToTPA,
        dosage,
        times,
        days,
      }: ServiceItemValuesForPostApiType,
      showNotificationAndRefetchData?: boolean
    ) => {
      if (!service_code) {
        addNotification({
          type: "error",
          message: "plsslctprodct",
        });
        return;
      }

      if (!primary_diag_code || !primary_diagnosis) {
        addNotification({
          type: "error",
          message: "plsslctdiag",
        });
        return;
      }

      const isInsert = record_status === "n";
      let provider_no = isInsert || isSendingToTPA ? "" : `${providerNo}`;

      if (isDoctorUser) {
        provider_no = inClinicService ? `${doctor_provider_no}` : "";
      }

      const isSystemApproved = approval
        ? approval === "C"
        : is_system_approved === "Y";

      const baseApprovedQty = isSystemApproved
        ? approved_quantity || qty
        : approved_quantity;

      const data = {
        root_organization_no,
        patient_card_no,
        insurance_company_no,
        ucafe_date,
        claim_flag,
        ucaf_id,
        doctor_provider_no,
        doctor_provider_name,
        doctor_name,
        doctor_department_id,
        primary_diag_code,
        primary_diagnosis,
        ucafe_type,
        is_chronic,
        paper_serial,
        stamped,
        agreed,
        admission_reason,
        ...(ucafe_type === "I"
          ? {
              expected_days,
              expected_amount,
            }
          : null),
        data: [
          {
            ucaf_dtl_pk: isInsert ? "" : ucaf_dtl_pk,
            status: forcedStatus ? forcedStatus : isInsert ? "F" : status,
            service_code,
            delivery_qty,
            qty,
            requested_provider: isInsert ? providerNo : requested_provider,
            approved_quantity: baseApprovedQty || undefined,
            ...calculatePatientShareAndDiscount(
              price,
              patient_share_prc,
              price_disc_prc,
              new_request_price
            ),
            creation_page_name: PAGE_NAME,
            delivery_date,
            delivery_doc_no,
            record_status,
            provider_no,
            specialty_type,
            delivery_by: loggedInUser,
            provider_notes,
            approval_reply: isSystemApproved ? "A" : approval_reply,
            is_system_approved: isSystemApproved ? "Y" : "N",
            reply_notes,
            dosage,
            times,
            days,
          },
        ],
      };

      await mutate({
        body: data,
        cb: ({ apiValues, error }) => {
          const isError = !!error || apiValues?.status !== "success";
          if (!isError && showNotificationAndRefetchData) {
            onSuccess();
          }

          if (!isError && !showNotificationAndRefetchData) {
            return;
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
      addNotification,
      root_organization_no,
      doctor_provider_no,
      doctor_provider_name,
      doctor_name,
      ucafe_date,
      ucafe_type,
      claim_flag,
      ucaf_id,
      doctor_department_id,
      primary_diag_code,
      primary_diagnosis,
      is_chronic,
      patient_card_no,
      insurance_company_no,
      provider_notes,
      paper_serial,
      agreed,
      stamped,
      expected_amount,
      expected_days,
      onSuccess,
      loggedInUser,
      admission_reason,
    ]
  );

  return {
    loading,
    handleSaveServiceRequest,
  };
};

export default useSaveServiceRequest;
