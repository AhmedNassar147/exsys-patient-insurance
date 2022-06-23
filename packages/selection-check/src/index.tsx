/*
 *
 * Package: `@exsys-patient-insurance/selection-check`.
 *
 */
import { memo, useCallback, useMemo } from "react";
import Text from "@exsys-patient-insurance/text";
import {
  getBooleanValueFromMaybeNonOne,
  getCheckInputNextCheckValue,
} from "@exsys-patient-insurance/helpers";
import { useCurrentPagePrivileges } from "@exsys-patient-insurance/hooks";
import { colors } from "@exsys-patient-insurance/theme-values";
import { SelectionCheckProps } from "@exsys-patient-insurance/types";
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
  const { f_update } = useCurrentPagePrivileges();

  const fieldDisabled = disabled || f_update === "N";

  const [{ actualValue: checkedValue, isStringValue: isCheckBooleanString }] =
    useMemo(() => [getBooleanValueFromMaybeNonOne(checked)], [checked]);

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
    disabled: fieldDisabled,
    mode,
    checked: checkedValue,
  };

  return (
    <SelectedContainer
      disabled={fieldDisabled}
      onClick={fieldDisabled || readonly ? undefined : handleClick}
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
