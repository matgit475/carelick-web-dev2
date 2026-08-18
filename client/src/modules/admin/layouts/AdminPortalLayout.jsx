import * as React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="background family-background">
      <Header expand="lg" />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
