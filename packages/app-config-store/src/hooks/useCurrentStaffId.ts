/*
 *
 * Hook: `useCurrentStaffId`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useCurrentStaffId = () => {
  const {
    state: { login_staff_id },
  } = useAppConfigStore();

  return login_staff_id;
};

export default useCurrentStaffId;
