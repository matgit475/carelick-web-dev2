import React from "react";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import PortalLayout from "./PortalLayout";

const menuItems = [
  {
    label: "Dashboard",
    icon: FiHome,
    path: "/portal/subadmin/dashboard",
  },
  {
    label: "Users",
    icon: FiUsers,
    path: "/portal/subadmin/users",
  },
  {
    label: "Account Settings",
    icon: FiSettings,
    path: "/portal/subadmin/account-settings",
  },
];

function SubAdminPortalLayout() {
  return <PortalLayout menuItems={menuItems} />;
}

export default SubAdminPortalLayout;
