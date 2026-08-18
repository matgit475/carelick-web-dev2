import { api } from "../../shared/apiClient";

export const getProfessions = () => api.get("/professions");
