/*
 *
 * Package: `@exsys-clinio/booking-modal`.
 *
 */
import createLazyLoadedComponent from "@exsys-clinio/react-lazy";

export default createLazyLoadedComponent(
  () =>
    import("./component" /* webpackChunkName: "exsys-clinio.booking-modal" */)
);
