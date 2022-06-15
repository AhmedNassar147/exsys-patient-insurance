/*
 *
 * Hook: `useClearAppConfigState`.
 *
 */
import { useCallback } from "react";
import useSetAuthConfigData from "./useSetAuthConfigData";
import { initialState } from "../context";

const useClearAppConfigState = () => {
  const setAuthConfigValues = useSetAuthConfigData();

  return useCallback(
    () => setAuthConfigValues(initialState),
    [setAuthConfigValues]
  );
};

export default useClearAppConfigState;
