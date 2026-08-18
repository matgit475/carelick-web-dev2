import React from "react";
import { useFormikContext } from "formik";
import { Form as BootstrapForm, Button, Row, Col } from "react-bootstrap";
import RequiredLabel from "../../../shared/components/forms/RequiredLabel";

export default function PasswordChange({
    showPasswordFields,
    setShowPasswordFields,
}) {
    const {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleBlur,
    } = useFormikContext();

    return (
        <>
            <h6 className="fw-bold mb-1">Security</h6>
            <p class="text-muted mb-3">Ensure your/user's password is long, random password to stay secured</p>
            {!showPasswordFields ? (
                <Row>
                    <Col lg={4}>
                        <Button
                            variant="outline-primary"
                            className="w-100 "
                            type="button"
                            onClick={() => {
                                setFieldValue("new_password", "");
                                setFieldValue("retype_password", "");
                                setFieldTouched("new_password", false);
                                setFieldTouched("retype_password", false);
                                setShowPasswordFields(true);
                            }}
                        >
                            Change Password
                        </Button>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col lg={4}>
                        <BootstrapForm.Group controlId="new_password" className="p-2">
                            <RequiredLabel>New Password</RequiredLabel>
                            <BootstrapForm.Control
                                type="password"
                                placeholder="Enter new password"
                                name="new_password"
                                autoComplete="new-password"
                                value={values?.new_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.new_password && !!errors.new_password}
                            />

                            <BootstrapForm.Control.Feedback type="invalid">
                                {errors.new_password}
                            </BootstrapForm.Control.Feedback>
                        </BootstrapForm.Group>
                    </Col>
                    <Col lg={4}>
                        <BootstrapForm.Group controlId="retype_password" className="p-2">
                            <RequiredLabel>Retype Password</RequiredLabel>

                            <BootstrapForm.Control
                                type="password"
                                placeholder="Retype new password"
                                name="retype_password"
                                autoComplete="new-password"
                                value={values?.retype_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.retype_password && !!errors.retype_password}
                            />

                            <BootstrapForm.Control.Feedback type="invalid">
                                {errors.retype_password}
                            </BootstrapForm.Control.Feedback>
                        </BootstrapForm.Group>
                    </Col>
                    <Col lg={4}>
                        <Button
                            style={{ marginTop: "30px", width: "100%" }}
                            variant="light"
                            type="button"
                            onClick={() => {
                                setFieldValue("new_password", "");
                                setFieldValue("retype_password", "");
                                setFieldTouched("new_password", false);
                                setFieldTouched("retype_password", false);
                                setShowPasswordFields(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </Col>
                </Row>
            )}
        </>
    );
}
