import { api } from "../../shared/apiClient";

export const getAccount = () => api.get("/account/");
export const updateAccountPassword = (data) =>
  api.post("/account/update_password", data);
export const getAccountSettings = () => api.get(`/account/settings`);
export const saveAccountSettings = (data) =>
  api.post("/account/settings", data);
