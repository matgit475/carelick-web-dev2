import * as React from "react";
import { Container, Navbar } from "react-bootstrap";
import Logo from "../../shared/components/Logo";
import ProfileMenu from "../../shared/components/ProfileMenu";
import MobileMenu from "../../shared/components/MobileMenu";
import TopVerification from "../../modules/verifications/TopVerification";
import { useAuth } from "../../modules/auth/AuthProvider";

const Header = ({ expand, menuItems }) => {
  const { user } = useAuth();

  return (
    <Navbar
      className="w-100 border-bottom"
      expand={expand}
      bg="white"
      variant="white"
      sticky="top"
    >
      <Container fluid>
        <MobileMenu menuItems={menuItems} />
        <Logo />
        <div className="d-flex align-items-center ms-auto">
          {user?.role == "admin" && <TopVerification />}
          <ProfileMenu />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
