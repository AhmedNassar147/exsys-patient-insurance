/*
 *
 * Hook: `useCreateSwipeActionsFromRef`.
 *
 */
import { useCallback } from "react";
import { SwipeViewsRef } from "@exsys-patient-insurance/types";

const useCreateSwipeActionsFromRef = (swipeRef: SwipeViewsRef) => {
  const goToNext = useCallback(
    () => swipeRef.current?.goToNextSlide(),
    [swipeRef]
  );

  const goToPrevious = useCallback(
    () => swipeRef.current?.goToPreviousSlide(),
    [swipeRef]
  );

  const goToSlide = useCallback(
    (slideIndex: number) => swipeRef.current?.goToSlide(slideIndex),
    [swipeRef]
  );

  return {
    goToNext,
    goToPrevious,
    goToSlide,
  };
};

export default useCreateSwipeActionsFromRef;
