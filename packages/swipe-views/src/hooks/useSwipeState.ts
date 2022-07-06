/*
 *
 * Hook: `useSwipeState`.
 *
 */
import { useCallback, useState, useImperativeHandle } from "react";
import { useSwipeable } from "react-swipeable";
import { useEffectWithTimeout } from "@exsys-patient-insurance/hooks";
import { UseSwipeStateProps } from "@exsys-patient-insurance/types";
import useCreateSwipeKeyDownHandler from "./useCreateSwipeKeyDownHandler";
import { DEFAULT_LOOP_TIME_OUT } from "../constants";

const useSwipeState = ({
  ref,
  count,
  initialActiveIndex,
  loop,
  loopTimeOut,
  onIndexChanged,
  disableVerticalArrowsToSwipe,
}: UseSwipeStateProps) => {
  const [currentActiveIndex, setActionIndex] = useState(
    () => initialActiveIndex || 0
  );

  const moveToIndex = useCallback(
    (nextIndex: number) => {
      if (onIndexChanged) {
        onIndexChanged(nextIndex);
      }

      setActionIndex(() => nextIndex);
    },
    [onIndexChanged]
  );

  const goToNextSlide = useCallback(() => {
    const nextSlide = currentActiveIndex + 1;
    const isNextSlideGreaterThanCount = nextSlide > count - 1;

    moveToIndex(isNextSlideGreaterThanCount ? 0 : nextSlide);
  }, [count, currentActiveIndex, moveToIndex]);

  const goToPreviousSlide = useCallback(() => {
    const nextIndex = currentActiveIndex - 1;

    moveToIndex(nextIndex < 0 ? currentActiveIndex : nextIndex);
  }, [currentActiveIndex, moveToIndex]);

  const goToSlide = useCallback(
    (slideIndex: number) => {
      if (slideIndex !== currentActiveIndex) {
        moveToIndex(slideIndex > count - 1 || slideIndex <= 0 ? 0 : slideIndex);
      }
    },
    [count, moveToIndex, currentActiveIndex]
  );

  const handleKeyDown = useCreateSwipeKeyDownHandler(
    goToNextSlide,
    goToPreviousSlide,
    disableVerticalArrowsToSwipe
  );

  // @see {@link https://github.com/dogfessional/react-swipeable#configuration-props}
  const reactSwipeableProps = useSwipeable({
    onSwipedLeft: goToNextSlide,
    onSwipedRight: goToPreviousSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useImperativeHandle(ref, () => ({
    goToNextSlide,
    goToPreviousSlide,
    goToSlide,
  }));

  useEffectWithTimeout({
    conditionToNotRunEffect: !loop,
    effectTimeoutMs: loopTimeOut || DEFAULT_LOOP_TIME_OUT,
    effectFn: goToNextSlide,
    dependencies: [currentActiveIndex, loop],
  });

  return {
    currentActiveIndex,
    handleKeyDown,
    reactSwipeableProps,
  };
};

export default useSwipeState;
