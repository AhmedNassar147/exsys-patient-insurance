/*
 *
 * LoginPage: `@exsys-patient-insurance/login-page`.
 *
 */
import { memo } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import { validateFields } from "@exsys-patient-insurance/helpers";
import Button from "@exsys-patient-insurance/button";
import InputField from "@exsys-patient-insurance/input-field";
import PersonIcon from "@exsys-patient-insurance/person-icon";
import PasswordField from "@exsys-patient-insurance/password-field";
import { colors } from "@exsys-patient-insurance/theme-values";
import AppLogoImage from "@exsys-patient-insurance/app-image-logo";
import { LoginContainer, Text, FormContainer } from "./styled";
import ClientLogo from "./partials/ClientLogo";
import useLoginRequest from "./hooks/useLoginRequest";

const { appPrimary } = colors;

const initialState = {
  username: "",
  password: "",
};

const LoginPage = () => {
  const { loading, requestUserLogin } = useLoginRequest();
  const { handleSubmit, handleChange, errors, values } = useFormManager({
    initialValues: initialState,
    // @ts-ignore ignore this for now
    validate: validateFields,
    onSubmit: requestUserLogin,
  });

  const { password, username } = values;

  return (
    <LoginContainer>
      <AppLogoImage />

      <Text children="sgninuracnt" />

      <FormContainer>
        <InputField
          error={errors?.username}
          name="username"
          placeholder="usrnam"
          onChange={handleChange}
          addonBefore={<PersonIcon />}
          value={username}
          inputWrapperPadding="0 10px"
          useShadow
          autoCapitalize
          size="large"
          color={appPrimary}
          width="100%"
        />
        <PasswordField
          name="password"
          onChange={handleChange}
          onPressEnter={handleSubmit}
          value={password}
          error={errors?.password}
          width="100%"
        />
        <Button
          type="primary"
          shape="round"
          htmlType="button"
          loading={loading}
          disabled={loading}
          label="sgnn"
          onClick={handleSubmit}
          width="95px"
        />
      </FormContainer>
      <ClientLogo />
    </LoginContainer>
  );
};

export default memo(LoginPage);
