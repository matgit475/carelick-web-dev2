import { api } from "../../shared/apiClient";

export const getUsers = () => api.get("/users");
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const saveUserSettingsById = (id, data) =>
  api.post(`/users/settings/${id}`, data);
export const getUserSettingsById = (id) => api.get(`/users/settings/${id}`);
