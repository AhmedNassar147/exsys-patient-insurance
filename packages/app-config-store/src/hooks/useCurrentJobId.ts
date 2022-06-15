/*
 *
 * Hook: `useCurrentJobId`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useCurrentJobId = () => {
  const {
    state: { job_id },
  } = useAppConfigStore();

  return job_id;
};

export default useCurrentJobId;
