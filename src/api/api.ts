import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

// Axios instance for API calls with cookies
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Helper to get current auth state from localStorage
const getAuthState = () => {
  try {
    const persistRoot = localStorage.getItem("persist:root");
    if (!persistRoot) return null;
    const rootState = JSON.parse(persistRoot);
    if (!rootState.auth) return null;
    return JSON.parse(rootState.auth);
  } catch (error) {
    console.error("Error parsing auth state from localStorage:", error);
    return null;
  }
};

// Tracks an ongoing token refresh so only one happens at a time
let refreshPromise: Promise<void> | null = null;

// Refresh the access token, log out if it fails
const refreshAccessToken = async () => {
  if (refreshPromise) return refreshPromise; // Wait if refresh is already running

  const auth = getAuthState();

  if (auth?.user) {
    refreshPromise = (async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL || "/api/v1"}/users/refresh-token`,
          // {},
          // { withCredentials: true },
        );
      } catch (error) {
        console.error("Token refresh failed:", error);
        throw error;
      } finally {
        refreshPromise = null;
      }
    })();
  } else {
    return Promise.reject(new Error("No user found in auth state"));
  }

  return refreshPromise;
};

// Interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) return Promise.reject(error);

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        // If refresh was successful, retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, we'll let it fall through to the general error handler
        // which might toast or redirect.
        return Promise.reject(refreshError);
      }
    }

    // General error handling for non-401 errors or failed retries
    if (axios.isAxiosError(error) && error.response?.data) {
      const data = error.response.data as { message?: string };
      const status = error.response.status;

      // Don't show toast for 401 if we are about to handle it or if it's expected during logout
      if (status !== 401) {
        toast.error(data.message || "An error occurred");
      }

      console.error("API Error:", data.message || error.message);
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default api;
