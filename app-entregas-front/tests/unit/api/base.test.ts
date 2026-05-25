import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import api from '../../../src/services/api/base';

const handlers = [
  http.get('*/test-endpoint', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (authHeader === 'Bearer test-token') {
      return HttpResponse.json({ message: 'Authorized success' });
    } else if (authHeader) {
      return new HttpResponse(null, { status: 403 }); // Forbidden for incorrect token
    }
    return HttpResponse.json({ message: 'Unauthorized success' });
  }),
  http.post('*/auth/login', () => {
    return HttpResponse.json({ user: { id: '1', name: 'Test User' }, token: 'new-test-token' });
  }),
  http.get('*/error-endpoint', () => {
    return new HttpResponse(null, { status: 401 });
  }),
];

const server = setupServer(...handlers);

describe('API Service', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    localStorage.clear();
  });
  afterAll(() => server.close());

  it('should have the correct base URL', () => {
    expect(api.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
  });

  it('should add Authorization header if token exists in localStorage', async () => {
    localStorage.setItem('auth-storage', JSON.stringify({ state: { token: 'test-token' } }));

    const response = await api.get('/test-endpoint');
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Authorized success' });
  });

  it('should not add Authorization header if no token in localStorage', async () => {
    const response = await api.get('/test-endpoint');
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Unauthorized success' });
  });

  it('should handle API errors', async () => {
    await expect(api.get('/error-endpoint')).rejects.toThrow();
  });

  it('should handle successful post requests', async () => {
    const response = await api.post('/auth/login', { username: 'test', password: 'test' });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ user: { id: '1', name: 'Test User' }, token: 'new-test-token' });
  });
});
