/*
 *
 * `ClientDashboardPage`: `@exsys-patient-insurance/client-dashboard-page`.
 *
 */
import { memo, useMemo } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import Flex from "@exsys-patient-insurance/flex";
import DatePickerField from "@exsys-patient-insurance/date-picker-field";
import TableWithApiQuery from "@exsys-patient-insurance/exsys-table-with-api-query";
import InputNumber from "@exsys-patient-insurance/input-number";
import { useAppConfigStore } from "@exsys-patient-insurance/app-config-store";
import PatientBaseChartsView from "./partials/PatientBaseChartsView";
import PieChartCardViewWithApiQuery from "./partials/PieChartCardViewWithApiQuery";
import { initialState, TABLE_COLUMNS, CARD_HEIGHT } from "./constants";

const ClientDashboardPage = () => {
  const {
    values: { date_to, date_from, no_of_visit },
    handleChange,
  } = useFormManager({
    initialValues: initialState,
  });

  const {
    state: { client_id },
  } = useAppConfigStore();

  const memoizedParams = useMemo(
    () => ({
      date_to,
      date_from,
      client_id,
    }),
    [date_to, date_from, client_id]
  );

  const skipQuery = !date_to || !date_from;

  return (
    <>
      <Flex gap="12px" align="center" bordered padding="10px">
        <DatePickerField
          name="date_from"
          value={date_from}
          onChange={handleChange}
          width="120px"
          label="datefrm"
        />
        <DatePickerField
          name="date_to"
          value={date_to}
          onChange={handleChange}
          width="120px"
          label="datet"
          min={date_from}
        />

        <InputNumber
          label="nofvst"
          name="no_of_visit"
          value={no_of_visit}
          onChange={handleChange}
          width="120px"
          min={1}
        />
      </Flex>

      <Flex
        align="center"
        width="100%"
        gap="10px"
        justify="center"
        margin="10px 0px"
      >
        <PatientBaseChartsView />

        <PieChartCardViewWithApiQuery
          title="adistns"
          apiId="QUERY_CLIENT_DASHBOARD_ADDITION_PATIENT_CHART_DATA"
          params={memoizedParams}
          width="calc(98% / 5 - 10px)"
        />

        <PieChartCardViewWithApiQuery
          title="cncltins"
          apiId="QUERY_CLIENT_DASHBOARD_CANCELATION_PATIENT_CHART_DATA"
          params={memoizedParams}
          width="calc(98% / 5)"
        />
      </Flex>

      <Flex width="100%" gap="10px" justify="space-between">
        <PieChartCardViewWithApiQuery
          title="this month chart"
          apiId="QUERY_CLIENT_DASHBOARD_CANCELATION_PATIENT_CHART_DATA"
          params={memoizedParams}
          width="calc(100% - 60% - 10px)"
        />

        <TableWithApiQuery
          queryApiId="QUERY_CLIENT_DASHBOARD_PATIENT_TOP_VISITS_TABLE_DATA"
          rowKey="rowKey"
          width="60%"
          columns={TABLE_COLUMNS}
          skipQuery={skipQuery}
          callOnFirstRender
          height={CARD_HEIGHT}
          margin="0"
          baseQueryAPiParams={{
            no_of_visit,
            ...memoizedParams,
          }}
        />
      </Flex>
    </>
  );
};

export default memo(ClientDashboardPage);
