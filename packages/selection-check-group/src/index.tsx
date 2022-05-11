/*
 *
 * Package: `@exsys-clinio/selection-check-group`.
 *
 */
import { useCallback, memo } from "react";
import Flex from "@exsys-clinio/flex";
import SelectionCheck from "@exsys-clinio/selection-check";
import FloatLabel from "@exsys-clinio/labeled-input";
import {
  ChangeEventParams,
  StringNumber,
  BooleanStringType,
  SelectionCheckModes,
  SelectionCheckGroupProps,
  MultipleSelectedValuesPropType,
  GetSelectionCheckGroupValueType,
} from "@exsys-clinio/types";

const SelectionCheckGroup = <T extends SelectionCheckModes>({
  onChange,
  name,
  value,
  disabled: groupDisabled,
  options,
  mode,
  vertical,
  spaceBetweenItems,
  margin,
  padding,
  height,
  width,
  itemFontWeight,
  label,
  labelType,
  className,
}: SelectionCheckGroupProps<T>) => {
  const isRadioGroupMode = mode === "radio";
  const hasLabel = !!label;

  const currentValue = value;

  const handleChange = useCallback(
    (checkItemValue: StringNumber) =>
      (event: ChangeEventParams<boolean | BooleanStringType>) => {
        const { name, value: checkedValue } = event;

        let nextChangeEventValue:
          | StringNumber
          | MultipleSelectedValuesPropType
          | undefined = checkedValue ? checkItemValue : undefined;

        if (!isRadioGroupMode) {
          const groupValuesArray =
            currentValue as MultipleSelectedValuesPropType;

          nextChangeEventValue = !checkedValue
            ? groupValuesArray?.filter((key) => key !== checkItemValue)
            : [...(groupValuesArray || []), checkItemValue];
        }

        onChange?.({
          name,
          value: nextChangeEventValue as GetSelectionCheckGroupValueType<T>,
        });
      },
    [onChange, isRadioGroupMode, currentValue]
  );

  const selectionCheckGroupComponent = (
    <Flex
      inlined
      height={height}
      column={vertical ? "true" : ""}
      wrap="true"
      gap={spaceBetweenItems}
      padding={padding}
      margin={hasLabel ? "" : margin}
      width={hasLabel ? "100%" : width}
      className={className}
    >
      {options?.map(({ disabled, label, value }) => {
        const isSelected = !isRadioGroupMode
          ? (currentValue as MultipleSelectedValuesPropType)?.includes(value)
          : currentValue === value;

        return (
          <SelectionCheck
            key={value}
            disabled={groupDisabled || disabled}
            label={label}
            mode={mode}
            name={name}
            checked={isSelected}
            onChange={handleChange(value)}
            fontWeight={itemFontWeight}
          />
        );
      })}
    </Flex>
  );

  switch (hasLabel) {
    case true:
      return (
        <FloatLabel
          width={width}
          label={label as string}
          margin={margin}
          value={!!value ? " " : 0}
          type={labelType}
          height={!vertical ? "30px" : undefined}
        >
          {selectionCheckGroupComponent}
        </FloatLabel>
      );

    default:
      return selectionCheckGroupComponent;
  }
};
SelectionCheckGroup.defaultProps = {
  spaceBetweenItems: "8px",
  vertical: false,
  padding: "4px 0",
  height: "auto",
  itemFontWeight: "500",
};

export default memo(SelectionCheckGroup);
