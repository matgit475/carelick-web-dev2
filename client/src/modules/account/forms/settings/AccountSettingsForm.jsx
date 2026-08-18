import React from "react";
import { Button, Card } from "react-bootstrap";
import { Formik, Form } from "formik";
import DangerAlert from "../../../../shared/components/alerts/DangerAlert";
import SuccessAlert from "../../../../shared/components/alerts/SuccessAlert";
import useAccountSettingsForm from "./useAccountSettingsForm";
import AccountInformation from "../../../../shared/components/forms/AccountInformation";
import PersonalInformation from "../../../../shared/components/forms/PersonalInformation";
import PasswordChange from "../../../../shared/components/forms/PasswordChange";

export default function AccountSettingsForm() {
    const {
        user,
        error,
        success,
        setSuccess,
        showPasswordFields,
        setShowPasswordFields,
        validationSchema,
        handleSubmit,
    } = useAccountSettingsForm();
    return (
        <Formik
            initialValues={user}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form noValidate>
                    <DangerAlert message={error} />
                    <SuccessAlert message={success} onClose={() => setSuccess(null)} />
                    <Card className="p-3 my-3">
                        <AccountInformation />
                    </Card>
                    <Card className="p-3 my-3">
                        <PersonalInformation />
                    </Card>
                    <Card className="p-3 my-3">
                        <PasswordChange
                            showPasswordFields={showPasswordFields}
                            setShowPasswordFields={setShowPasswordFields}
                        />
                    </Card>
                    <div className="d-flex justify-content-end gap-2 mt-2">
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
