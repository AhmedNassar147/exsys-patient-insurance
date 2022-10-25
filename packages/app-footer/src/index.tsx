/*
 *
 * Package: `@exsys-patient-insurance/app-footer`.
 *
 */
import { memo } from "react";
import exsysIcon from "./assets/exsys.svg";
import { StyledFooter, FooterImage } from "./styled";

const ENV = process.env;

const AppFooter = () => (
  <StyledFooter>
    <b>True TPA by Exsys Solutions</b>
    <FooterImage src={exsysIcon} height="26" width="50" alt="footer-icon" />
    <small>
      Release {ENV.REACT_APP_BUILD_YEAR}.{ENV.REACT_APP_BUILD_MONTH}.
      {ENV.REACT_APP_BUILD_DAY}.{ENV.REACT_APP_BUILD_TIME}
    </small>
  </StyledFooter>
);

export default memo(AppFooter);
