/*
 *
 * Hook: `useSetAuthConfigData`.
 *
 */
import { useCallback } from "react";
import { setItemToStorage } from "@exsys-patient-insurance/helpers";
import { AppConfigStateType } from "@exsys-patient-insurance/types";
import useAppConfigStore from "./useAppConfigStore";

const useSetAuthConfigData = () => {
  const { setAuthValues, state } = useAppConfigStore();

  return useCallback(
    (values: AppConfigStateType) =>
      setAuthValues((previous: AppConfigStateType) => {
        const nextMainStoreData = {
          ...previous,
          ...values,
        };

        setItemToStorage("userData", nextMainStoreData);

        return nextMainStoreData;
      }),
    [setAuthValues, state]
  );
};

export default useSetAuthConfigData;
