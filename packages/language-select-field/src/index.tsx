/*
 *
 * Package: `@exsys-patient-insurance/language-select-field`.
 *
 */
import { memo } from "react";
import SelectField, {
  SelectFieldProps,
} from "@exsys-patient-insurance/select-field";
import {
  LANGUAGE_SELECT_FIELD_DEFAULT_PROPS,
  LANGUAGE_LIST_OPTIONS,
  LANGUAGE_SELECT_FIELD_NAME,
} from "./constants";

export type LanguageSelectFieldProps = Omit<SelectFieldProps, "options">;

const LanguageSelectField = (props: LanguageSelectFieldProps) => (
  <SelectField {...props} options={LANGUAGE_LIST_OPTIONS} />
);
LanguageSelectField.defaultProps = LANGUAGE_SELECT_FIELD_DEFAULT_PROPS;

export default memo(LanguageSelectField);
export { LANGUAGE_SELECT_FIELD_DEFAULT_PROPS, LANGUAGE_SELECT_FIELD_NAME };
