/*
 *
 * Hook: `useAppConfigStore`.
 *
 */
import { useContext } from "react";
import appConfigStore from "../context";
import { AppConfigStoreApi } from "../index.interface";

const useAppConfigStore = (): AppConfigStoreApi => useContext(appConfigStore);

export default useAppConfigStore;
