import React from "react";
import { Form as BootstrapForm, Row, Col } from "react-bootstrap";
export default function Email({ value }) {
  return (
    <BootstrapForm.Group className="px-2">
      <Row className="align-items-center">
        <Col xs={4} md={4}>
          <BootstrapForm.Label className="mb-0 fw-bold">
            Email
          </BootstrapForm.Label>
        </Col>
        <Col xs={8} md={8}>
          <BootstrapForm.Control
            name="email"
            value={value || ""}
            readOnly
            plaintext
            className="fw-semibold text-truncate"
          />
        </Col>
      </Row>
    </BootstrapForm.Group>
  );
}
