import React from "react";
import {
    Form as BootstrapForm,
    OverlayTrigger,
    Tooltip,
    Row,
    Col,
} from "react-bootstrap";
import { useFormikContext } from "formik";

export default function AccountInformation() {
    const { values, handleBlur } = useFormikContext();
    return (
        <>
            <h6 className=" fw-bold mb-1">Account Information</h6>
            <p class="text-muted mb-3">View your/user's basic account details</p>
            <hr />
            <Row>
                <Col lg={4}>
                    <BootstrapForm.Group className="p-2">
                        <BootstrapForm.Label className="text-muted">
                            Username
                        </BootstrapForm.Label>

                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-top">{values?.username}</Tooltip>}
                        >
                            <BootstrapForm.Control
                                name="username"
                                value={values?.username}

                                readOnly
                                plaintext
                                className="fw-semibold text-truncate"
                                onBlur={handleBlur}
                            />
                        </OverlayTrigger>
                    </BootstrapForm.Group>
                </Col>
                <Col lg={4}>
                    <BootstrapForm.Group className="p-2">
                        <BootstrapForm.Label className="text-muted">
                            Email
                        </BootstrapForm.Label>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-top">{values?.email}</Tooltip>}
                        >
                            <BootstrapForm.Control
                                name="email"
                                value={values?.email}
                                readOnly
                                plaintext
                                className="fw-semibold text-truncate"
                                onBlur={handleBlur}
                            />
                        </OverlayTrigger>
                    </BootstrapForm.Group>
                </Col>
            </Row>
        </>
    );
}
