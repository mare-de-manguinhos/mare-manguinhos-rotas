import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import '@testing-library/jest-dom/vitest'; // Import jest-dom matchers

const localStorageMock = (
  function () {
    let store: Record<string, string> = {};
    return {
      getItem: function (key: string) {
        return store[key] || null;
      },
      setItem: function (key: string, value: string) {
        store[key] = value.toString();
      },
      clear: function () {
        store = {};
      },
      removeItem: function (key: string) {
        delete store[key];
      },
    };
  }()
);

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

// Mock import.meta.env.VITE_API_URL for tests
vi.stubEnv('VITE_API_URL', 'http://localhost:3000/api');
