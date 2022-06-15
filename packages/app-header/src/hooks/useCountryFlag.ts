/*
 *
 * Hook: `useCountryFlag`.
 *
 */
import { useMemo } from "react";
import { useMakeSelectIsRTLLayout } from "@exsys-patient-insurance/app-config-store";
import getCountryImage from "../helpers/getCountryImage";

const useCountryFlag = () => {
  const isRightToLeft = useMakeSelectIsRTLLayout();

  const flagImage = useMemo(
    () => getCountryImage(isRightToLeft ? "uk" : "sa"),
    [isRightToLeft]
  );

  return flagImage;
};

export default useCountryFlag;
