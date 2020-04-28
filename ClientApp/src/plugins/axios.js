import axios from "axios";
import authService from "@/services/AuthorizeService";
async function authToken() {
  var token = await authService.getAccessToken();
  return `Bearer ${token}`;
}
// Add a request interceptor
axios.interceptors.request.use(
  async config => {
    // Do something before request is sent
    config.headers.common["Authorization"] = await authToken();
    config.headers.common["Cache-Control"] = "no-cache";
    config.headers.get["If-Modified-Since"] = "0";
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.defaults.timeout = 20000;

export default axios;
