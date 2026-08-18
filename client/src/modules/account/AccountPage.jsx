import * as React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";

import AccountSettingsForm from "./forms/settings/AccountSettingsForm";
import Animate from "../../shared/components/Animate";

const AccountPage = () => {
  return (
    <Container>
      <Row className="justify-content-center p-3">
        <Col xs={12} md={10} lg={8}>
          <h3 className="text-center ">Your Account Settings</h3>
          <p className="text-center">
            Change your personal information and update your password.
          </p>
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
