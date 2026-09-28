import * as React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 pb-5">
      <Container>
        <Row>
          {/* Left Column - Menu */}
          <Col md={12} lg={4}>
            <h3 className="py-5 ">Menu</h3>
            <Nav className="flex-column mt-3">
              <Nav.Link as={Link} to="/" className="p-1">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/events" className="p-1">
                Events
              </Nav.Link>
              <Nav.Link as={Link} to="/news" className="p-1">
                News
              </Nav.Link>
            </Nav>
          </Col>

          <Col md={12} lg={8}>
            <h3 className="py-5 ">Contact Us</h3>
            <Row>
              {/* Middle Column - Contact Us */}
              <Col md={6} lg={6}>
                <p className="text-light">
                  <strong>Jane Doe</strong>
                  <br />
                  jane.doe@example.com
                </p>
                <p className="text-light">
                  <strong>John Smith</strong>
                  <br />
                  john.smith@example.com
                </p>
                <p className="text-light">
                  <strong>Address</strong>
                  <br />
                  123 Nonprofit Street
                  <br />
                  Cityville, ST 12345
                </p>
              </Col>

              {/* Right Column - Contact Details & Social */}
              <Col md={6} lg={6}>
                <p className="text-light">
                  <strong>Phone:</strong> (123) 456-7890
                </p>
                <p className="text-light">
                  <strong>Fax:</strong> (123) 456-7891
                </p>
                <div className="d-flex gap-3 mt-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-light"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-light"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-light"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Footer Bottom Text */}
        <Row className="pt-4 mt-4 border-top border-secondary">
          <Col className="text-center">
            <small>
              &copy; 2025 Carelick Association for Development Inc. - All Rights
              Reserved
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
