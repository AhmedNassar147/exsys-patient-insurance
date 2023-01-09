/*
 *
 * `ClientDashboardPage`: `@exsys-patient-insurance/client-dashboard-page`.
 *
 */
import { memo, useMemo } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import Flex from "@exsys-patient-insurance/flex";
import DatePickerField from "@exsys-patient-insurance/date-picker-field";
import SelectWithApiQuery from "@exsys-patient-insurance/select-with-api-query";
import TableWithApiQuery from "@exsys-patient-insurance/exsys-table-with-api-query";
import SelectField from "@exsys-patient-insurance/select-field";
import PatientBaseChartsView from "./partials/PatientBaseChartsView";
import PieChartCardViewWithApiQuery from "./partials/PieChartCardViewWithApiQuery";
import {
  initialState,
  NO_OF_VISITS_OPTIONS,
  TABLE_COLUMNS,
  CARD_HEIGHT,
} from "./constants";

const ClientDashboardPage = () => {
  const {
    values: { date_to, date_form, client_id, no_of_visit },
    handleChange,
  } = useFormManager({
    initialValues: initialState,
  });

  const memoizedParams = useMemo(
    () => ({
      date_to,
      date_form,
      client_id,
    }),
    [date_to, date_form, client_id]
  );

  const skipQuery = !client_id || !date_to || !date_form;

  return (
    <>
      <Flex gap="12px" align="center" bordered padding="10px">
        <SelectWithApiQuery
          queryType="query"
          apiOrCodeId="QUERY_ACCOUNTS_LIST"
          callOnFirstRender
          value={client_id}
          name="client_id"
          onChange={handleChange}
          width="350px"
          label="clientid"
          allowClear={false}
        />

        <DatePickerField
          name="date_form"
          value={date_form}
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
          min={date_form}
        />

        <SelectField
          label="nofvst"
          name="no_of_visit"
          value={no_of_visit}
          onChange={handleChange}
          width="120px"
          options={NO_OF_VISITS_OPTIONS}
        />
      </Flex>

      <Flex
        align="center"
        width="100%"
        gap="10px"
        justify="center"
        margin="10px 0px"
      >
        <PatientBaseChartsView params={memoizedParams} />

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
          width="calc(100% - 60% - 20px)"
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
            no_of_visit: no_of_visit,
            ...memoizedParams,
          }}
        />
      </Flex>
    </>
  );
};

export default memo(ClientDashboardPage);
