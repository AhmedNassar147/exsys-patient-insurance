/*
 *
 * Constants: `@exsys-patient-insurance/swipe-views`.
 *
 */
export const DEFAULT_LOOP_TIME_OUT = 3600;

export const DEFAULT_SWIPE_OPTIONS = Object.freeze({
  width: "100%",
  height: "100%",
  margin: "0",
  initialActiveIndex: 0,
  tabIndex: 1,
  loopTimeOut: DEFAULT_LOOP_TIME_OUT,
  disableVerticalArrowsToSwipe: false,
  disabledKeyDownSwipe: false,
  useCurrentDocumentDir: true,
});
