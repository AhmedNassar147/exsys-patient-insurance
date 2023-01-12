/*
 *
 * Component: `TitleView`.
 *
 */
import { memo, useMemo, useCallback } from "react";
import SelectionCheckGroup from "@exsys-patient-insurance/selection-check-group";
import { onChangeEvent } from "@exsys-patient-insurance/types";
import Flex from "@exsys-patient-insurance/flex";

interface TitleOptionsProps {
  options: string[];
  activeOption: string;
  onChange: (docName: string) => void;
}

const TitleView = ({ options, activeOption, onChange }: TitleOptionsProps) => {
  const radioOptions = useMemo(() => {
    return (
      options &&
      options.map((item) => ({
        label: item,
        value: item,
      }))
    );
  }, [options]);

  const changeHandler: onChangeEvent = useCallback(
    ({ value }) => onChange(value),
    [onChange]
  );

  return (
    <Flex width="80%">
      <span>{activeOption}</span>
      <Flex width="81%" justify="flex-end" align="center">
        <SelectionCheckGroup
          mode="radio"
          options={radioOptions}
          onChange={changeHandler}
          value={activeOption}
        />
      </Flex>
    </Flex>
  );
};

export default memo(TitleView);
