import { api } from "../../shared/apiClient";

export const logout = () => {
  return api.post("/auth/logout", null);
};

export const register = (data) => {
  return api.post("/auth/register", data);
};

export const login = (data) => {
  return api.post("/auth/login", data);
};

export const forgotPassword = (data) => {
  return api.post("/auth/forgot-password", data);
};

export const verifyOtp = (data) => {
  return api.post("/auth/login-with-otp", data);
};

export const resetPassword = (data) => {
  return api.post("/auth/reset-password", data);
};
