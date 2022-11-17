/*
 *
 * Hook: `useCurrentUserType`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useCurrentUserType = () => {
  const {
    state: { user_type },
  } = useAppConfigStore();

  return {
    isDoctorUser: ["H", "M", "D"].includes(user_type),
    isLabUser: user_type === "L",
    isRadiologyUser: user_type === "R",
    isOpticalUser: user_type === "O",
    isAdminUser: user_type === "A",
    isCustomerSupportUser: user_type === "S",
    isPhysiotherapyUser: user_type === "T",
    isPharmacyUser: user_type === "P",
    isClientUser: user_type === "C",
  };
};

export default useCurrentUserType;
