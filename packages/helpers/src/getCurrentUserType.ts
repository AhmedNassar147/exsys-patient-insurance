/*
 *
 * Helper: `getCurrentUserType`.
 *
 */
const getCurrentUserType = (userType?: string) => ({
  isDoctorUser: ["H", "M", "D"].includes(userType as string),
  isLabUser: userType === "L",
  isRadiologyUser: userType === "R",
  isOpticalUser: userType === "O",
  isAdminUser: userType === "A",
  isCustomerSupportUser: userType === "S",
  isPhysiotherapyUser: userType === "T",
  isPharmacyUser: userType === "P",
  isClientUser: userType === "C",
  isManagerUser: userType === "G",
  isHospitalUser: ["H", "M"].includes(userType as string),
});

export default getCurrentUserType;
