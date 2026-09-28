import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import UserSettingsForm from "./form/UserSettingsForm";

const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
            <h3>User Settings</h3>
            <p className="mb-0">
              Manage user account details and security settings
            </p>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center p-3">
        <Col xs={12} md={10} lg={8}>
          <UserSettingsForm id={id} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
