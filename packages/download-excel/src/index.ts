/*
 *
 * Package: `@exsys-patient-insurance/download-excel`.
 *
 */
import createLazyComponent from "@exsys-patient-insurance/react-lazy";

export default createLazyComponent(
  () =>
    import(
      "./component" /* webpackChunkName: "exsys-patient-insurance.download-excel" */
    )
);
