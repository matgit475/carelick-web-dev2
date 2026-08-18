import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/AuthProvider";
import useLogout from "../../modules/auth/useLogout";

const LogInButtons = () => (
  <>
    <Link to="/auth/login">
      <Button variant="primary">Login</Button>
    </Link>
    <Link to="/auth/register">
      <Button variant="light">Register</Button>
    </Link>
  </>
);

const LogOutButton = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logoutUser } = useLogout();
  return (
    <>
      <Button
        variant="light"
        onClick={() => navigate(`/portal/${user?.role}/dashboard`)}
      >
        Portal
      </Button>
      <Button variant="primary" onClick={logoutUser}>
        Logout
      </Button>
    </>
  );
};

const LogButtons = () => {
  const { user } = useAuth();
  console.log("User in LogButtons:", user);
  return (
    <div className="d-flex gap-3 pt-2">
      {user ? <LogOutButton /> : <LogInButtons />}
    </div>
  );
};

export default (Navigation = () => {
  return (
    <>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll" role="navigation">
        <Nav className="ms-auto mx-2" navbarScroll>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/news">
            News
          </Nav.Link>
          <Nav.Link as={Link} to="/events">
            Events
          </Nav.Link>
        </Nav>
        <LogButtons />
      </Navbar.Collapse>
    </>
  );
});
