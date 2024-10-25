import axios from "axios";
import { penggunaStore } from "./PenggunaUtils";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = penggunaStore.currentUser?.token  ;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
