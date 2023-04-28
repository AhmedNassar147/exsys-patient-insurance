/*
 *
 * Hook: `useCreatePaperSerialFromAdmission`.
 *
 */
import { useCallback } from "react";
import { useAppConfigStore } from "@exsys-patient-insurance/app-config-store";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";

interface UseCreatePaperSerialFromAdmissionOptionsType {
  root_organization_no: string;
  doctor_provider_no?: number;
  doctor_department_id: number;
  doctor_name?: string;
  onSuccess: (paperSerial: string) => void;
}

const useCreatePaperSerialFromAdmission = ({
  root_organization_no,
  doctor_provider_no,
  doctor_department_id,
  doctor_name,
  onSuccess,
}: UseCreatePaperSerialFromAdmissionOptionsType) => {
  const { addNotification } = useAppConfigStore();

  const { loading, mutate } = useBasicMutation({
    apiId: "POST_CREATE_SERIAL_FROM_ADMISSION",
  });

  const createPaperSerialFromAdmission = useCallback(() => {
    mutate({
      body: {
        doctor_provider_no,
        root_organization_no,
        doctor_department_id,
        doctor_name,
      },
      cb: ({ apiValues, error }) => {
        const { status, paper_serial } = apiValues || {};
        const isError = !!error || status !== "success";
        if (!isError) {
          onSuccess(paper_serial);
        }

        addNotification({
          type: isError ? "error" : "success",
          message: isError ? error || "flssve" : "succmsg",
        });
      },
    });
  }, [
    mutate,
    doctor_provider_no,
    root_organization_no,
    doctor_department_id,
    doctor_name,
    onSuccess,
  ]);

  return {
    isCreatePaperSerialFromAdmission: loading,
    createPaperSerialFromAdmission,
  };
};

export default useCreatePaperSerialFromAdmission;
