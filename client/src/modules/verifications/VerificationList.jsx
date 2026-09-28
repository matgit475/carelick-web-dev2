import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row, Container } from "react-bootstrap";
import { FiCheck, FiPhone, FiUsers, FiX } from "react-icons/fi";
import { useVerification } from "./VerificationProvider";
import DangerAlert from "../../shared/components/alerts/DangerAlert";
import SuccessAlert from "../../shared/components/alerts/SuccessAlert";

export default function VerificationList() {
  const { users, onAccept, onDecline, loadRequests, error, success } =
    useVerification();

  React.useEffect(() => {
    loadRequests();
  }, []);
  return (
    <Container fluid>
      <Row className="justify-content-center p-3">
        <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
          <h3 className="text-center">Verifications</h3>
          <p className="text-center">Review users waiting for approval</p>
        </Col>
      </Row>
      <Row className="justify-content-center py-3 m-0">
        <Col xs={12} md={10} lg={8}>
          <DangerAlert message={error} />
          <SuccessAlert message={success} />
          {users?.length === 0 ? (
            <div className="text-center py-5 px-3">
              <div className="bg-success-subtle text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <FiCheck size={32} />
              </div>
              <h5 className="fw-bold">You're all caught up!</h5>
              <p className="text-muted mb-0">
                There are no pending verification requests.
              </p>
            </div>
          ) : (
            <ListGroup className="gap-3">
              {users?.map((user) => {
                const initials =
                  `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();

                return (
                  <ListGroup.Item
                    key={user.id}
                    className="border rounded-3 p-3 p-md-4"
                  >
                    <Row className="align-items-center g-3">
                      {/* USER AVATAR */}
                      <Col xs="auto">
                        <div
                          className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                          style={{
                            width: "52px",
                            height: "52px",
                          }}
                        >
                          {initials}
                        </div>
                      </Col>

                      {/* USER INFORMATION */}
                      <Col>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <h6 className="mb-1 fw-bold">
                            <Link
                              to={`/portal/admin/user-settings/${user.id}`}
                              className="text-decoration-none text-dark"
                            >
                              {user.first_name} {user.last_name}
                            </Link>
                          </h6>
                        </div>

                        <div className="d-flex flex-wrap gap-3 text-muted small">
                          <span className="d-flex align-items-center gap-1">
                            <FiPhone size={14} />
                            {user.phone_number || "No phone"}
                          </span>

                          <span className="d-flex align-items-center gap-1">
                            <FiUsers size={14} />
                            {user.user_group || "No group"}
                          </span>
                        </div>
                      </Col>

                      {/* ACTIONS */}
                      <Col xs={12} md="auto">
                        <div className="d-flex gap-2 justify-content-md-end">
                          <Button
                            variant="success"
                            size="sm"
                            className="px-3"
                            onClick={() => onAccept(user)}
                          >
                            <FiCheck className="me-1" />
                            Accept
                          </Button>

                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="px-3"
                            onClick={() => onDecline(user)}
                          >
                            <FiX className="me-1" />
                            Decline
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}
