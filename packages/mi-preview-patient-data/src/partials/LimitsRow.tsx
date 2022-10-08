/*
 *
 * Component: `LimitsRow`.
 *
 */
import { memo } from "react";
import Flex from "@exsys-patient-insurance/flex";
import Text from "@exsys-patient-insurance/text";
import LabeledViewLikeInput from "@exsys-patient-insurance/labeled-view-like-input";
import { mainGap, itemWidth } from "../constants";

interface LimitsRowProps {
  title: string;
  max: number;
  actual: number;
  maxBenefit: number;
  reserve: number;
}

const commonProps = {
  margin: "0",
  padding: "0",
  justify: "center",
  width: itemWidth,
  label: "",
};

const LimitsRow = ({
  title,
  max,
  actual,
  maxBenefit,
  reserve,
}: LimitsRowProps) => {
  const total =
    (max - actual - reserve < maxBenefit!
      ? max - actual - reserve
      : maxBenefit) || 0;

  return (
    <Flex width="100%" gap={mainGap}>
      <Text
        margin="0"
        padding="0"
        align="center"
        width={itemWidth}
        children={title}
      />
      <LabeledViewLikeInput
        {...commonProps}
        children={max}
        color={max < 0 ? "red" : undefined}
      />
      <LabeledViewLikeInput
        {...commonProps}
        children={actual}
        color={actual < 0 ? "red" : undefined}
      />
      <LabeledViewLikeInput
        {...commonProps}
        children={reserve}
        color={reserve < 0 ? "red" : undefined}
      />
      <LabeledViewLikeInput
        {...commonProps}
        children={total}
        color={total < 0 ? "red" : undefined}
      />
    </Flex>
  );
};
LimitsRow.defaultProps = {
  max: 0,
  actual: 0,
  maxBenefit: 0,
  reserve: 0,
};

export default memo(LimitsRow);
