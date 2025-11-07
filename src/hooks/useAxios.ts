import axios from "axios";
import useRefreshToken from "./useRefreshToken";
import { getAuthInfo } from "../util/AuthUtil";

const BASE_URL = process.env.REACT_APP_REAL_API_BASE_URL || "https://dummyjson.com";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = (() => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
  });

  const refresh = useRefreshToken();

  const requestInterceptor = instance.interceptors.request.use(
    (config) => {
      const authenticationInfo = getAuthInfo();
      // Add Bearer token to requests if not present
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${authenticationInfo?.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const responseInterceptor = instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // Check for 401 Unauthorized and prevent infinite loops
      if (error?.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refresh();
          
          if (newAccessToken) {
            // Update the Authorization header with the new access token
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            
            // Retry the original request with the updated token
            return instance(originalRequest);
          } else {
            // Refresh failed, redirect to login
            window.location.href = "/login";
            return Promise.reject(error);
          }
        } catch (refreshError) {
          // Refresh token expired or invalid, redirect to login
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );

  return {
    ...instance,
    post: instance.post,
    get: instance.get,
    put: instance.put,
    patch: instance.patch,
    delete: instance.delete,
    interceptors: {
      ejectInterceptors: () => {
        instance.interceptors.request.eject(requestInterceptor);
        instance.interceptors.response.eject(responseInterceptor);
      },
    },
  };
})();
