import React from "react";
import { useFormikContext } from "formik";
import { Form as BootstrapForm, Button, Row, Col, ListGroup } from "react-bootstrap";
import RequiredLabel from "../../../shared/components/forms/RequiredLabel";

export default function PasswordChange({
    showPasswordFields,
    setShowPasswordFields,
    disabled,
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
            <ListGroup.Item className="p-4 bg-light">
                <h5 className="fw-bold">Security</h5>
                <p class="text-muted">
                    Ensure your/user's password is long, random password to stay secured
                </p>
            </ListGroup.Item>
            <ListGroup.Item>
                {!showPasswordFields ? (
                    <Row>
                        <Col lg={4}>
                            <Button
                                variant="light"
                                className="w-100 m-2 "
                                type="button"
                                disabled={disabled}
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
                                style={{ marginTop: "40px", width: "100%" }}
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
            </ListGroup.Item>
        </>
    );
}
