import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuth } from '../../../src/hooks/useAuth';
import useAuthStore from '../../../src/stores/authStore';
import api from '../../../src/services/api/base';
import { User } from '../../../src/types/auth';

const MOCK_USER: User = {
  id: 'user-123',
  name: 'Test User',
  email: 'test@example.com',
  role: 'deliveryman',
};
const MOCK_TOKEN = 'mock-jwt-token';

describe('useAuth Hook', () => {
  beforeEach(() => {
    // Reset the store before each test
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    localStorage.clear();
    // Mock API calls
    vi.spyOn(api, 'post').mockClear();
  });

  it('should return initial authentication state', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should successfully sign in a user', async () => {
    // Mock a successful API response
    vi.spyOn(api, 'post').mockResolvedValue({
      data: { user: MOCK_USER, token: MOCK_TOKEN },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const success = await result.current.signIn({ username: 'test', password: 'password' });
      expect(success).toBe(true);
    });

    expect(api.post).toHaveBeenCalledWith('/auth/login', { username: 'test', password: 'password' });
    expect(result.current?.user).toEqual(MOCK_USER);
    expect(result.current?.token).toBe(MOCK_TOKEN);
    expect(result.current?.isAuthenticated).toBe(true);
  });

  it('should handle sign in failure (API error)', async () => {
    // Mock a failed API response
    vi.spyOn(api, 'post').mockRejectedValue(new Error('Invalid credentials'));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await expect(result.current.signIn({ username: 'test', password: 'wrong' })).rejects.toThrow('Invalid credentials');
    });

    expect(api.post).toHaveBeenCalledWith('/auth/login', { username: 'test', password: 'wrong' });
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should sign out a user', async () => {
    // First, simulate a logged-in state
    useAuthStore.getState().login(MOCK_USER, MOCK_TOKEN);
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(true);

    await act(async () => {
      result.current.signOut();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
