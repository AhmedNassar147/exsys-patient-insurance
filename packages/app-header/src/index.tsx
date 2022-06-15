/*
 *
 * Package: `@exsys-patient-insurance/app-header`.
 *
 */
import { useCallback, memo } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  useLanguageSwitcher,
  useClearAppConfigState,
  useCurrentUserFullName,
} from "@exsys-patient-insurance/app-config-store";
import { spacings } from "@exsys-patient-insurance/theme-values";
import AppLogoImage from "@exsys-patient-insurance/app-image-logo";
import ClockIcon from "@exsys-patient-insurance/clock-icon";
import CalenderIcon from "@exsys-patient-insurance/calender-icon";
import LogoutIcon from "@exsys-patient-insurance/logout-icon";
import { clearAllExsysStaffInStorage } from "@exsys-patient-insurance/helpers";
import SettingsItem from "./partials/SettingItem";
import {
  AppHeaderNav,
  AppHeaderItem,
  AppHeaderFlag,
  StyledHeader,
  UserNameHead,
} from "./styled";
import useTimeState from "./hooks/useTimeState";
import useCountryFlag from "./hooks/useCountryFlag";

const iconDimensions = {
  width: spacings.sp6,
  height: spacings.sp6,
};

const AppHeader = memo(() => {
  const flagImage = useCountryFlag();
  const handleSwitchLanguage = useLanguageSwitcher();
  const clearAppConfigState = useClearAppConfigState();
  const userFullName = useCurrentUserFullName();

  const { time, currentDate } = useTimeState();
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    clearAllExsysStaffInStorage(() => {
      clearAppConfigState();
      navigate("/");
    });
  }, [clearAppConfigState, navigate]);

  return (
    <>
      <Link to="/home">
        <AppLogoImage width={spacings.sp19} height={spacings.sp9} />
      </Link>

      <UserNameHead children={userFullName} />

      <AppHeaderNav>
        <AppHeaderItem>
          <CalenderIcon {...iconDimensions} />
          <span children={currentDate} />
        </AppHeaderItem>

        <AppHeaderItem>
          <ClockIcon {...iconDimensions} />
          <span children={time} />
        </AppHeaderItem>

        <SettingsItem />

        {flagImage && (
          <AppHeaderFlag
            src={flagImage}
            alt="lang-flag"
            onClick={handleSwitchLanguage}
          />
        )}

        <AppHeaderItem onClick={onLogout}>
          <LogoutIcon {...iconDimensions} />
        </AppHeaderItem>
      </AppHeaderNav>
    </>
  );
});

const MainAppHeader = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/";

  return (
    <StyledHeader isLoginPage={isLoginPage}>
      {isLoginPage ? null : <AppHeader />}
    </StyledHeader>
  );
};

export default memo(MainAppHeader);
