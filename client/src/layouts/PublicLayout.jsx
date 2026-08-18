import * as React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const PublicLayout = () => {
  return (
    <div className="background family-background">
      <Header expand="lg" />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
