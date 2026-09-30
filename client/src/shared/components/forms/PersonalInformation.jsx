import React from "react";
import { Form as BootstrapForm, Row, Col, ListGroup } from "react-bootstrap";
import { useFormikContext } from "formik";
import RequiredLabel from "../../../shared/components/forms/RequiredLabel";
export default function PersonalInformation({ disabled }) {
    const { handleBlur, handleChange, values, touched, errors } =
        useFormikContext();

    return (
        <>
            <ListGroup.Item className="p-4 bg-light">
                <h5 className=" fw-bold">Personal Details</h5>
                <p class="text-muted">update your/user's personal details</p>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                    <Col lg={4}>
                        <BootstrapForm.Group className="p-2">
                            <RequiredLabel>First Name</RequiredLabel>
                            <BootstrapForm.Control
                                name="first_name"
                                value={values?.first_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.first_name && !!errors.first_name}
                                disabled={disabled}
                            />

                            <BootstrapForm.Control.Feedback type="invalid">
                                {errors.first_name}
                            </BootstrapForm.Control.Feedback>
                        </BootstrapForm.Group>
                    </Col>
                    <Col lg={4}>
                        <BootstrapForm.Group className=" p-2">
                            <BootstrapForm.Label className="fw-bold">
                                Middle Name
                            </BootstrapForm.Label>

                            <BootstrapForm.Control
                                name="middle_name"
                                value={values?.middle_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.middle_name && !!errors.middle_name}
                                disabled={disabled}
                            />

                            <BootstrapForm.Control.Feedback type="invalid">
                                {errors.middle_name}
                            </BootstrapForm.Control.Feedback>
                        </BootstrapForm.Group>
                    </Col>
                    <Col lg={4}>
                        <BootstrapForm.Group className="p-2">
                            <RequiredLabel>Last Name</RequiredLabel>

                            <BootstrapForm.Control
                                name="last_name"
                                value={values?.last_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.last_name && !!errors.last_name}
                                disabled={disabled}
                            />

                            <BootstrapForm.Control.Feedback type="invalid">
                                {errors.last_name}
                            </BootstrapForm.Control.Feedback>
                        </BootstrapForm.Group>
                    </Col>
                    <Col lg={4}>
                        <BootstrapForm.Group className="p-2">
                            <BootstrapForm.Label className="fw-bold">Phone</BootstrapForm.Label>

                            <BootstrapForm.Control
                                name="phone"
                                value={values?.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.phone && !!errors.phone}
                                disabled={disabled}
                            />

                            <BootstrapForm.Control.Feedback type="invalid">
                                {errors.phone}
                            </BootstrapForm.Control.Feedback>
                        </BootstrapForm.Group>
                    </Col>
                </Row>
            </ListGroup.Item>
        </>
    );
}
