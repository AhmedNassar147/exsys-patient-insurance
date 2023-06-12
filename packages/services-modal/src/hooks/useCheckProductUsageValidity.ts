/*
 *
 * Hook: `useCheckProductUsageValidity`.
 *
 */
import { useCallback } from "react";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import { useAppConfigStore } from "@exsys-patient-insurance/app-config-store";

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
    (serviceCode: string, serviceName: string) =>
      new Promise(async (resolve) => {
        const params = {
          service_code: serviceCode,
        };
        await runQuery(params, ({ apiValues }) => {
          const {
            days,
            dosage,
            last_ucafe_date,
            next_allowed_date,
            provider_name,
            times,
          } = apiValues;

          if (next_allowed_date) {
            addNotification({
              duration: 30000,
              type: "error",
              message: `product ${serviceName} already used by ${provider_name}
                \n\n at ${last_ucafe_date} with (${dosage} dosage of ${times} times in ${days} days)
                and it will be allowed at
               ${next_allowed_date}`,
            });
          }
          resolve(!next_allowed_date);
        });
      }),
    [runQuery, addNotification]
  );

  return {
    checkProductUsageValidity,
    isCheckingProductValidity: loading,
  };
};

export default useCheckProductUsageValidity;
