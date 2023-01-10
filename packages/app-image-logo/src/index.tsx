/*
 *
 * Package: `@exsys-patient-insurance/app-image-logo`.
 *
 */
import { memo } from "react";
import styled from "styled-components";
import { spacings } from "@exsys-patient-insurance/theme-values";
// @ts-ignore ignore this foe now
import mainLogo from "../../../app/src/assets/mainLogo.svg";

interface AppLogoImageProps {
  width?: string;
  height?: string;
}

const AppLogoImage = styled.img<AppLogoImageProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const AppImageLogo = (props: AppLogoImageProps) => {
  return <AppLogoImage alt="logo" src={mainLogo} {...props} />;
};
AppImageLogo.defaultProps = {
  width: spacings.sp25,
  height: spacings.sp12,
};

export default memo(AppImageLogo);
