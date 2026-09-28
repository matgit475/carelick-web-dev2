import React from "react";
import { FiHome, FiSettings } from "react-icons/fi";
import PortalLayout from "./PortalLayout";

const menuItems = [
  {
    label: "Dashboard",
    icon: FiHome,
    path: "/portal/members/dashboard",
  },
  {
    label: "Account Settings",
    icon: FiSettings,
    path: "/portal/members/account-settings",
  },
];

function MemberPortalLayout() {
  return <PortalLayout menuItems={menuItems} />;
}

export default MemberPortalLayout;
