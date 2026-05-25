import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ForgotPasswordPage from '../../../src/pages/ForgotPasswordPage';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ForgotPasswordPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockReset();
  });

  it('should display instructions for contacting support', () => {
    render(
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/recuperação de senha/i)).toBeInTheDocument();
    expect(screen.getByText(/para recuperar sua senha, por favor, entre em contato com o suporte./i)).toBeInTheDocument();
    expect(screen.getByText(/você pode ligar para \(xx\) xxxx-xxxx ou enviar um e-mail para suporte@maremanguinhos.com./i)).toBeInTheDocument();
  });

  it('should navigate back to login page when "Voltar para o Login" button is clicked', () => {
    render(
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: /voltar para o login/i });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
