import * as React from "react";
import { Container, Navbar } from "react-bootstrap";
import Logo from "../../shared/components/Logo";
import Navigation from "../../shared/components/Navigation";

const Header = ({ expand }) => {
  return (
    <Navbar
      className="w-100 border-bottom"
      expand={expand}
      bg="white"
      variant="white"
      sticky="top"
    >
      <Container fluid>
        <Logo />
        <Navigation />
      </Container>
    </Navbar>
  );
};

export default Header;
