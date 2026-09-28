import { api } from "../../shared/apiClient";

export const getRequests = () => api.get("/verification/requests");
export const acceptRequest = (id) => api.post(`/verification/accept/${id}`);
export const declineRequest = (id) => api.post(`/verification/decline/${id}`);
