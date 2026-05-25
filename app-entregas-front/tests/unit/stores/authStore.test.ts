import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../../../src/stores/authStore';
import { User } from '../../../src/types/auth';

describe('Auth Store', () => {
  const MOCK_USER: User = {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
    role: 'deliveryman',
  };
  const MOCK_TOKEN = 'mock-jwt-token';

  beforeEach(() => {
    // Reset the store before each test to ensure isolation
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    localStorage.clear();
  });

  it('should have correct initial state', () => {
    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  it('should set user, token, and isAuthenticated on login', () => {
    useAuthStore.getState().login(MOCK_USER, MOCK_TOKEN);

    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toEqual(MOCK_USER);
    expect(token).toBe(MOCK_TOKEN);
    expect(isAuthenticated).toBe(true);
  });

  it('should clear user, token, and isAuthenticated on logout', () => {
    // First, log in a user
    useAuthStore.getState().login(MOCK_USER, MOCK_TOKEN);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    // Then, log out
    useAuthStore.getState().logout();

    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  it('should persist state to localStorage', () => {
    useAuthStore.getState().login(MOCK_USER, MOCK_TOKEN);

    // Simulate a reload by creating a new store instance (Zustand will rehydrate from localStorage)
    const rehydratedStore = useAuthStore.persist.rehydrate();

    const stateFromStorage = JSON.parse(localStorage.getItem('auth-storage') || '{}');
    expect(stateFromStorage.state.user).toEqual(MOCK_USER);
    expect(stateFromStorage.state.token).toBe(MOCK_TOKEN);
    expect(stateFromStorage.state.isAuthenticated).toBe(true);
  });

  it('should load state from localStorage on initialization', () => {
    // Manually set localStorage to simulate a previous session
    localStorage.setItem('auth-storage', JSON.stringify({
      state: {
        user: MOCK_USER,
        token: MOCK_TOKEN,
        isAuthenticated: true,
      },
      version: 0,
    }));

    // Re-initialize the store to trigger rehydration
    useAuthStore.persist.rehydrate();

    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toEqual(MOCK_USER);
    expect(token).toBe(MOCK_TOKEN);
    expect(isAuthenticated).toBe(true);
  });
});
