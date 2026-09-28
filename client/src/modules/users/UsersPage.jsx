import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Container,
  Table,
  Pagination,
} from "react-bootstrap";
import { FiTrash2, FiEdit, FiEye } from "react-icons/fi";
import Animate from "../../shared/components/Animate";
import useUsersPage from "./useUsersPage";
import SuccessAlert from "../../shared/components/alerts/SuccessAlert";
import { useAuth } from "../auth/AuthProvider";
import usePermissions, { PERMISSIONS } from "./usePermissions";
import { BsEnvelope } from "react-icons/bs";

const UsersPage = () => {
  const {
    success,
    setSuccess,
    endIndex,
    startIndex,
    totalEntities,
    goToPage,
    getVisiblePages,
    rowsPerPage,
    setRowsPerPage,
    currentPage,
    filters,
    totalPages,
    sortConfig,
    professions,
    paginatedData,
    handleFilterChange,
    toggleOrder,
    handleDelete,
    handleSelectAll,
    selectedUsers,
    handleSelectUser,
    allFilteredSelected,
    handleEmailSelected,
  } = useUsersPage();
  const { user: curr_user } = useAuth();
  const navigate = useNavigate();
  const { canDeleteUsers, canUpdateUsers } = usePermissions();

  return (
    <Container fluid>
      <Row className="justify-content-center p-3">
        <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
          <h3 className="text-center">User Management</h3>
          <p className="text-center">
            Here you can add, remove, update, invite and manage your users
            related settings
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
          <SuccessAlert message={success} onClose={() => setSuccess(null)} />
          <Animate duration={0.5} y={25}>
            <div className="d-flex align-items-center">
              <span className="me-2">
                <b>Results per page:</b>
              </span>
              <Form.Select
                size="sm"
                style={{ width: "100px" }}
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Select>
              <Form.Check // prettier-ignore
                type="switch"
                className="ms-5"
                id="family-switch"
                label="Show Family"
                checked={filters.show_family || false}
                onChange={(e) =>
                  handleFilterChange("show_family", e.target.checked)
                }
              />
              <Button
                size="md"
                className="ms-auto"
                disabled={Object.keys(selectedUsers).length === 0}
                onClick={handleEmailSelected}
              >
                <BsEnvelope className="me-2" />
                Email Selected
              </Button>
            </div>
          </Animate>
        </Col>
      </Row>
      <Row className="justify-content-center p-3">
        <Col xs={12} md={12} lg={12} xl={10} xxl={10} className="px-0">
          <Animate duration={0.5} y={25}>
            <Card>
              <Card.Body className="pt-1 pb-1 ps-0 pe-0">
                <div style={{ overflowX: "auto" }}>
                  <Table hover className="mb-0 bordered hover fixed-table">
                    <thead>
                      <tr style={{ cursor: "pointer" }}>
                        <th className={"ps-4"} style={{ width: "50px" }}>
                          <input
                            type="checkbox"
                            checked={!!allFilteredSelected}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th
                          className="ps-4"
                          onClick={() => toggleOrder("first_name")}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span>First Name</span>
                            <span>
                              {sortConfig.key === "first_name"
                                ? sortConfig.direction === "asc"
                                  ? "↑"
                                  : "↓"
                                : ""}
                            </span>
                          </div>
                        </th>

                        <th
                          className="ps-4"
                          onClick={() => toggleOrder("profession_name")}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span>Profession</span>
                            <span>
                              {sortConfig.key === "profession_name"
                                ? sortConfig.direction === "asc"
                                  ? "↑"
                                  : "↓"
                                : ""}
                            </span>
                          </div>
                        </th>

                        <th
                          style={{ width: "150px" }}
                          className="d-none d-lg-table-cell"
                          onClick={() => toggleOrder("phone")}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span>Phone</span>
                            <span>
                              {sortConfig.key === "phone"
                                ? sortConfig.direction === "asc"
                                  ? "↑"
                                  : "↓"
                                : ""}
                            </span>
                          </div>
                        </th>

                        <th
                          className="d-none d-md-table-cell"
                          onClick={() => toggleOrder("email")}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span>Email</span>
                            <span>
                              {sortConfig.key === "email"
                                ? sortConfig.direction === "asc"
                                  ? "↑"
                                  : "↓"
                                : ""}
                            </span>
                          </div>
                        </th>

                        <th
                          style={{ width: "150px" }}
                          className="d-none d-md-table-cell"
                          onClick={() => toggleOrder("account_verified")}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span>Approved</span>
                            <span>
                              {sortConfig.key === "account_verified"
                                ? sortConfig.direction === "asc"
                                  ? "↑"
                                  : "↓"
                                : ""}
                            </span>
                          </div>
                        </th>

                        <th
                          style={{ width: "125px" }}
                          onClick={() => toggleOrder("role")}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span>Role</span>
                            <span>
                              {sortConfig.key === "role"
                                ? sortConfig.direction === "asc"
                                  ? "↑"
                                  : "↓"
                                : ""}
                            </span>
                          </div>
                        </th>
                        <th style={{ width: "125px" }}></th>
                      </tr>
                      {/* Filter row */}
                      <tr>
                        <th className={"ps-4"}></th>
                        <th className={"ps-4"}>
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Search Name"
                            value={filters.name}
                            onChange={(e) =>
                              handleFilterChange("name", e.target.value)
                            }
                          />
                        </th>
                        <th className="">
                          <Form.Select
                            size="sm"
                            value={filters.profession_name}
                            onChange={(e) =>
                              handleFilterChange(
                                "profession_name",
                                e.target.value,
                              )
                            }
                          >
                            <option value="">All Professions</option>
                            {professions?.map((p) => (
                              <option key={p.id} value={p.profession_name}>
                                {p.profession_name}
                              </option>
                            ))}
                          </Form.Select>
                        </th>

                        <th className="d-none d-lg-table-cell">
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Search Phone"
                            value={filters.phone}
                            onChange={(e) =>
                              handleFilterChange("phone", e.target.value)
                            }
                          />
                        </th>

                        <th className="d-none  d-md-table-cell">
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Search Email"
                            value={filters.email}
                            onChange={(e) =>
                              handleFilterChange("email", e.target.value)
                            }
                          />
                        </th>
                        <th className="d-none  d-md-table-cell">
                          <Form.Select
                            size="sm"
                            value={filters.account_verified}
                            onChange={(e) =>
                              handleFilterChange(
                                "account_verified",
                                e.target.value,
                              )
                            }
                          >
                            <option value="">All</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </Form.Select>
                        </th>
                        <th style={{ width: "125px" }}>
                          <Form.Select
                            size="sm"
                            value={filters.role}
                            onChange={(e) =>
                              handleFilterChange("role", e.target.value)
                            }
                          >
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="members">Member</option>
                            <option value="subadmin">SubAdmin</option>
                            <option value="guest">Guest</option>
                          </Form.Select>
                        </th>
                        <th style={{ width: "125px" }}></th>
                      </tr>
                    </thead>
                    <tbody
                      style={{ fontSize: "14px" }}
                      className="align-middle"
                    >
                      {paginatedData()?.map((user) => (
                        <tr
                          key={user.id}
                          className={
                            user.root_id == null && filters.show_family
                              ? "table-secondary"
                              : ""
                          }
                        >
                          <td className={"ps-4"}>
                            {user.email && (
                              <input
                                type="checkbox"
                                checked={!!selectedUsers[user.id]}
                                onChange={() => handleSelectUser(user.id)}
                              ></input>
                            )}
                          </td>
                          <td className={"ps-4"}>{user.first_name}</td>
                          <td className={"ps-4"}>{user.profession_name}</td>
                          <td className="d-none  d-lg-table-cell">
                            {user.phone}
                          </td>
                          <td className="d-none  d-md-table-cell">
                            {user.email}
                          </td>
                          <td className="d-none  d-md-table-cell">
                            {user.account_verified == "0" ? (
                              <Badge bg="danger">No</Badge>
                            ) : (
                              <Badge bg="success">Yes</Badge>
                            )}
                          </td>
                          <td style={{ width: "125px" }}>{user.role}</td>
                          <td style={{ width: "125px" }}>
                            <div
                              style={{ width: "125px" }}
                              className="d-flex justify-content-end align-items-center px-2"
                            >
                              <Button
                                size="sm"
                                variant="light"
                                className="me-2"
                                onClick={() => {
                                  if (curr_user.id === user.id) {
                                    navigate(
                                      `/portal/${curr_user.role}/account-settings`,
                                    );
                                  } else {
                                    navigate(
                                      `/portal/${curr_user.role}/user-settings/${user.id}`,
                                    );
                                  }
                                }}
                              >
                                {canUpdateUsers ? <FiEdit /> : <FiEye />}
                              </Button>
                              {canDeleteUsers && (
                                <Button
                                  size="sm"
                                  variant="danger"
                                  className="me-2"
                                  onClick={() => handleDelete(user)}
                                >
                                  <FiTrash2 />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <Row className="align-items-center ps-4 pe-4">
                  {paginatedData()?.length === 0 ? (
                    <Col className="text-center text-muted col-12 pt-4">
                      <small className="text-muted">
                        <b>No Results Found </b>
                      </small>
                    </Col>
                  ) : null}
                </Row>
                {/* Bottom Row: Info + Pagination */}
                <Row className="align-items-center ps-4 pe-4">
                  <Col md={6}>
                    <small className="text-muted">
                      Showing {startIndex} to {endIndex} of {totalEntities}{" "}
                      entities
                    </small>
                  </Col>
                  <Col md={6} className="d-flex justify-content-end">
                    {/* PAGINATION */}
                    <Pagination className="justify-content-center mt-3">
                      <Pagination.First
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                      />
                      <Pagination.Prev
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      />

                      {getVisiblePages().map((page) => (
                        <Pagination.Item
                          key={page}
                          active={page === currentPage}
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </Pagination.Item>
                      ))}

                      <Pagination.Next
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                      <Pagination.Last
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Animate>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersPage;
