/*
 *
 * useCollectPageParams
 *
 */
import { useMemo } from "react";
import { RecordType } from "@exsys-patient-insurance/types";
import useCollectPageParamsLazily from "./useCollectPageParamsLazily";

const useCollectPageParams = <R = RecordType<string>>(): R => {
  const collectParams = useCollectPageParamsLazily<R>();

  return useMemo(collectParams, [collectParams]);
};

export default useCollectPageParams;
