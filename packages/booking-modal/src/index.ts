/*
 *
 * Package: `@exsys-patient-insurance/booking-modal`.
 *
 */
import createLazyLoadedComponent from "@exsys-patient-insurance/react-lazy";

export default createLazyLoadedComponent(
  () =>
    import(
      "./component" /* webpackChunkName: "exsys-patient-insurance.booking-modal" */
    )
);
