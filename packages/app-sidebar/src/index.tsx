/*
 *
 * Package: `@exsys-patient-insurance/app-sidebar`.
 *
 */
import { memo, useState, useLayoutEffect, useCallback } from "react";
import { colors } from "@exsys-patient-insurance/theme-values";
import ArrowIcon from "@exsys-patient-insurance/arrow-icon";
import { SideBarFooter, SideBar } from "./styled";

interface AppSidebarProps {
  children: React.ReactNode;
  minWidth: string;
  maxWidth: string;
}

const AppSidebar = ({ children, minWidth, maxWidth }: AppSidebarProps) => {
  const [width, setWidth] = useState("");

  useLayoutEffect(() => {
    if (minWidth) {
      setWidth(minWidth);
    }
  }, []);

  const switchSideBarWidth = useCallback(
    () =>
      setWidth((previousWidth) =>
        previousWidth === minWidth ? maxWidth : minWidth
      ),
    [minWidth, maxWidth]
  );

  const arrowDirection = width === maxWidth ? "left" : "right";

  return (
    <SideBar width={width}>
      {children}

      <SideBarFooter width="100%" justify="center" onClick={switchSideBarWidth}>
        <ArrowIcon
          width="18px"
          height="20px"
          direction={arrowDirection}
          color={colors.appPrimary}
        />
      </SideBarFooter>
    </SideBar>
  );
};

export default memo(AppSidebar);
