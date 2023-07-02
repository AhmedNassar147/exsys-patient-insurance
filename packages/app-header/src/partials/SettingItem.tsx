/*
 *
 * Component: `SettingsItem`.
 *
 */
import { memo, useMemo } from "react";
import Modal from "@exsys-patient-insurance/modal";
import { spacings } from "@exsys-patient-insurance/theme-values";
import PasswordField from "@exsys-patient-insurance/password-field";
import PasswordIcon from "@exsys-patient-insurance/password-icon";
import DropDown from "@exsys-patient-insurance/drop-down";
import SettingIcon from "@exsys-patient-insurance/setting-icon";
import { useModalRef } from "@exsys-patient-insurance/hooks";
import useChangePassword from "../hooks/useChangePassword";
import { PopoverItem, StyledFlex, PopOverContent } from "../styled";

const iconDimensions = {
  width: spacings.sp6,
  height: spacings.sp6,
};

const SettingsItem = () => {
  const { modalRef, toggle, close } = useModalRef();

  const { handleChange, isSubmiting, onSubmit, error, disabled, formValues } =
    useChangePassword(close);

  const trigger = useMemo(() => <SettingIcon {...iconDimensions} />, [toggle]);

  return (
    <>
      <DropDown
        trigger={trigger}
        menuWidth="180px"
        usePortal
        subtractionSidesValue="5%"
      >
        <PopOverContent>
          <StyledFlex align="center" gap="10px">
            <PasswordIcon {...iconDimensions} />
            <PopoverItem children="chngpass" onClick={toggle} />
          </StyledFlex>
        </PopOverContent>
      </DropDown>

      <Modal
        ref={modalRef}
        title="chngpass"
        width="470px"
        loading={isSubmiting}
        disabled={disabled}
        onOk={onSubmit}
        keyboard
        okText="save"
      >
        <PasswordField
          name="oldPassword"
          placeholder="oldpass"
          onChange={handleChange}
          value={formValues.oldPassword}
          margin="8px 0 0"
        />

        <PasswordField
          name="newPassword"
          placeholder="nwpass"
          onChange={handleChange}
          value={formValues.newPassword}
          margin="8px 0"
        />

        <PasswordField
          name="password_confirmation"
          placeholder="passcnfrm"
          onChange={handleChange}
          onPressEnter={onSubmit}
          value={formValues.password_confirmation}
          error={error}
        />
      </Modal>
    </>
  );
};

export default memo(SettingsItem);
