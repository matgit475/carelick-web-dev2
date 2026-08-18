import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Offcanvas, ListGroup } from "react-bootstrap";
import Logo from "../../../shared/components/Logo";
import ProfileMenu from "../../../shared/components/ProfileMenu";
import useLogout from "../../auth/useLogout";
import {
    FiLogOut,
    FiChevronRight,
    FiHome,
    FiUsers,
    FiSettings,
} from "react-icons/fi";

export const MobileMenu = () => {
    const { logoutUser } = useLogout();
    const [show, setShow] = React.useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar.Toggle className={"ms-3 d-block"} onClick={handleShow} />
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <Logo />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        {/* Dashboard Link */}
                        <ListGroup.Item
                            action
                            className={`d-flex align-items-center justify-content-between`}
                            onClick={() => {
                                navigate("/portal/admin/dashboard");
                                setShow(false);
                            }}
                        >
                            <span className="d-flex align-items-center gap-2">
                                <FiHome size={18} />
                                Dashboard
                            </span>

                            <FiChevronRight size={18} />
                        </ListGroup.Item>

                        {/* Users Link */}
                        <ListGroup.Item
                            action
                            className={`d-flex align-items-center justify-content-between`}
                            onClick={() => {
                                navigate("/portal/admin/users");
                                setShow(false);
                            }}
                        >
                            <span className="d-flex align-items-center gap-2">
                                <FiUsers size={18} />
                                Users
                            </span>

                            <FiChevronRight size={18} />
                        </ListGroup.Item>

                        {/* Account Settings Link */}
                        <ListGroup.Item
                            action
                            className={`d-flex align-items-center justify-content-between`}
                            onClick={() => {
                                navigate("/portal/admin/account-settings");
                                setShow(false);
                            }}
                        >
                            <span className="d-flex align-items-center gap-2">
                                <FiSettings size={18} />
                                Account Settings
                            </span>
                            <FiChevronRight size={18} />
                        </ListGroup.Item>
                        {/* Logout Link */}
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

const Header = ({ expand }) => {
    return (
        <>
            <Navbar
                className="w-100 border-bottom"
                expand={expand}
                bg="white"
                variant="white"
                sticky="top"
            >
                <Container fluid>
                    <MobileMenu />
                    <Logo />
                    <ProfileMenu />
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
