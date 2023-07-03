/*
 *
 * Component: `PieChartCardView`.
 *
 */
import { memo } from "react";
import PieChart, {
  PieChartDateItemType,
} from "@exsys-patient-insurance/pie-chart";
import { PageTitle } from "@exsys-patient-insurance/text";
import AsyncAwaiter from "@exsys-patient-insurance/async-awaiter";
import { ChartCardView } from "../styled";

interface PieChartCardViewProps {
  title: string;
  dataSource: PieChartDateItemType[];
  width?: string;
  loading?: boolean;
  labelColor?: string;
}

const PieChartCardView = ({
  title,
  loading,
  dataSource,
  width,
  labelColor,
}: PieChartCardViewProps) => {
  const noData = !loading && !dataSource?.length;

  return (
    <ChartCardView width={width}>
      <PageTitle
        children={title}
        bottomborder="true"
        center="true"
        padding="5px 0"
        width="100%"
        margin="0"
        fontSize="ff7"
        weight="bold"
      />
      <AsyncAwaiter
        noData={noData}
        loading={loading}
        noWrapper={!loading && !noData}
        height="100px"
      >
        <PieChart
          width="100%"
          height="calc(100% - 30px)"
          dataSource={dataSource}
          labelColor={labelColor}
        />
      </AsyncAwaiter>
    </ChartCardView>
  );
};

export default memo(PieChartCardView);
