import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LoginPage from '../../../src/pages/LoginPage';
import { useAuth } from '../../../src/hooks/useAuth';
import { MemoryRouter } from 'react-router-dom';

// Mock the useAuth hook
vi.mock('../../../src/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

// Mock react-router-dom's useNavigate and Link
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: vi.fn(({ to, children, ...props }) => (
      <a href={to} onClick={(e) => { e.preventDefault(); mockNavigate(to); }} {...props}>
        {children}
      </a>
    )),
  };
});

describe('LoginPage', () => {
  const mockSignIn = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Default successful signIn mock
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      signIn: mockSignIn.mockResolvedValue(true),
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('should render the login form', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/esqueci minha senha/i)).toBeInTheDocument();
  });

  it('should show an error message if fields are empty', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/por favor, preencha todos os campos./i)).toBeInTheDocument();
    });
  });

  it('should call signIn and navigate on successful login', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/usuário/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(usernameInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({ username: 'test@example.com', password: 'password123' });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should show an error message on failed login', async () => {
    mockSignIn.mockRejectedValue(new Error('Credenciais inválidas'));

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/usuário/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(usernameInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledOnce();
      expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument();
    });
  });

  it('should navigate to forgot password page', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const forgotPasswordLink = screen.getByText(/esqueci minha senha/i);
    fireEvent.click(forgotPasswordLink);

    expect(mockNavigate).toHaveBeenCalledWith('/forgot-password');
  });
});
