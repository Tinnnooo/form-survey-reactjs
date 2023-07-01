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
    if (error.response && error.response.data.message) {
      throw error;
    } else {
      localStorage.removeItem("accessToken");
      window.location.reload();
      return error;
    }
  }
);

export default axiosClient;
