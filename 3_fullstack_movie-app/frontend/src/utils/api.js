import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4090",
});

export default api;
