/*
 *
 * Package: `@exsys-clinio/selection-check`.
 *
 */
import { memo, useCallback, useMemo } from "react";
import Text from "@exsys-clinio/text";
import {
  getBooleanValueFromMaybeNonOne,
  getCheckInputNextCheckValue,
} from "@exsys-clinio/helpers";
import { colors } from "@exsys-clinio/theme-values";
import { SelectionCheckProps } from "@exsys-clinio/types";
import { SelectedContainer, CheckWrapper, CheckMark } from "./styled";

const SelectionCheck = ({
  label,
  mode,
  checked,
  disabled,
  name,
  onChange,
  height,
  margin,
  className,
  block,
  width,
  fontWeight,
  wrapperMarginEnd,
  overflow,
  readonly,
}: SelectionCheckProps) => {
  const [
    { actualValue: checkedValue, isStringValue: isCheckBooleanString },
  ] = useMemo(() => {
    return [getBooleanValueFromMaybeNonOne(checked)];
  }, [checked]);

  const handleClick = useCallback(() => {
    const nextChecked = getCheckInputNextCheckValue(
      !checkedValue,
      isCheckBooleanString,
      isCheckBooleanString ? ["Y", "N"].includes(checked as string) : false
    );

    onChange?.({
      name: name || "",
      value: nextChecked,
    });
  }, [checkedValue, isCheckBooleanString, checked, onChange, name]);

  const sharedProps = {
    disabled,
    mode,
    checked: checkedValue,
  };

  return (
    <SelectedContainer
      disabled={disabled}
      onClick={disabled || readonly ? undefined : handleClick}
      height={height}
      margin={margin}
      block={block}
      width={width}
      overflow={overflow}
      className={className}
    >
      <CheckWrapper {...sharedProps} wrapperMarginEnd={wrapperMarginEnd}>
        <CheckMark {...sharedProps} />
      </CheckWrapper>

      {label && (
        <Text
          tag="div"
          margin="0"
          ellipsis="true"
          fontSize="inherit"
          color={checkedValue ? colors.appPrimary : "inherit"}
          cursor="inherit"
          weight={fontWeight}
          lineheight="normal"
        >
          {label}
        </Text>
      )}
    </SelectedContainer>
  );
};
SelectionCheck.defaultProps = {
  fontWeight: "500",
  wrapperMarginEnd: "8px",
  overflow: "hidden",
};

export default memo(SelectionCheck);
