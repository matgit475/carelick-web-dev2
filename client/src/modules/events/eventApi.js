import { api } from "../../shared/apiClient";

export const getPastEvents = () => api.get("/events?filter=past&limit=3");
export const getUpcommingEvents = () =>
  api.get("/events?filter=upcomming&limit=3");
export const getEvents = () => api.get("/events");
export const getEventById = (id) => api.get(`/events/${id}`);
