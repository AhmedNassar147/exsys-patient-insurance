/*
 *
 * Component: `PatientBaseChartsView`.
 *
 */
import { memo, useState, useCallback } from "react";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import {
  OnResponseActionType,
  RecordType,
} from "@exsys-patient-insurance/types";
import type { PieChartDateItemType } from "@exsys-patient-insurance/pie-chart";
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";
import PieChartCardView from "./PieChartCardView";

const initialState = {
  employeesChartData: [] as PieChartDateItemType[],
  dependantsChartData: [] as PieChartDateItemType[],
  parentsChartData: [] as PieChartDateItemType[],
};

const {
  employeesChartData: initialEmployeesChartData,
  dependantsChartData: initialDependantsChartData,
  parentsChartData: initialParentsChartData,
} = initialState;

interface PatientBaseChartsViewProps {
  params: RecordTypeWithAnyValue;
}

const PatientBaseChartsView = ({ params }: PatientBaseChartsViewProps) => {
  const [
    { employeesChartData, dependantsChartData, parentsChartData },
    setState,
  ] = useState(initialState);

  const { date_to, date_form, client_id } = params;

  const skipQuery = !client_id || !date_to || !date_form;

  const handlePatientBaseChartDataResponse: OnResponseActionType<
    RecordType<RecordType<PieChartDateItemType[]>>
  > = useCallback(({ apiValues }) => {
    const { data } = apiValues;
    const { employees, dependants, parents } = data || {};

    setState(() => ({
      employeesChartData: employees || initialEmployeesChartData,
      dependantsChartData: dependants || initialDependantsChartData,
      parentsChartData: parents || initialParentsChartData,
    }));
  }, []);

  const { loading: basePatientChartDataLoading } = useBasicQuery({
    apiId: "QUERY_CLIENT_DASHBOARD_PATIENT_CHART_DATA",
    checkAllParamsValuesToQuery: true,
    callOnFirstRender: false,
    skipQuery,
    onResponse: handlePatientBaseChartDataResponse,
    params,
  });

  return (
    <>
      <PieChartCardView
        title="emplyes"
        loading={basePatientChartDataLoading}
        dataSource={employeesChartData}
        width="calc(98% / 5 - 10px)"
      />
      <PieChartCardView
        title="prents"
        loading={basePatientChartDataLoading}
        dataSource={parentsChartData}
        width="calc(98% / 5 - 10px)"
      />
      <PieChartCardView
        title="dpndnts"
        loading={basePatientChartDataLoading}
        dataSource={dependantsChartData}
        width="calc(98% / 5 - 10px)"
      />
    </>
  );
};

export default memo(PatientBaseChartsView);
