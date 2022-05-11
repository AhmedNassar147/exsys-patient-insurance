/*
 *
 * Hook: `useMakeSelectIsRTLLayout`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useMakeSelectIsRTLLayout = () => {
  const {
    state: { isRightToLeft },
  } = useAppConfigStore();

  return isRightToLeft;
};

export default useMakeSelectIsRTLLayout;
