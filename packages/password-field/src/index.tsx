/*
 *
 * Package: `@exsys-patient-insurance/password-field`.
 *
 */
import { memo, useCallback, useState, useMemo } from "react";
import InputField, {
  INPUT_FIELD_DEFAULT_PROPS,
} from "@exsys-patient-insurance/input-field";
import EyeIcon from "@exsys-patient-insurance/eye-icon";
import PasswordIcon from "@exsys-patient-insurance/password-icon";
import { colors } from "@exsys-patient-insurance/theme-values";
import PasswordFieldProps from "./index.interface";

const { blue2, lighterBlack, appPrimary } = colors;

const inputWrapperInlinePadding = "10px";
const inputWrapperPadding = `0px ${inputWrapperInlinePadding}`;

const PasswordField = ({ addonAfterWidth, ...props }: PasswordFieldProps) => {
  const [invisible, setVisibility] = useState(true);

  const onClickEyeIcon = useCallback(() => {
    setVisibility((previous) => !previous);
  }, []);

  const passwordIcon = useMemo(
    () => (
      <PasswordIcon
        width="1.4em"
        height="1.5em"
        color={blue2}
        alignSelf="center"
        marginInlineEnd="4px"
      />
    ),
    []
  );

  const eyeIcon = useMemo(
    () => (
      <EyeIcon
        color={lighterBlack}
        height="1.1em"
        width="1.1em"
        invisible={invisible}
      />
    ),
    [invisible]
  );

  const internalInputMaxWidth = `calc(100% - ${addonAfterWidth} - calc(${inputWrapperInlinePadding} * 2))`;

  return (
    <InputField
      {...props}
      addonBefore={passwordIcon}
      addonAfter={eyeIcon}
      onClickAddOnAfter={onClickEyeIcon}
      type={invisible ? "password" : "text"}
      addonAfterWidth={addonAfterWidth}
      inputWrapperPadding={inputWrapperPadding}
      internalInputMaxWidth={internalInputMaxWidth}
    />
  );
};
PasswordField.defaultProps = {
  ...INPUT_FIELD_DEFAULT_PROPS,
  size: "large",
  useShadow: true,
  autoCapitalize: true,
  color: appPrimary,
  placeholder: "pass",
  autoComplete: "none",
  addonAfterWidth: "32px",
};

export default memo(PasswordField);
