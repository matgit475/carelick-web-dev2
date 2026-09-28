import React from "react";
import { FiHome, FiUsers, FiBell, FiSettings } from "react-icons/fi";
import PortalLayout from "./PortalLayout";
const menuItems = [
  {
    label: "Dashboard",
    icon: FiHome,
    path: "/portal/admin/dashboard",
  },
  {
    label: "Users",
    icon: FiUsers,
    path: "/portal/admin/users",
  },
  {
    label: "Account Settings",
    icon: FiSettings,
    path: "/portal/admin/account-settings",
  },
  {
    label: "Verifications",
    icon: FiBell,
    path: "/portal/admin/verifications",
  },
];

function AdminPortalLayout() {
  return <PortalLayout menuItems={menuItems} />;
}

export default AdminPortalLayout;
