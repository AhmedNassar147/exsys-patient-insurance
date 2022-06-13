/*
 * Package: `@exsys-patient-insurance/form-manager`.
 *
 */
import { useCallback, useState, useEffect, useRef } from "react";
import { setIn } from "@exsys-patient-insurance/helpers";
import { ChangeEventParams } from "@exsys-patient-insurance/types";
import { usePrevious } from "@exsys-patient-insurance/hooks";
import { runValidators, checkCanSubmit } from "./helpers";
import {
  FormStateProps,
  ResultType,
  ErrorType,
  FormValuesLikeType,
  FormFilesStateType,
} from "./index.interface";

const useFormManager = <T = FormValuesLikeType>(
  options: FormStateProps<T>
): ResultType<T> => {
  const { initialValues, onSubmit, validateOnChange, validate } = options;

  const [filesState, setFilesState] = useState<FormFilesStateType>();
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ErrorType<T>>({} as ErrorType<T>);

  const hasAnyFieldChangedRef = useRef(false);

  const preValues = usePrevious(initialValues);

  const areInitialValuesChanged = useCallback(
    () => !Object.is(JSON.stringify(preValues), JSON.stringify(initialValues)),
    [initialValues, preValues]
  );

  useEffect(() => {
    if (areInitialValuesChanged()) {
      setTimeout(() => {
        setValues((previousValues) => ({
          ...previousValues,
          ...initialValues,
        }));
      });
    }
  }, [areInitialValuesChanged, initialValues]);

  const resetFilesState = useCallback(() => setFilesState(() => undefined), []);

  const resetForm = useCallback(() => {
    setValues(() => initialValues);
    resetFilesState();
    // @ts-ignore
    setErrors(() => {});
  }, [resetFilesState, initialValues]);

  useEffect(
    () => {
      return resetForm;
    },
    // eslint-disable-next-line
    []
  );

  const handleChange = useCallback(
    (eventData: ChangeEventParams) => {
      const { name, value } = eventData;

      hasAnyFieldChangedRef.current = true;

      // we do this because we stringify the values inside `setIn` to not mutate the
      // original values but that doesn't work with files objects.
      if (value instanceof File || value instanceof FileList) {
        setFilesState((previous) => ({ ...previous, [name]: value }));
        return;
      }

      const formValues = setIn<T>(name, value, values);

      if (validateOnChange) {
        const errors = runValidators({
          values: formValues,
          validate,
        });

        setErrors(() => errors || {});
      }
      setValues((previousValues) => setIn<T>(name, value, previousValues));
    },
    [values, validateOnChange, validate]
  );

  const handleChangeMultipleInputs = useCallback(
    (_values: Record<string, any>) => {
      const keys = Object.keys(_values);
      if (keys?.length) {
        keys.forEach((fieldKey: string) => {
          handleChange({
            name: fieldKey,
            value: _values[fieldKey],
          });
        });
      }
    },
    [handleChange]
  );

  const allStateValues = { ...values, ...filesState };

  const handleSubmit = useCallback(async () => {
    const { canSubmit, finalErrors } = checkCanSubmit({
      values: allStateValues,
      validate,
    });

    if (finalErrors) {
      setErrors(() => finalErrors || {});
    }

    if (onSubmit && canSubmit) {
      await onSubmit(allStateValues, {
        resetForm,
        setInitialFormValues: setValues,
      });
    }
  }, [allStateValues, validate, onSubmit, resetForm]);

  return {
    values: allStateValues,
    handleChange,
    handleChangeMultipleInputs,
    handleSubmit,
    resetForm,
    errors,
    setInitialFormValues: setValues,
    resetFilesState,
    hasAnyFieldChangedRef,
    setErrors,
  };
};

export default useFormManager;
export type { SubmitOptionsType, SubmitHandlerType } from "./index.interface";
