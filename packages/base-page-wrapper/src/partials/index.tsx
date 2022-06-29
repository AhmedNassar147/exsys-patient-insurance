/*
 *
 * Component: `@exsys-patient-insurance/base-page-wrapper`.
 *
 */
import { memo, useState } from "react";
import SideBarWithItem from "./SideBarWithItem";
import { BasePageWrapper, BasePageContent } from "../styled";
import type { SizeType } from "@exsys-patient-insurance/app-sidebar";
import { BasePageComponentProps } from "../index.interface";

const BasePageComponent = ({ children }: BasePageComponentProps) => {
  const [sideBarSize, setSideBarSize] = useState<SizeType>("small");

  return (
    <BasePageWrapper>
      <SideBarWithItem
        sideBarSize={sideBarSize}
        setSideBarSize={setSideBarSize}
      />
      <BasePageContent sideBarSize={sideBarSize}>{children}</BasePageContent>
    </BasePageWrapper>
  );
};

export default memo(BasePageComponent);
