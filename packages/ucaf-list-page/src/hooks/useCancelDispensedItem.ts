/*
 *
 * Hook: `useCancelDispensedItem`.
 *
 */
import { useCallback } from "react";
import { useGlobalProviderNo } from "@exsys-patient-insurance/app-config-store";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";

const useCancelDispensedItem = (ucaf_id?: number, onSuccess?: () => void) => {
  const providerNo = useGlobalProviderNo();

  const { loading, mutate } = useBasicMutation({
    apiId: "POST_MI_UCAF_CANCEL_DELIVERY_TABLE_DATA",
    method: "post",
  });

  const handleCancelDispensedItem = useCallback(
    (ucaf_dtl_pk: number, service_code: string) => () => {
      mutate({
        body: {
          ucaf_id,
          provider_no: providerNo,
          data: [
            {
              ucaf_dtl_pk,
              service_code,
            },
          ],
        },
        cb: ({ apiValues, error }) => {
          const isError = !!error || apiValues?.status !== "success";
          if (!isError) {
            onSuccess?.();
          }
        },
      });
    },
    [mutate]
  );

  return {
    handleCancelDispensedItem,
    isCancelingDispendItem: loading,
  };
};

export default useCancelDispensedItem;
