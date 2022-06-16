/*
 *
 * Package: `@exsys-patient-insurance/app-sidebar`.
 *
 */
import { memo, useState, useLayoutEffect, useCallback } from "react";
import { colors } from "@exsys-patient-insurance/theme-values";
import ArrowIcon from "@exsys-patient-insurance/arrow-icon";
import { SideBarFooter, SideBar } from "./styled";

export type SizeType = "small" | "large";

interface AppSidebarProps {
  children: React.ReactNode;
  minWidth: string;
  maxWidth: string;
  onChange: (size: SizeType) => void;
}

const AppSidebar = ({
  children,
  minWidth,
  maxWidth,
  onChange,
}: AppSidebarProps) => {
  const [width, setWidth] = useState("");

  useLayoutEffect(() => {
    if (minWidth) {
      setWidth(minWidth);
    }
  }, []);

  const switchSideBarWidth = useCallback(() => {
    onChange(width === minWidth ? "large" : "small");
    setWidth((previousWidth) =>
      previousWidth === minWidth ? maxWidth : minWidth
    );
  }, [minWidth, maxWidth, width]);

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
