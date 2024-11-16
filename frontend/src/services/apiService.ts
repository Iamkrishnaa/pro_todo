import axios, { AxiosInstance } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    isAuthRoute?: boolean;
  }
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
