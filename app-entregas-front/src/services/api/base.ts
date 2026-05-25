import axios from 'axios';
import useAuthStore from '../../stores/authStore';

const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Base Axios instance for API communication.
 * Configures a base URL and default headers.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to automatically attach the authentication token
 * from local storage to the Authorization header of outgoing requests.
 */
api.interceptors.request.use(
  (config) => {
    // VITE_API_URL is correctly handled via import.meta.env.VITE_API_URL.
    // The API Key is loaded from the environment variable VITE_BEARER_TOKEN.
    // Ensure VITE_BEARER_TOKEN is set in your .env file (e.g., .env.local).
    const apiKey = import.meta.env.VITE_BEARER_TOKEN;
    if (apiKey) {
      config.headers.Authorization = `Bearer ${apiKey}`;
    } else {
      console.warn("VITE_BEARER_TOKEN environment variable not set. Authorization header will not be included.");
      // Depending on the backend's requirements, you might want to:
      // 1. Throw an error to prevent the request.
      // 2. Redirect to login if this is meant to be a user-specific token.
      // For now, we allow the request to proceed without the header if the key is missing.
    }

    // Add User ID to headers if available
    const userId = useAuthStore.getState().user?.id;
    if (userId) {
      config.headers['X-User-ID'] = userId;
    } else {
      console.warn("User ID not found. 'X-User-ID' header will not be included.");
    }

    return config;
  },
  (error) => {
    // Handle request interception errors
    return Promise.reject(error);
  }
);


/**
 * Response interceptor for global error handling.
 * Specifically handles 401 Unauthorized errors by clearing authentication
 * state and redirecting the user to the login page.
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth-storage'); // Clear auth state
      window.location.href = '/'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
