/*
 *
 * Package: `@exsys-patient-insurance/files-gallery`.
 *
 */
import createLazyComponent from "@exsys-patient-insurance/react-lazy";

export default createLazyComponent(
  () =>
    import(
      "./component" /* webpackChunkName: "exsys-patient-insurance.files-gallery" */
    )
);
