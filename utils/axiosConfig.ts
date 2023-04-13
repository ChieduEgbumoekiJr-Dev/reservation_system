import axios from "axios";
import { getCookie } from "cookies-next";

export const axiosAuth = axios.create({
  baseURL: `api/auth`,
});

export const axiosRestaurant = axios.create({
  baseURL: `http://localhost:3000/api/restaurant/`,
});

axiosAuth.interceptors.request.use(
  (config) => {
    const jwt = getCookie("jwt");

    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
