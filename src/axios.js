import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_HOST}/api`,
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.reload();
      return error;
    }
    throw error;
  }
);

export default axiosClient;
