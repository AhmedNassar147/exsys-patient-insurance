/*
 *
 * Hook: `useCurrentUserType`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";
import { getCurrentUserType } from "@exsys-patient-insurance/helpers";

const useCurrentUserType = () => {
  const {
    state: { user_type },
  } = useAppConfigStore();

  return getCurrentUserType(user_type);
};

export default useCurrentUserType;
