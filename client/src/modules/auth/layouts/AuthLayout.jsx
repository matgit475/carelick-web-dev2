import * as React from "react";
import Logo from "../../../shared/components/Logo";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="background family-background">
      <div className="content">
        <div className="justify-content-center">
          <div className="text-center w-100 pb-4">
            <Logo />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
