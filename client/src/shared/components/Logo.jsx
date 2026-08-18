import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { image_url } from "../../helpers";

export default function Logo() {
  return (
    <Navbar.Brand className={"ms-3 me-3"} as={Link} to="/">
      <img width="200px" src={image_url("transparent-logo.png")} />
    </Navbar.Brand>
  );
}
