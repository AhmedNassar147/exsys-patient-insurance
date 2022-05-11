/*
 *
 * Hook: `useBoundingClientRect`
 *
 */
import { useRef, useState, useLayoutEffect } from "react";

const useBoundingClientRect = <T>(
  deps?: T[]
): [React.RefObject<HTMLDivElement>, DOMRect | undefined] => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect>();

  useLayoutEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;
      setRect(element.getBoundingClientRect());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || []);

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (elementRef.current) {
      timeoutId = setTimeout(() => {
        const element = elementRef.current;
        setRect(element?.getBoundingClientRect?.());
      }, 350);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || []);

  return [elementRef, rect];
};

export default useBoundingClientRect;
