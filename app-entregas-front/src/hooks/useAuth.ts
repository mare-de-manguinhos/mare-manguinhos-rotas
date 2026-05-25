import useAuthStore from '../stores/authStore.ts';
import api from '../services/api/base';
import type { AuthResponse } from '../types/auth';

interface AuthCredentials {
  username: string;
  password: string;
}

export function useAuth() {
  // Debugging: Log to check if useAuthStore is available when the hook runs.
  // console.log('Checking useAuthStore availability:', useAuthStore);
  // const { user, token, isAuthenticated, login, logout } = useAuthStore(); // Removed top-level destructuring

  const signIn = async (credentials: AuthCredentials) => {
    try {
      const response = await api.post<AuthResponse>('/api/auth/login', credentials);
      const { user, token } = response.data;
      console.log(JSON.stringify({ user, token }, null, 2)); // Debugging: Log the response data
      useAuthStore.getState().login(user, token); // Access login directly from the store
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      useAuthStore.getState().logout(); // Access logout directly from the store
      throw error;
    }
  };

  const signOut = () => {
    useAuthStore.getState().logout(); // Access logout directly from the store
    // Optionally, invalidate token on backend if applicable
  };

  // If you need access to store state (user, token, isAuthenticated) here, you would call useAuthStore() again.
  // For this hook's purpose (providing signIn/signOut), direct access to methods is sufficient.
  // If you need the state, you'd typically use it in the component calling this hook.
  // For example: const { isAuthenticated } = useAuthStore();

  return {
    // user,
    // token,
    // isAuthenticated,
    signIn,
    signOut,
  };
}


