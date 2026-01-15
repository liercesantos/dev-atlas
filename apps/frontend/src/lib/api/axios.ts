import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_URL || 'http://localhost:3001/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        await axios.post(
          `${process.env.NEXT_PUBLIC_REST_API_URL || 'http://localhost:3001/api/v1'}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or clear state
        if (typeof window !== 'undefined') {
          // window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
