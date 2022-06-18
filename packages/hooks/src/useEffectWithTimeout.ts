/*
 *
 * Hook: `useEffectWithTimeout`.
 *
 */
import { useEffect } from "react";

const DEFAULT_OPTIONS = {
  effectTimeoutMs: 650,
  effectArguments: [],
};

type EffectFnType = (...params: any[]) => any;

type IProps<
  EffectFn extends EffectFnType,
  ArgType = unknown,
  DependencyType = unknown
> = {
  conditionToNotRunEffect?: boolean;
  effectTimeoutMs?: number;
  effectFn: EffectFn;
  effectArguments?: ArgType[];
  dependencies?: DependencyType[];
};

const useEffectWithTimeout = <
  EffectFn extends EffectFnType,
  ArgType = unknown,
  DependencyType = unknown
>(
  options: IProps<EffectFn, ArgType, DependencyType>
) => {
  const {
    conditionToNotRunEffect,
    effectTimeoutMs,
    effectFn,
    effectArguments,
    dependencies,
  } = { ...DEFAULT_OPTIONS, ...options };

  useEffect(
    () => {
      let timeoutId: NodeJS.Timeout;

      if (conditionToNotRunEffect) {
        return;
      }

      timeoutId = setTimeout(
        () => effectFn(...effectArguments),
        effectTimeoutMs
      );

      return () => clearTimeout(timeoutId);
    },
    // eslint-disable-next-line
    [...(dependencies || [])]
  );
};

export default useEffectWithTimeout;
