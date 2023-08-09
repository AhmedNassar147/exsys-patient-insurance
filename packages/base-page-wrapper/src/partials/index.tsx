/*
 *
 * Component: `@exsys-patient-insurance/base-page-wrapper`.
 *
 */
import { memo, useState, useLayoutEffect } from "react";
import type { SizeType } from "@exsys-patient-insurance/app-sidebar";
import { getItemFromStorage } from "@exsys-patient-insurance/helpers";
import Modal from "@exsys-patient-insurance/modal";
import PasswordField from "@exsys-patient-insurance/password-field";
import {
  useModalRef,
  useOpenCloseActionsWithState,
} from "@exsys-patient-insurance/hooks";
import SideBarWithItem from "./SideBarWithItem";
import useChangePassword from "./usePasswordChange";
import { BasePageWrapper, BasePageContent } from "../styled";
import { BasePageComponentProps } from "../index.interface";

const BasePageComponent = ({ children }: BasePageComponentProps) => {
  const [sideBarSize, setSideBarSize] = useState<SizeType>("small");
  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();
  const { modalRef, close } = useModalRef();
  useLayoutEffect(() => {
    const currentPassword = getItemFromStorage<string>("password");
    if (currentPassword === "123456") {
      handleOpen();
    }
  }, [handleOpen]);
  const { handleChange, isSubmiting, onSubmit, error, disabled, formValues } =
    useChangePassword(close);

  return (
    <>
      <BasePageWrapper>
        <SideBarWithItem
          sideBarSize={sideBarSize}
          setSideBarSize={setSideBarSize}
        />
        <BasePageContent sideBarSize={sideBarSize}>{children}</BasePageContent>
      </BasePageWrapper>

      <Modal
        title="Please Change Password"
        width="400px"
        onClose={handleClose}
        visible={visible}
        usePortal
        ref={modalRef}
        loading={isSubmiting}
        disabled={disabled}
        onOk={onSubmit}
        keyboard
        okText="save"
        noCancelButton
        closeIconSize="0"
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

export default memo(BasePageComponent);
