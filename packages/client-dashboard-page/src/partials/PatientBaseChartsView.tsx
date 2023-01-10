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
import { useAppConfigStore } from "@exsys-patient-insurance/app-config-store";
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

const PatientBaseChartsView = () => {
  const [
    { employeesChartData, dependantsChartData, parentsChartData },
    setState,
  ] = useState(initialState);

  const {
    state: { client_id },
  } = useAppConfigStore();

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
    skipQuery: !client_id,
    onResponse: handlePatientBaseChartDataResponse,
    params: {
      client_id,
    },
  });

  return (
    <>
      <PieChartCardView
        title="emplyes"
        loading={basePatientChartDataLoading}
        dataSource={employeesChartData}
        width="calc(98% / 5 - 10px)"
        key="1"
      />
      <PieChartCardView
        title="prents"
        loading={basePatientChartDataLoading}
        dataSource={parentsChartData}
        width="calc(98% / 5 - 10px)"
        key="2"
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
