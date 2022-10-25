/*
 *
 * Hook: `useCurrentUserType`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";
// type UseCurrentUserTypeReturnType = {
//   isDoctorUser: boolean;
//   isLabUser: boolean;
//   isRadiologyUser: boolean;
//   isOpticalUser: boolean;
//   isAdminUser: boolean;
//   isCustomerSupportUser: boolean;
//   isPhysiotherapyUser: boolean;
// };

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
  };
};

export default useCurrentUserType;
