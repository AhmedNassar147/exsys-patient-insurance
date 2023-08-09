/*
 *
 * Package: `@exsys-patient-insurance/acc-users`.
 *
 */
import { lazy } from "react";

export default lazy(
  () =>
    import(
      "./component" /* webpackChunkName: "exsys-patient-insurance.acc-users-page" */
    )
);
