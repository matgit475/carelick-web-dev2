import React from "react";
import { useAuth } from "../AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
export default function ProtectedRoute({ role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
