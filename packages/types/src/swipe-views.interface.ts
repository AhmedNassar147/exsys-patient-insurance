/*
 *
 * swipe-views: `@exsys-patient-insurance/types`.
 *
 */
export interface SwipeFrameProps {
  transformValue: string;
}

export interface BaseSwipeViewsProps {
  width?: string;
  height?: string;
  margin?: string;
}

export type SwipeViewRefValuesType = {
  goToNextSlide: () => void;
  goToPreviousSlide: () => void;
  goToSlide: (slideIndex: number) => void;
};

export type SwipeViewsRef = React.MutableRefObject<
  SwipeViewRefValuesType | undefined
>;

export interface UseSwipeStateProps {
  ref: SwipeViewsRef;
  count: number;
  initialActiveIndex?: number;
  loop?: boolean;
  loopTimeOut?: number;
  disableVerticalArrowsToSwipe?: boolean;
  onIndexChanged?: (nextSlideIndex: number) => void;
}

export interface SwipeViewsProps
  extends BaseSwipeViewsProps,
    Omit<UseSwipeStateProps, "ref" | "count"> {
  children: React.ReactNode[];
  className?: string;
  tabIndex?: number;
  disabledKeyDownSwipe?: boolean;
  disableMouseDownSwipe?: boolean;
  useCurrentDocumentDir?: boolean;
  alignFrameContent?: string;
}
