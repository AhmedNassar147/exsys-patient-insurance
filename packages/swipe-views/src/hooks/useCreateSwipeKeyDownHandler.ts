/*
 *
 * Hook: `useCreateSwipeKeyDownHandler`.
 *
 */
import { useCallback } from "react";

const useCreateSwipeKeyDownHandler = (
  goToNextSlide: () => void,
  goToPreviousSlide: () => void,
  disableVerticalArrowsToSwipe?: boolean
) => {
  const handleKeyDown = useCallback(
    (domEvent: React.KeyboardEvent<HTMLDivElement>) => {
      const { repeat, key } = domEvent;
      const leftUpKeys = ["ArrowLeft"];
      const rightDownKeys = ["ArrowRight"];

      if (!disableVerticalArrowsToSwipe) {
        leftUpKeys.push("ArrowUp");
        rightDownKeys.push("ArrowDown");
      }

      if (leftUpKeys.includes(key)) {
        domEvent.preventDefault();

        if (!repeat) {
          goToPreviousSlide();
        }
      } else if (rightDownKeys.includes(key)) {
        domEvent.preventDefault();

        if (!repeat) {
          goToNextSlide();
        }
      }
    },
    [goToPreviousSlide, goToNextSlide, disableVerticalArrowsToSwipe]
  );

  return handleKeyDown;
};

export default useCreateSwipeKeyDownHandler;
