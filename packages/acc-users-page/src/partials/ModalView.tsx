import React, { memo, useState, useCallback, useEffect } from "react";
import Modal from "@exsys-patient-insurance/modal";
import PasswordField from "@exsys-patient-insurance/password-field";
import { AccUsersTableRecordType } from "../index.interface";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";
import { useAppConfigStore } from "@exsys-patient-insurance/app-config-store";

interface ModalViewProps {
  visible: boolean;
  onClose: () => void;
  selectedUsersData: AccUsersTableRecordType | undefined;
  oldPassword: string;
  refreshQueryableTables: () => void;
}

const ModalView: React.FC<ModalViewProps> = ({
  visible,
  onClose,
  selectedUsersData,
  oldPassword,
  refreshQueryableTables,
}) => {
  // const { handleClose } = useOpenCloseActionsWithState();

  // Replace this with your custom implementation to handle form values and state changes
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
    password_confirmation: "",
  });

  const { addNotification } = useAppConfigStore();

  useEffect(() => {
    if (selectedUsersData) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        oldPassword: selectedUsersData.user_password || oldPassword, // Use oldPassword prop here
      }));
    }
  }, [selectedUsersData, oldPassword]);

  const handleChange = useCallback(
    ({ value, name }: { value: string; name: string }) => {
      setFormValues((oldState) => ({
        ...oldState,
        [name]: value,
      }));
    },
    []
  );

  const { mutate } = useBasicMutation({
    apiId: "CHANGE_USER_PASSWORD",
    method: "post",
  });

  // Replace this with your custom implementation for form submission
  const onSubmit = useCallback(() => {
    mutate({
      body: {
        user_id: selectedUsersData?.key,
        old_password: selectedUsersData?.user_password,
        new_password: formValues?.newPassword,
      },
      cb: ({ apiValues: { status } }) => {
        const isSuccess = status === "success";
        addNotification(isSuccess ? status : "error");
        onClose();
        refreshQueryableTables();
      },
    });
  }, [
    addNotification,
    formValues?.newPassword,
    mutate,
    onClose,
    refreshQueryableTables,
    selectedUsersData?.key,
    selectedUsersData?.user_password,
  ]);

  return (
    <Modal
      title="Please Change Password"
      width="400px"
      onClose={onClose}
      visible={visible}
      usePortal
      onOk={onSubmit}
      keyboard
      okText="save"
      noCancelButton
      closeIconSize="1.1em"
      // maskClosable={false}
    >
      <PasswordField
        name="oldPassword"
        placeholder="oldpass"
        onChange={handleChange}
        value={formValues.oldPassword}
        margin="8px 0 0"
        disabled
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
      />
    </Modal>
  );
};

export default memo(ModalView);
