import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/AuthProvider";
import { logout } from "../../modules/auth/authApi";

const useLogout = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const logoutUser = () => {
    logout().then(() => {
      setUser(null);
      navigate("/auth/login");
    });
  };

  return {
    logoutUser,
  };
};

export default useLogout;
