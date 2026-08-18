import React, { useCallback } from "react";
import useFetch from "../../../../shared/hooks/useFetch";
import {
  getAccountSettings,
  saveAccountSettings,
  updateAccountPassword,
} from "../../accountApi";
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
    Promise.all([
      saveAccountSettings(values),
      showPasswordFields ? updateAccountPassword(values) : null,
    ])
      .then(([settingsResponse, passwordResponse]) => {
        const data = {
          user: settingsResponse.data.user,
          message: passwordResponse
            ? [settingsResponse.data.message, passwordResponse.data.message]
            : settingsResponse.data.message,
        };
        setUser(settingsResponse.data.user);
        setSuccess(data.message);
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
