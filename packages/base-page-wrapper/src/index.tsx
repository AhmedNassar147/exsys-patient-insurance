/*
 *
 * `BasePageWrapper`: `@exsys-patient-insurance/base-page-wrapper`.
 *
 */
import { memo } from "react";
import { useLocation } from "react-router-dom";
import { useMakeSelectAuthorization } from "@exsys-patient-insurance/app-config-store";
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";
import { BasePageComponentProps } from "./index.interface";

const AuthorizedAppLayout = createLazyLoadedComponent(
  () =>
    import("./partials" /* webpackChunkName: "pages.authorized-app-layout" */)
);

const BasePageComponent = ({ children }: BasePageComponentProps) => {
  const authorization = useMakeSelectAuthorization();
  const { pathname } = useLocation() || {};

  if (!authorization || pathname === "/") {
    return children as JSX.Element;
  }

  return <AuthorizedAppLayout shouldMountChunk>{children}</AuthorizedAppLayout>;
};

export default memo(BasePageComponent);
