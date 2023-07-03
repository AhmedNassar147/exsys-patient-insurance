/*
 *
 * Component: `PieChartCardViewWithApiQuery`.
 *
 */
import { memo, useState, useCallback } from "react";
import { useBasicQuery } from "@exsys-patient-insurance/network-hooks";
import type { PieChartDateItemType } from "@exsys-patient-insurance/pie-chart";
import {
  OnResponseActionType,
  RecordType,
  RecordTypeWithAnyValue,
  ApiIdsTypes,
} from "@exsys-patient-insurance/types";
import PieChartCardView from "./PieChartCardView";

interface PieChartCardViewProps {
  title: string;
  params: RecordTypeWithAnyValue;
  apiId: ApiIdsTypes;
  width?: string;
  labelColor?: string;
}

const PieChartCardViewWithApiQuery = ({
  title,
  params,
  apiId,
  width,
  labelColor,
}: PieChartCardViewProps) => {
  const [dataSource, setDataSource] = useState<PieChartDateItemType[]>([]);

  const handlePatientChartDataResponse: OnResponseActionType<
    RecordType<PieChartDateItemType[]>
  > = useCallback(({ apiValues }) => {
    const { data } = apiValues;
    setDataSource(data || []);
  }, []);

  const { date_to, date_from, client_id } = params;

  const skipQuery = !client_id || !date_to || !date_from;

  const { loading } = useBasicQuery({
    apiId,
    checkAllParamsValuesToQuery: true,
    skipQuery,
    onResponse: handlePatientChartDataResponse,
    params,
  });

  return (
    <PieChartCardView
      title={title}
      width={width}
      loading={loading}
      dataSource={dataSource}
      labelColor={labelColor}
    />
  );
};

export default memo(PieChartCardViewWithApiQuery);
