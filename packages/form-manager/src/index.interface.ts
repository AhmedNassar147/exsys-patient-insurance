/*
 *
 * Types: `@exsys-patient-insurance/form-manager`.
 *
 */
import {
  onChangeEvent,
  RecordType,
  RecordTypeWithAnyValue,
} from "@exsys-patient-insurance/types";

export type FormValuesLikeType = RecordTypeWithAnyValue;

export type FormFilesStateType = RecordType<File | FileList>;

export type ErrorType<T> = Record<keyof T, string>;

export type Validate<T extends FormValuesLikeType> = (
  formValues: T
) => ErrorType<T>;

export type SubmitOptionsType = {
  resetForm: () => void;
  setInitialFormValues: React.Dispatch<React.SetStateAction<any>>;
};

export type SubmitHandlerType<T> = (
  formValues: T,
  options: SubmitOptionsType
) => Promise<void> | void;

export interface FormStateProps<T> {
  initialValues: T;
  validateOnChange?: boolean;
  onSubmit?: SubmitHandlerType<T>;
  validate?: Validate<T>;
}

export type ResultType<T> = {
  values: T;
  handleChange: onChangeEvent;
  handleSubmit: () => void;
  resetForm: () => void;
  resetFilesState: () => void;
  errors: ErrorType<T>;
  hasAnyFieldChangedRef: React.MutableRefObject<boolean>;
  setInitialFormValues: React.Dispatch<React.SetStateAction<T>>;
  handleChangeMultipleInputs: (values: FormValuesLikeType) => void;
  setErrors: React.Dispatch<React.SetStateAction<Record<keyof T, string>>>;
};
