/*
 *
 * Hook: `useStopPropagation`.
 *
 */
import { useCallback } from "react";

const useStopPropagation = () => {
  return useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    // event.preventDefault();
  }, []);
};

export default useStopPropagation;
