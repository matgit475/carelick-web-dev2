import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Formik, Form } from "formik";
import DangerAlert from "../../../../shared/components/alerts/DangerAlert";
import SuccessAlert from "../../../../shared/components/alerts/SuccessAlert";
import useAccountSettingsForm from "./useAccountSettingsForm";
import Username from "../../../../shared/components/forms/Inputs/PlainText/Username";
import Email from "../../../../shared/components/forms/Inputs/PlainText/Email";
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
            {({ isSubmitting, values }) => (
                <Form noValidate>
                    <DangerAlert message={error} />
                    <SuccessAlert message={success} onClose={() => setSuccess(null)} />
                    <ListGroup>
                        <ListGroup.Item className="p-4 bg-light">
                            <h5 className="fw-bold">Account Information</h5>
                            <p className="text-muted">View your basic account details</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="p-4">
                            <Username value={values?.username} />
                            <Email value={values?.email} />
                        </ListGroup.Item>
                        <PersonalInformation />
                        <PasswordChange
                            showPasswordFields={showPasswordFields}
                            setShowPasswordFields={setShowPasswordFields}
                        />
                    </ListGroup>
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
