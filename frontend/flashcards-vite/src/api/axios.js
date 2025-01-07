import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"; // Temp url 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

api.defaults.timeout = 5000;
export default api;
