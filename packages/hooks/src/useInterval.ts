/*
 *
 * Hook: `useInterval`.
 *
 */
import { useEffect, useRef } from "react";

type OptionsType = {
  action: () => any;
  timer: number;
  shouldIntervalStart: boolean;
};

const useInterval = ({ action, timer, shouldIntervalStart }: OptionsType) => {
  const savedCallback = useRef(() => null);

  useEffect(() => {
    savedCallback.current = action;
  }, [action]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (shouldIntervalStart) {
      intervalId = setInterval(() => savedCallback.current(), timer);
    }

    if (!shouldIntervalStart && !!intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [shouldIntervalStart, timer]);
};

export default useInterval;
