/*
 *
 * Hook: `useLoadDefaultServices`.
 *
 */
import { useEffect } from "react";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";
import { ServiceItemValuesForPostApiType } from "../index.interface";

interface UseLoadDefaultServicesOptionsType {
  root_organization_no: string;
  patient_card_no: string;
  ucaf_date?: string;
  ucafe_type?: string;
  claim_flag?: string;
  shouldLoadDefaultConsultation: boolean;
  doctorProviderNo: number;
  handleSaveServiceRequest: (
    values: ServiceItemValuesForPostApiType,
    showNotificationAndRefetchData?: boolean
  ) => Promise<void>;
}

const useLoadDefaultServices = ({
  root_organization_no,
  patient_card_no,
  ucaf_date,
  ucafe_type,
  claim_flag,
  doctorProviderNo,
  shouldLoadDefaultConsultation,
  handleSaveServiceRequest,
}: UseLoadDefaultServicesOptionsType) => {
  const { loading: defaultServicesLoading, runQuery } = useBasicQuery<
    RecordTypeWithAnyValue[]
  >({
    apiId: "QUERY_DEFAULT_SERVICES_DATA",
    callOnFirstRender: false,
    disableParamsChangeCheck: !shouldLoadDefaultConsultation,
    transformApiDataFn: (data) => data?.data,
    checkAllParamsValuesToQuery: true,
    params: {
      root_organization_no,
      patient_card_no,
      ucaf_date,
      attendance_type: ucafe_type,
      claim_flag,
      provider_no: doctorProviderNo,
    },
  });

  useEffect(
    () => {
      if (shouldLoadDefaultConsultation) {
        runQuery({}, async ({ apiValues }) => {
          const length = apiValues?.length;
          if (length) {
            const configPromises = apiValues.map(
              (
                {
                  service_code,
                  price,
                  specialty_type,
                  patient_share_prc,
                  price_disc_prc,
                  approval,
                },
                index
              ) =>
                handleSaveServiceRequest(
                  {
                    service_code,
                    qty: 1,
                    approved_quantity: 1,
                    price,
                    record_status: "n",
                    inClinicService: true,
                    specialty_type,
                    patient_share_prc,
                    price_disc_prc,
                    forcedStatus: "P",
                    approval,
                  } as ServiceItemValuesForPostApiType,
                  index === length - 1
                )
            );

            await Promise.all(configPromises);
          }
        });
      }
    },
    // eslint-disable-next-line
    [shouldLoadDefaultConsultation]
  );

  return {
    defaultServicesLoading,
  };
};

export default useLoadDefaultServices;
