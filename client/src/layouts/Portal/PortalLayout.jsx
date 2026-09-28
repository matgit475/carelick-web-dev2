import * as React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import RegistrationAlert from "./RegistrationAlert";

const PortalLayout = ({ menuItems }) => {
  return (
    <div className="background family-background">
      <Header expand="lg" menuItems={menuItems} />
      <RegistrationAlert />
      <Outlet />
    </div>
  );
};

export default PortalLayout;
