import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// To handle multiple requests failing at the same time, we store the
// refresh promise. All failed requests will wait for this one promise.
let refreshPromise: Promise<void> | null = null;

const refreshAccessToken = async () => {
  // If a refresh is already in progress, return the existing promise
  if (refreshPromise) {
    return refreshPromise;
  }

  // Create a new refresh promise
  refreshPromise = (async () => {
    try {
      // Use a fresh axios instance to avoid infinite loops
      await axios.post(
        "/api/v1/users/refresh-token",
        {},
        { withCredentials: true },
      );
    } catch (error) {
      // If refresh fails, we can't do anything. Clear the promise and throw.
      refreshPromise = null;
      throw error;
    } finally {
      // Clear the promise so next time we can refresh again if needed
      // (We keep it briefly to let parallel requests resolve)
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // If 401 Unauthorized and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Wait for the refresh to complete
        await refreshAccessToken();

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, reject the original request
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
