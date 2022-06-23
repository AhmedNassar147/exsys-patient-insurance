/*
 *
 * Component: `@exsys-patient-insurance/base-page-wrapper`.
 *
 */
import { memo } from "react";
import SideBarWithItem from "./SideBarWithItem";
import { BasePageWrapper, BasePageContent } from "../styled";
import { BasePageComponentProps } from "../index.interface";

const BasePageComponent = ({ children }: BasePageComponentProps) => (
  <BasePageWrapper>
    <SideBarWithItem />
    <BasePageContent>{children}</BasePageContent>
  </BasePageWrapper>
);

export default memo(BasePageComponent);
