import useAuthStore from '../stores/authStore.ts';
import api from '../services/api/base';
import type { AuthResponse } from '../types/auth';

interface AuthCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const signIn = async (credentials: AuthCredentials) => {
    try {
      const response = await api.post<AuthResponse>('/api/auth/login', credentials);
      const { user, token } = response.data;
      useAuthStore.getState().login(user, token);
      return true;
    } catch (error) {
      useAuthStore.getState().logout();
      throw error;
    }
  };

  const signOut = () => {
    useAuthStore.getState().logout();
  };

  return { signIn, signOut };
}
