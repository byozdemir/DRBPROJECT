import axios from "axios";
import cookie from "cookie";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});
api.interceptors.request.use((config) => {
  const token = JSON.parse(sessionStorage.getItem('AuthStore'))
  const { csrftoken } = cookie.parse(document.cookie);
  if (csrftoken) {
    config.headers["X-CSRFTOKEN"] = csrftoken;
  }
  if (token.state.token) {
    config.headers["Authorization"] = `token ${token.state.token}`;
  }
  return config;
});

export default api;
