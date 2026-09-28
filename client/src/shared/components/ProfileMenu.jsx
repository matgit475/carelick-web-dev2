import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Dropdown } from "react-bootstrap";
import { useAuth } from "../../modules/auth/AuthProvider";
import useLogout from "../../modules/auth/useLogout";

import { FiLogOut, FiUser, FiSettings } from "react-icons/fi";

export default function ProfileMenu() {
  const { user } = useAuth();
  const { logoutUser } = useLogout();
  const navigate = useNavigate();
  return (
    <Nav className="ms-auto d-md-block">
      <Dropdown className="absolute-dropdown me-3" align="end">
        <Dropdown.Toggle
          variant="light"
          id="dropdown-custom-toggle"
          className="d-flex align-items-center dropdown-profile-toggle"
        >
          <FiUser size={22} className="me-2" />
          <div className="profile-info text-start">
            <div className="profile-name">{user.first_name}</div>
            <div className="profile-role">{user.role}</div>
            <div className="profile-email">{user.email}</div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={(e) => {
              e.preventDefault();
              navigate(`/portal/${user?.role}/account-settings`);
            }}
          >
            <FiSettings size={18} className="me-2" />
            Account Settings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logoutUser}>
            <FiLogOut size={18} className="me-2" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}
