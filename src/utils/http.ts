import axios, { type AxiosResponse } from "axios";
import { Config } from "../constant/config";

//
const axiosCore = axios.create({
  baseURL: Config.API_BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
});

//
axiosCore.interceptors.request.use(async (request) => {
  return request;
});

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
