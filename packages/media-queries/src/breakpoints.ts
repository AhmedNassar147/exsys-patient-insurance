/*
 *
 * `breakpoints`: `@exsys-patient-insurance/media-queries`.
 *
 */
// 'xs' is from 0 to 'sm', we don't use a media query to target it: 'mobile-first'.
// WARNING: 'xxl' and 'xxxl' breakpoints are not currently supported by our components/Grid.
export const breakpoints = Object.freeze({
  sm: 567,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
  xxxl: 1920,
} as const);
