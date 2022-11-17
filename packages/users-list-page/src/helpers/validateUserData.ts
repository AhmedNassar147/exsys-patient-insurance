/*
 *
 * Helper: `validateUserData`.
 *
 */
import { validateFields } from "@exsys-patient-insurance/helpers";
import { FormUserDataType } from "../index.interface";

const validateUserData = (userData: FormUserDataType) => {
  const {
    planguageid,
    record_status,
    user_password,
    user_password_confirm,
    user_type,
    staff_id,
    status,
    provider_name,
    dashboard,
    total,
    job_description,
    provider_no,
    ...otherData
  } = userData;

  const isEditingUser = record_status === "u";
  const isAdminUser = user_type === "A";

  let errors = validateFields({
    ...otherData,
    user_type,
    ...(isEditingUser
      ? null
      : {
          user_password,
          user_password_confirm,
        }),
    ...(isAdminUser ? { staff_id } : { provider_no }),
  });

  const {
    user_password: userPasswordError,
    user_password_confirm: userPasswordConfirmError,
  } = errors || {};

  if (
    !isEditingUser &&
    !userPasswordError &&
    !userPasswordConfirmError &&
    user_password !== user_password_confirm
  ) {
    errors = {
      ...errors,
      user_password_confirm: "* __t__passfldsnotmtchng",
    };
  }

  return errors;
};

export default validateUserData;
