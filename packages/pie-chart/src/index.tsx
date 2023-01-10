/*
 *
 * Package: `@exsys-patient-insurance/pie-chart`.
 *
 */
import { memo, useCallback, useMemo } from "react";
import { PieChart as MinimalPieChart } from "react-minimal-pie-chart";
import { useTranslateIdFactory } from "@exsys-patient-insurance/labels-provider";
import Flex from "@exsys-patient-insurance/flex";
import { RecordTypeWithAnyValue } from "@exsys-patient-insurance/types";

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

const PieChart = ({ width, dataSource, height }: PieChartProps) => {
  const translateLabelId = useTranslateIdFactory();

  const { data, labels } = useMemo(() => {
    let data = [] as ProperPieChartDateItemWithKeyType[];
    let labels = [] as PieChartDateItemWithKeyType[];

    const length = dataSource?.length ?? 0;
    if (length) {
      for (let index = 0; index < length; index++) {
        const { label, ...otherValues } = dataSource[index];
        const { value } = otherValues;
        const translatedLabel = translateLabelId(label) as string;
        const key = `${translatedLabel} ${value}`;

        data = data.concat({
          ...otherValues,
          key,
          title: key,
        });

        labels = labels.concat({
          ...otherValues,
          key,
          label: translatedLabel,
        });
      }
    }

    return {
      data,
      labels,
    };
  }, [dataSource, translateLabelId]);

  const renderChartLabel = useCallback(
    ({ dataEntry: { value } }: RecordTypeWithAnyValue) => value,
    []
  );

  return (
    <Flex width={width} gap="5px" column="true" height={height}>
      <MinimalPieChart animate data={data} label={renderChartLabel} />
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
