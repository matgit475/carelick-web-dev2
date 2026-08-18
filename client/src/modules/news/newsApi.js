import { api } from "../../shared/apiClient";

export const getNews = () => api.get("/news");
