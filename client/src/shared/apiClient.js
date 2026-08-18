import axios from "axios";

const API_URL = process.env.REACT_APP_API_ENDPOINT;

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const api = {
  get(url) {
    return apiClient.get(url);
  },

  post(url, data) {
    return apiClient.post(url, data);
  },

  delete(url) {
    return apiClient.delete(url);
  },
};
