import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Offcanvas, ListGroup } from "react-bootstrap";
import Logo from "../../shared/components/Logo";
import useLogout from "../../modules/auth/useLogout";
import { FiLogOut, FiChevronRight } from "react-icons/fi";

const MobileMenu = ({ menuItems }) => {
  const { logoutUser } = useLogout();
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setShow(false);
  };

  return (
    <>
      <Navbar.Toggle className="ms-3 d-block" onClick={() => setShow(true)} />

      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Logo />
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <ListGroup variant="flush">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <ListGroup.Item
                  key={item.path}
                  action
                  className="d-flex align-items-center justify-content-between"
                  onClick={() => handleNavigate(item.path)}
                >
                  <span className="d-flex align-items-center gap-2">
                    <Icon size={18} />
                    {item.label}
                  </span>

                  <FiChevronRight size={18} />
                </ListGroup.Item>
              );
            })}

            <ListGroup.Item
              action
              className="d-flex align-items-center justify-content-between"
              onClick={logoutUser}
            >
              <span className="d-flex align-items-center gap-2">
                <FiLogOut size={18} />
                Logout
              </span>

              <FiChevronRight size={18} />
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MobileMenu;
