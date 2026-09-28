import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import AccountSettingsForm from "./forms/settings/AccountSettingsForm";

const AccountPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="justify-content-center p-3">
        <Col xs={12} md={10} lg={8}>
          <div className="position-relative text-center">
            <Button
              variant="light"
              className="position-absolute start-0 top-0"
              onClick={() => navigate(-1)}
            >
              ← Back
            </Button>
            <h3>Your Account Settings</h3>
            <p className="mb-0">
              Change your personal information and update your password.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center p-3">
        <Col xs={12} md={10} lg={8}>
          <AccountSettingsForm />
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;
