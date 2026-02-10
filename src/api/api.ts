import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

// Axios instance for API calls with cookies
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Tracks an ongoing token refresh so only one happens at a time
let refreshPromise: Promise<void> | null = null;

// Refresh the access token, log out if it fails
const refreshAccessToken = async () => {
  if (refreshPromise) return refreshPromise; // Wait if refresh is already running

  refreshPromise = (async () => {
    try {
      await axios.post(
        "/api/v1/users/refresh-token",
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

// Interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (!originalRequest) return Promise.reject(error); // Fail if no request info

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried
      try {
        await refreshAccessToken();
        return api(originalRequest);
      } catch {
        return Promise.reject(error); // Reject if refresh fails
      }
    }

    return Promise.reject(error);
  },
);

export default api;
