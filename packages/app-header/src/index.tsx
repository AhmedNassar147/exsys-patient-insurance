/*
 *
 * Package: `@exsys-clinio/app-header`.
 *
 */
import { memo, useCallback } from "react";
import LanguageSelectField, {
  LANGUAGE_SELECT_FIELD_NAME,
} from "@exsys-clinio/language-select-field";
import {
  useLanguageSwitcher,
  useMakeSelectCurrentLanguageId,
} from "@exsys-clinio/app-config-store";
import useFormManager from "@exsys-clinio/form-manager";
import { spacings, colors } from "@exsys-clinio/theme-values";
import { onChangeEvent } from "@exsys-clinio/types";
import { StyledHeader, StyledAppLogo } from "./styled";

const Logo = memo(() => (
  <StyledAppLogo
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    version="1.1"
    viewBox="0 0 158.5 45"
    xmlSpace="preserve"
  >
    <path
      fill="#026FC1"
      d="M142.7 12.7h4.9V6.1c0-3.4-2.7-6.1-6.1-6.1-3.4 0-6.1 2.7-6.1 6.1v6.6H129c-3.4 0-6.1 2.7-6.1 6.1 0 3.4 2.7 6.1 6.1 6.1h6.4v6.3c0 3.4 2.7 6.1 6.1 6.1 3.4 0 6.1-2.7 6.1-6.1v-6.3h-4.9c-2.8 0-5.1-1.9-5.9-4.5-.1-.5-.2-1.1-.2-1.6 0-.6.1-1.1.2-1.6.7-2.6 3.1-4.5 5.9-4.5z"
    />
    <path
      fill="#FAB239"
      d="M152.4 12.7h-4.9v12.2h4.9c3.4 0 6.1-2.7 6.1-6.1 0-3.4-2.8-6.1-6.1-6.1"
    />
    <path
      fill="#026FC1"
      d="M32.1 33.1c.2 0 .5 0 .7.1.2.1.5.2.7.5l4 4.3c-1.8 2.3-4 4.1-6.7 5.2-2.7 1.2-5.8 1.8-9.5 1.8-3.3 0-6.3-.6-9-1.7-2.6-1.1-4.9-2.7-6.7-4.7-1.8-2-3.3-4.4-4.2-7.1-1-2.7-1.5-5.7-1.5-9s.6-6.3 1.7-9 2.7-5.1 4.7-7.1 4.4-3.5 7.3-4.7C16.5.6 19.6 0 23 0c1.7 0 3.2.1 4.7.4 1.5.3 2.8.7 4.1 1.2 1.3.5 2.4 1.1 3.5 1.8s2 1.5 2.8 2.4l-3.4 4.6c-.2.3-.5.5-.8.8-.3.2-.7.3-1.3.3-.4 0-.7-.1-1-.2-.3-.2-.7-.4-1-.6-.4-.2-.8-.5-1.2-.8-.4-.3-.9-.5-1.5-.8-.6-.2-1.3-.4-2.1-.6H23c-1.9 0-3.5.3-5.1 1-1.5.7-2.8 1.6-3.9 2.8-1.1 1.2-2 2.7-2.6 4.4-.6 1.7-.9 3.7-.9 5.8 0 2.3.3 4.3.9 6 .6 1.8 1.4 3.2 2.5 4.4 1.1 1.2 2.3 2.1 3.7 2.7 1.4.6 2.9.9 4.5.9.9 0 1.8 0 2.5-.1.8-.1 1.5-.2 2.1-.5.7-.2 1.3-.5 1.9-.9.6-.4 1.2-.8 1.8-1.3.2-.2.5-.4.8-.5.3 0 .6-.1.9-.1M47.4 13.2v19.9c0 1.6.4 2.7 1.1 3.6.7.8 1.7 1.3 3.1 1.3 1 0 2-.2 2.9-.6.9-.4 1.8-1 2.6-1.8V13.2h9.4V45h-5.8c-1.2 0-1.9-.5-2.3-1.6l-.6-2.3c-.6.6-1.2 1.1-1.9 1.6-.6.5-1.3.9-2.1 1.2-.7.3-1.5.6-2.4.8-.8.2-1.8.3-2.8.3-1.7 0-3.2-.3-4.5-.9s-2.4-1.4-3.3-2.5c-.9-1.1-1.6-2.3-2.1-3.8-.5-1.4-.7-3-.7-4.8V13.2h9.4zM70 45V13.2h5.6c.5 0 .9 0 1.2.1.3.1.6.2.8.4.2.2.4.4.5.7.1.3.2.6.3 1l.5 2.9c1.1-1.8 2.4-3.2 3.9-4.2 1.4-1 3-1.5 4.7-1.5 1.4 0 2.6.3 3.4 1l-1.2 6.9c-.1.4-.2.7-.5.9-.2.2-.6.3-1 .3-.3 0-.7 0-1.2-.1s-1-.1-1.8-.1c-2.5 0-4.4 1.3-5.8 3.9V45H70zM104.8 12.7c2.1 0 4 .3 5.7 1s3.2 1.6 4.4 2.8c1.2 1.2 2.2 2.7 2.9 4.5.7 1.8 1 3.8 1 6.1 0 .7 0 1.3-.1 1.7-.1.4-.2.8-.3 1.1-.2.3-.4.4-.6.5-.3.1-.6.2-1 .2H98.7c.3 2.6 1.1 4.5 2.4 5.7 1.3 1.2 2.9 1.8 5 1.8 1.1 0 2-.1 2.8-.4.8-.3 1.5-.6 2.1-.9.6-.3 1.2-.6 1.7-.9.5-.3 1.1-.4 1.6-.4.7 0 1.3.3 1.7.8l2.7 3.4c-1 1.1-2 2-3.1 2.7-1.1.7-2.3 1.2-3.4 1.6-1.2.4-2.4.7-3.5.8-1.2.2-2.3.2-3.4.2-2.2 0-4.3-.4-6.2-1.1-1.9-.7-3.6-1.8-5-3.2-1.4-1.4-2.6-3.2-3.4-5.3-.8-2.1-1.3-4.5-1.3-7.3 0-2.1.4-4.1 1.1-6 .7-1.9 1.7-3.5 3.1-4.9 1.3-1.4 3-2.5 4.9-3.4 1.7-.7 3.9-1.1 6.3-1.1m.1 6.5c-1.8 0-3.2.5-4.2 1.5s-1.7 2.5-2 4.4h11.7c0-.7-.1-1.5-.3-2.2-.2-.7-.5-1.3-.9-1.9-.4-.6-1-1-1.7-1.3-.7-.4-1.6-.5-2.6-.5"
    />
  </StyledAppLogo>
));

const AppHeader = () => {
  const { values, handleChange } = useFormManager({
    initialValues: {
      [LANGUAGE_SELECT_FIELD_NAME]: useMakeSelectCurrentLanguageId(),
    },
  });

  const handleLanguageSwitched = useLanguageSwitcher();

  const onChange: onChangeEvent<number> = useCallback(
    (event) => {
      handleChange(event);
      const { value } = event;
      handleLanguageSwitched(value);
    },
    [handleChange, handleLanguageSwitched]
  );

  return (
    <StyledHeader>
      <Logo />

      <LanguageSelectField
        width={spacings.sp15}
        label=""
        usePortal
        onChange={onChange}
        value={values[LANGUAGE_SELECT_FIELD_NAME]}
        allowClear={false}
        backgroundColor={colors.appPrimary}
        color={colors.white}
      />
    </StyledHeader>
  );
};

export default memo(AppHeader);
