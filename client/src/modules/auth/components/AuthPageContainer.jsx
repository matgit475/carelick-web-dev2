import * as React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Animate from "../../../shared/components/Animate";

const AuthPageContainer = ({ children }) => {
  return (
    <Row>
      <Col>
        <Animate duration={0.5} y={25}>
          <Card style={{ width: "500px" }}>
            <Card.Body className="p-3">{children}</Card.Body>
          </Card>
        </Animate>
      </Col>
    </Row>
  );
};

export default AuthPageContainer;
