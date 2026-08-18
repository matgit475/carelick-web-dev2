import React from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { Formik, Form } from "formik";
import DangerAlert from "../../../shared/components/alerts/DangerAlert";
import useUserSettingsModalForm from "./useUserSettingsModalForm";
import AccountInformation from "../../../shared/components/forms/AccountInformation";
import PersonalInformation from "../../../shared/components/forms/PersonalInformation";
import PasswordChange from "../../../shared/components/forms/PasswordChange";

export default function UserSettingsModalForm({ id, onUpdate, onClose }) {
    const {
        user,
        error,
        showPasswordFields,
        setShowPasswordFields,
        validationSchema,
        handleSubmit,
    } = useUserSettingsModalForm(id, onUpdate);

    return (
        <Formik
            initialValues={user}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Modal
                    show={true}
                    onHide={onClose}
                    size="lg"
                    centered
                    className="user-settings-modal"
                >
                    <Form noValidate>
                        {/* HEADER */}
                        <Modal.Header closeButton className="border-0 pb-0">
                            <div>
                                <Modal.Title className="fw-bold">User Settings</Modal.Title>
                                <small className="text-muted d-block mt-1">
                                    Manage user account details and security settings
                                </small>
                            </div>
                        </Modal.Header>

                        {/* BODY */}
                        <Modal.Body className="p-4">
                            <DangerAlert message={error} />
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
                        </Modal.Body>

                        {/* FOOTER */}
                        <Modal.Footer className="border-0 pt-0">
                            <Button variant="light" onClick={onClose}>
                                Close
                            </Button>

                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save Changes"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            )}
        </Formik>
    );
}
