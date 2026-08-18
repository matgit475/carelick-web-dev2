import React, { useCallback } from "react";
import useFetch from "../../../shared/hooks/useFetch";
import useAuth from "../../../modules/auth/AuthProvider";

import {
    getUserSettingsById,
    saveUserSettingsById,
    updateUserPasswordById,
} from "../userApi";
import { validationSchema as createValidationSchema } from "./validationSchema";
export default function useUserSettingsModalForm(id, onUpdate) {
    const { data: user } = useFetch(() => getUserSettingsById(id));

    const [error, setError] = React.useState(null);
    const [showPasswordFields, setShowPasswordFields] = React.useState(false);
    const validationSchema = useCallback(
        () => createValidationSchema(showPasswordFields),
        [showPasswordFields],
    );
    function handleSubmit(values, { setSubmitting }) {
        setError(null);
        Promise.all([
            saveUserSettingsById(id, values),
            showPasswordFields ? updateUserPasswordById(id, values) : null,
        ])
            .then(([settingsResponse, passwordResponse]) => {
                const data = {
                    user: settingsResponse.data.user,
                    message: passwordResponse
                        ? [settingsResponse.data.message, passwordResponse.data.message]
                        : settingsResponse.data.message,
                };

                onUpdate(data);
            })
            .catch((err) => {
                setError(err.response.data.message);
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    return {
        user,
        error,
        showPasswordFields,
        setShowPasswordFields,
        validationSchema,
        handleSubmit,
    };
}
