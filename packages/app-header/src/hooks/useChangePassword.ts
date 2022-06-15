/*
 *
 * Hook: `useChangePassword`.
 *
 */
import { useState, useCallback, useMemo } from "react";
import { useBasicMutation } from "@exsys-patient-insurance/network-hooks";
import { useCurrentStaffId } from "@exsys-patient-insurance/app-config-store";

const initialForm = {
  newPassword: "",
  password_confirmation: "",
};

const useChangePassword = (closeModal: () => void) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string>("");

  const staff_id = useCurrentStaffId();

  const handleChange = useCallback(
    ({ value, name }: { value: string; name: string }) => {
      setForm((oldState) => ({
        ...oldState,
        [name]: value,
      }));
      setError("");
    },
    [setForm, setError]
  );

  const { mutate, loading, setLoading } = useBasicMutation({
    apiId: "CHANGE_USER_PASSWORD",
    method: "post",
  });

  const onSubmit = useCallback(async () => {
    const { newPassword, password_confirmation } = form;
    setLoading(true);

    if (!newPassword || !password_confirmation) {
      setError("Please Enter Password Fields");
      setLoading(false);
      return;
    }

    if (newPassword !== password_confirmation) {
      setError("Password Fields not matching");
      setLoading(false);
      return;
    }

    await mutate({
      body: {
        staff_id,
        new_password: newPassword,
      },
      cb: ({ apiValues, error, status }) => {
        if (status !== 200 || error) {
          setError("Something Went Wrong");
          return;
        }

        if (apiValues.status === "success") {
          closeModal();
          setForm(initialForm);
        }
      },
    });
  }, [form, setLoading, mutate, closeModal]);

  const disabled = useMemo(() => {
    if (loading) {
      return true;
    }

    const { newPassword, password_confirmation } = form;
    return !newPassword || !password_confirmation;
  }, [form, loading]);

  return {
    isSubmiting: loading,
    disabled,
    handleChange,
    onSubmit,
    error,
    formValues: form,
  };
};

export default useChangePassword;
