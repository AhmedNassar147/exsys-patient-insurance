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
}

const PieChartCardView = ({
  title,
  loading,
  dataSource,
  width,
}: PieChartCardViewProps) => {
  const noData = !loading && !dataSource?.length;

  return (
    <ChartCardView width={width}>
      <PageTitle
        children={title}
        bottomborder
        center
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
        />
      </AsyncAwaiter>
    </ChartCardView>
  );
};

export default memo(PieChartCardView);
