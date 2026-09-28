import React, { useCallback } from "react";
import useFetch from "../../../../shared/hooks/useFetch";
import { getAccountSettings, saveAccountSettings } from "../../accountApi";
import { useAuth } from "../../../auth/AuthProvider";
import { validationSchema as createValidationSchema } from "./validationSchema";
export default function useAccountSettingsForm() {
  const { data } = useFetch(() => getAccountSettings());
  const { setUser } = useAuth();

  const [success, setSuccess] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [showPasswordFields, setShowPasswordFields] = React.useState(false);
  const validationSchema = useCallback(
    () => createValidationSchema(showPasswordFields),
    [showPasswordFields],
  );
  function handleSubmit(values, { setSubmitting }) {
    setError(null);
    setSuccess(null);
    saveAccountSettings(values)
      .then((response) => {
        console.log(response);
        setUser(response.data.user);
        setSuccess(response.data.message);
        window.scrollTo({ top: 0, left: 0, behavior: "auto" }); // Scrolls to top
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return {
    user: data,
    error,
    success,
    setSuccess,
    showPasswordFields,
    setShowPasswordFields,
    validationSchema,
    handleSubmit,
  };
}
