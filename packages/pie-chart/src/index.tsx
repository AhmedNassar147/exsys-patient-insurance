/*
 *
 * Package: `@exsys-patient-insurance/pie-chart`.
 *
 */
import { memo, useMemo } from "react";
import { PieChart as MinimalPieChart } from "react-minimal-pie-chart";
import { useTranslateIdFactory } from "@exsys-patient-insurance/labels-provider";
import Flex from "@exsys-patient-insurance/flex";

export interface PieChartDateItemType {
  color: string;
  value: number;
  label: string;
}

interface PieChartDateItemWithKeyType extends PieChartDateItemType {
  key: string;
}

interface ProperPieChartDateItemWithKeyType
  extends Omit<PieChartDateItemWithKeyType, "label"> {
  title: string;
}

interface PieChartProps {
  width?: string;
  height?: string;
  dataSource: PieChartDateItemType[];
}

const initialMemoizedData = {
  data: [] as ProperPieChartDateItemWithKeyType[],
  labels: [] as PieChartDateItemWithKeyType[],
};

const PieChart = ({ width, dataSource, height }: PieChartProps) => {
  const translateLabelId = useTranslateIdFactory();

  const { data, labels } = useMemo(
    () =>
      dataSource?.reduce((acc, entry) => {
        const { label, ...otherValues } = entry;
        const { value } = otherValues;

        const translatedLabel = translateLabelId(label) as string;
        const key = `${translatedLabel} ${value}`;

        acc.data = acc.data.concat({
          ...otherValues,
          key,
          title: key,
        });

        acc.labels = acc.labels.concat({
          ...otherValues,
          key,
          label: translatedLabel,
        });

        return acc;
      }, initialMemoizedData) || initialMemoizedData,
    [dataSource, translateLabelId]
  );

  return (
    <Flex width={width} gap="5px" column="true" height={height}>
      <MinimalPieChart animate data={data} />
      {!!labels?.length && (
        <Flex
          width="100%"
          justify="center"
          gap="5px"
          margin="2px 0 0"
          wrap="true"
        >
          {labels?.map(({ key, label, color }) => (
            <Flex
              width="auto"
              key={key}
              backgroundColor={color}
              color="white"
              justify="center"
              bordered
              minWidth="30px"
              padding="1px"
              borderColor={color}
            >
              {label}
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default memo(PieChart);
