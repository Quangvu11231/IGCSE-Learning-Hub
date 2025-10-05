import axios, { type AxiosResponse } from "axios";
import { Config } from "../constant/config";

//
const axiosCore = axios.create({
  baseURL: Config.API_BACKEND_URL,
  timeout: 10000,
  //cho phép gửi cookies cùng request, xem xét chỗ này
  withCredentials: false,
});

// Request interceptor, gắn token 
axiosCore.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
const handleResponse = (res: AxiosResponse) => {
  if (res && res.data) {
    return res;
  }

  return res;
};
const handleError = (error: { response: { data: any } }) => {
  try {
    return error.response;
  } catch (error) {
    console.log("error", error);
    return { result: null, message: "Server error" };
  }
};
axiosCore.interceptors.response.use(
  (response) => {
    return handleResponse(response);
  },
  (error) => {
    return handleError(error);
  }
);

export default axiosCore;
