import * as React from "react";
import { Alert } from "react-bootstrap";

const DangerAlert = ({ message }) => {
  return message ? (
    <Alert variant="danger" dismissible>
      {" "}
      {message}{" "}
    </Alert>
  ) : null;
};

export default DangerAlert;
