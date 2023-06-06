/*
 *
 * `BasePageWrapper`: `@exsys-patient-insurance/base-page-wrapper`.
 *
 */
import { memo, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useMakeSelectAuthorization } from "@exsys-patient-insurance/app-config-store";
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";
import UpgradeVersionModal from "@exsys-patient-insurance/upgrade-version-modal";
import { BasePageComponentProps } from "./index.interface";

const AuthorizedAppLayout = createLazyLoadedComponent(
  () =>
    import("./partials" /* webpackChunkName: "pages.authorized-app-layout" */)
);

const BasePageComponent = ({ children }: BasePageComponentProps) => {
  const authorization = useMakeSelectAuthorization();
  const { pathname } = useLocation() || {};

  const fullChildrenElements = useMemo(
    () => (
      <>
        <UpgradeVersionModal />
        {children}
      </>
    ),
    []
  );

  if (!authorization || pathname === "/") {
    return fullChildrenElements;
  }

  return (
    <AuthorizedAppLayout shouldMountChunk>
      {fullChildrenElements}
    </AuthorizedAppLayout>
  );
};

export default memo(BasePageComponent);
