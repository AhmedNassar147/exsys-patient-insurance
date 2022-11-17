/*
 *
 * Component: `CreateOrEditUserModal`.
 *
 */
import { memo, useCallback } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import Flex from "@exsys-patient-insurance/flex";
import SelectWithApiQuery from "@exsys-patient-insurance/select-with-api-query";
import InputField from "@exsys-patient-insurance/input-field";
import SelectionCheck from "@exsys-patient-insurance/selection-check";
import SelectField from "@exsys-patient-insurance/select-field";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";
import Modal from "@exsys-patient-insurance/modal";
import { useAppConfigStore } from "@exsys-patient-insurance/app-config-store";
import { SelectChangeHandlerType } from "@exsys-patient-insurance/types";
import validateUserData from "../helpers/validateUserData";
import { userTypeList, initialUserCreationFormState } from "../constants";
import { UserRecordType, FormUserDataType } from "../index.interface";

interface CreateOrEditUserModalProps {
  visible: boolean;
  onClose: () => void;
  selectedUser: UserRecordType;
  onAfterSave: () => void;
  selectedProviderNo?: string;
}

const CreateOrEditUserModal = ({
  visible,
  onClose,
  onAfterSave,
  selectedProviderNo,
  selectedUser: {
    status: baseStatus,
    record_status: baseRecordStatus,
    provider_no: baseProviderNo,
    ...restSelectedUser
  },
}: CreateOrEditUserModalProps) => {
  const { addNotification } = useAppConfigStore();
  const { loading, mutate } = useBasicMutation({
    apiId: "POST_TPA_USER_TABLE_DATA",
    includeLanguage: true,
  });

  const handleSaveUser = useCallback(
    ({ planguageid, ...values }: FormUserDataType) => {
      mutate({
        body: values,
        cb: ({ apiValues: { status }, error }) => {
          const isError = !!error || status !== "success";

          addNotification({
            type: isError ? "error" : "success",
            message: isError ? error || "flssve" : "succmsg",
            description: isError ? error : "",
          });

          if (!isError) {
            onAfterSave();
          }
        },
      });
    },
    [mutate, onAfterSave]
  );

  const {
    values: {
      record_status,
      user_id,
      user_full_name_s,
      user_full_name_p,
      user_password,
      status,
      mobile_no,
      provider_no,
      user_type,
      user_password_confirm,
      staff_id,
      job_id,
    },
    handleChange,
    handleChangeMultipleInputs,
    handleSubmit,
    errors,
  } = useFormManager({
    initialValues: {
      ...initialUserCreationFormState,
      ...restSelectedUser,
      status: baseStatus || "A",
      record_status: baseRecordStatus || "n",
      user_password_confirm: undefined,
      provider_no: baseProviderNo || selectedProviderNo,
    } as FormUserDataType,
    // @ts-ignore
    validate: validateUserData,
    onSubmit: handleSaveUser,
  });

  const isEditingUser = record_status === "u";
  const modalTitle = isEditingUser ? "editusr" : "creatusr";
  const isAdminUser = user_type === "A";

  const handleChangeUserType: SelectChangeHandlerType = useCallback(
    ({ name, value }) =>
      handleChangeMultipleInputs({
        [name]: value,
        ...(value !== "A"
          ? {
              staff_id: undefined,
            }
          : null),
      }),
    [handleChangeMultipleInputs]
  );

  return (
    <Modal
      title={modalTitle}
      visible={visible}
      maskClosable={false}
      onClose={onClose}
      disabled={loading}
      loading={loading}
      onOk={handleSubmit}
      width="680px"
    >
      <Flex
        width="100%"
        wrap="true"
        gap="11px"
        align="baseline"
        padding="10px 0"
      >
        <InputField
          name="user_id"
          label="plcyusrcd"
          value={user_id}
          onChange={handleChange}
          width="20%"
          error={errors?.user_id}
        />
        <InputField
          name="user_full_name_p"
          label="engname"
          value={user_full_name_p}
          onChange={handleChange}
          width="calc(40% - 11px)"
          error={errors?.user_full_name_p}
          upperCaseFirstCharacter
          valueMatchPattern="/[a-zA-Z|\s]+/gi"
        />
        <InputField
          name="user_full_name_s"
          label="arname"
          value={user_full_name_s}
          onChange={handleChange}
          width="calc(40% - 11px)"
          error={errors?.user_full_name_s}
          valueMatchPattern="/[ء-ي|\s]+/gi"
        />

        <SelectField
          name="user_type"
          value={user_type}
          onChange={handleChangeUserType}
          width="30%"
          options={userTypeList}
          error={errors?.user_type}
          label="usrtyp"
        />
        <SelectWithApiQuery
          label="stfname"
          name="staff_id"
          width="calc(69% - 5px)"
          value={staff_id}
          onChange={handleChange}
          queryType="query"
          apiOrCodeId="QUERY_HR_STAFF_CODES_LIST"
          enableNetworkCache
          error={errors?.staff_id}
          mode="autocomplete"
          disabled={!isAdminUser}
        />

        {!isAdminUser && (
          <SelectWithApiQuery
            label="providername"
            name="provider_no"
            width="60%"
            value={provider_no}
            onChange={handleChange}
            queryType="query"
            apiOrCodeId="QUERY_PROVIDER_NAMES_LIST"
            enableNetworkCache
            error={errors?.provider_no}
          />
        )}

        <SelectWithApiQuery
          label="jobdesc"
          name="job_id"
          width="calc(40% - 11px)"
          value={job_id}
          onChange={handleChange}
          queryType="query"
          apiOrCodeId="QUERY_JOB_ID_LIST"
          enableNetworkCache
          error={errors?.job_id}
        />

        <InputField
          name="mobile_no"
          value={mobile_no}
          onChange={handleChange}
          width="160px"
          label="phn"
          error={errors?.mobile_no}
        />

        <SelectionCheck
          label="actve"
          name="status"
          checked={status}
          onChange={handleChange}
        />

        {!isEditingUser && (
          <Flex wrap="true" gap="11px" align="center" width="100%">
            <InputField
              name="user_password"
              label="pass"
              value={user_password}
              onChange={handleChange}
              width="calc(100% / 2 - 11px)"
              error={errors?.user_password}
              autoComplete="off"
            />

            <InputField
              name="user_password_confirm"
              label="passcnfrm"
              value={user_password_confirm}
              onChange={handleChange}
              width="calc(100% / 2 - 11px)"
              error={errors?.user_password_confirm}
              autoComplete="off"
            />
          </Flex>
        )}
      </Flex>
    </Modal>
  );
};

export default memo(CreateOrEditUserModal);
