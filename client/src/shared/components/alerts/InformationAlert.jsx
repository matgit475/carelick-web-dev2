import * as React from "react";
import { Alert } from "react-bootstrap";

const InformationAlert = ({ message }) => {
  return message ? (
    <Alert
      variant="info"
      className="m-2 sticky-top"
      style={{ top: "86px", zIndex: 20 }}
    >
      {message}
    </Alert>
  ) : null;
};

export default InformationAlert;
