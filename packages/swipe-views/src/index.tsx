/*
 *
 * Package: `@exsys-patient-insurance/swipe-views`.
 *
 */
import { Children, forwardRef, useMemo } from "react";
import { useMakeSelectIsRTLLayout } from "@exsys-patient-insurance/app-config-store";
import {
  SwipeViewsProps,
  SwipeViewsRef,
  SwipeViewRefValuesType,
} from "@exsys-patient-insurance/types";
import { SwipeFrame, SwipeWrapper, FramesWrapper } from "./styled";
import useSwipeState from "./hooks/useSwipeState";
import { DEFAULT_SWIPE_OPTIONS } from "./constants";

const SwipeViews = (props: SwipeViewsProps, ref: SwipeViewsRef) => {
  const {
    width,
    height,
    margin,
    initialActiveIndex,
    tabIndex,
    children,
    className,
    loop,
    loopTimeOut,
    onIndexChanged,
    disableVerticalArrowsToSwipe,
    disabledKeyDownSwipe,
    disableMouseDownSwipe,
    useCurrentDocumentDir,
    alignFrameContent,
  } = {
    ...DEFAULT_SWIPE_OPTIONS,
    ...props,
  };

  const count = Children.count(children);

  const {
    handleKeyDown,
    currentActiveIndex,
    reactSwipeableProps: {
      ref: swipeableRefCallback,
      onMouseDown,
      ...reactSwipeableHandlers
    },
  } = useSwipeState({
    ref,
    count,
    initialActiveIndex,
    loop,
    loopTimeOut,
    onIndexChanged,
    disableVerticalArrowsToSwipe,
  });

  const isRightToLeft = useMakeSelectIsRTLLayout();

  const transformValue = useMemo(() => {
    let initialTransformValue = !currentActiveIndex
      ? "0px"
      : `${currentActiveIndex * 100}%`;

    return isRightToLeft && useCurrentDocumentDir
      ? initialTransformValue
      : `-${initialTransformValue}`;
  }, [currentActiveIndex, isRightToLeft, useCurrentDocumentDir]);

  if (!count) {
    return null;
  }

  return (
    <SwipeWrapper
      ref={swipeableRefCallback}
      width={width}
      height={height}
      margin={margin}
      tabIndex={tabIndex}
      aria-label="slider"
      aria-roledescription="carousel"
      onKeyDown={disabledKeyDownSwipe ? undefined : handleKeyDown}
      className={className}
      {...reactSwipeableHandlers}
      onMouseDown={disableMouseDownSwipe ? undefined : onMouseDown}
    >
      <FramesWrapper transformValue={transformValue}>
        {children.map(
          (currentElement: React.ReactNode, currentElementIndex: number) => (
            <SwipeFrame
              alignFrameContent={alignFrameContent}
              key={currentElementIndex}
            >
              {currentElement}
            </SwipeFrame>
          )
        )}
      </FramesWrapper>
    </SwipeWrapper>
  );
};

export default forwardRef<SwipeViewRefValuesType | undefined, SwipeViewsProps>(
  // @ts-ignore ignore react `forwardRef` misleading type.
  SwipeViews
);
export { default as useCreateSwipeActionsFromRef } from "./hooks/useCreateSwipeActionsFromRef";
export { default as useCreateSwipeKeyDownHandler } from "./hooks/useCreateSwipeKeyDownHandler";
