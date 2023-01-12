/*
 *
 * Hook: `useMakeSelectReportData`.
 *
 */
import useAppConfigStore from "./useAppConfigStore";

const useMakeSelectReportData = () => {
  const {
    state: { report_server_url, report_server_userid },
  } = useAppConfigStore();

  return {
    reportServerUrl: report_server_url,
    reportServerId: report_server_userid,
  };
};

export default useMakeSelectReportData;
