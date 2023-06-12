/*
 *
 * Hook: `useCheckProductUsageValidity`.
 *
 */
import { useCallback } from "react";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import { useAppConfigStore } from "@exsys-patient-insurance/app-config-store";
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";

interface UseCheckProductUsageValidityProps {
  rootOrganizationNo: string;
  patientCardNo: string;
}

const useCheckProductUsageValidity = ({
  rootOrganizationNo,
  patientCardNo,
}: UseCheckProductUsageValidityProps) => {
  const { addNotification } = useAppConfigStore();
  const { loading, runQuery } = useBasicQuery({
    apiId: "QUERY_CHECK_PRODUCT_USAGE_VALIDITY",
    callOnFirstRender: false,
    disableParamsChangeCheck: true,
    runQueryWhenLanguageChanged: false,
    params: {
      root_organization_no: rootOrganizationNo,
      patient_card_no: patientCardNo,
    },
  });

  const checkProductUsageValidity = useCallback(
    (serviceCode: string) =>
      new Promise(async (resolve) => {
        const params = {
          service_code: serviceCode,
        };
        await runQuery(params, ({ apiValues }) =>
          resolve(apiValues as RecordTypeWithAnyValue)
        );
      }),
    [runQuery, addNotification]
  );

  return {
    checkProductUsageValidity,
    isCheckingProductValidity: loading,
  };
};

export default useCheckProductUsageValidity;
