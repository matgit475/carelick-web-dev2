import * as React from "react";
import { Form } from "react-bootstrap";

const RequiredLabel = ({ children }) => {
  return (
    <Form.Label className="fw-bold">
      {children} <span className="text-danger">*</span>
    </Form.Label>
  );
};

export default RequiredLabel;
