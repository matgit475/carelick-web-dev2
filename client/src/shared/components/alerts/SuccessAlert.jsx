import * as React from "react";
import { Alert } from "react-bootstrap";

const SuccessAlert = ({ message, onClose }) => {
  if (!message) {
    return null;
  }

  return (
    <Alert variant="success" onClose={onClose} dismissible>
      {Array.isArray(message) ? (
        <ul className="mb-0">
          {message.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        message
      )}
    </Alert>
  );
};

export default SuccessAlert;
