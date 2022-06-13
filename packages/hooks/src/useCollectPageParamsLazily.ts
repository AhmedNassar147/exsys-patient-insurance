/*
 *
 * useCollectPageParamsLazily
 *
 */
import { useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { RecordType } from "@exsys-patient-insurance/types";

const useCollectPageParamsLazily = <R = RecordType<string>>(): (() => R) => {
  const { state } = useLocation();
  const params = useParams();

  return useCallback((): R => {
    const routerState = state || {};
    // @ts-ignore
    return { ...params, ...routerState };
  }, [params, state]);
};

export default useCollectPageParamsLazily;
