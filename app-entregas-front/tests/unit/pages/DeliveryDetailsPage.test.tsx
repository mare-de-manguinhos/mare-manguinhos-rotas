import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterAll } from 'vitest';
import DeliveryDetailsPage from '../../../src/pages/DeliveryDetailsPage';
import { useDeliveryDetails } from '../../../src/hooks/useDeliveryDetails';
import { Delivery } from '../../../src/types/delivery';
import { MemoryRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';

// Mock the useDeliveryDetails hook
vi.mock('../../../src/hooks/useDeliveryDetails', () => ({
  useDeliveryDetails: vi.fn(),
}));

// Mocks for react-router-dom hooks
export const mockUseNavigate = vi.fn();
export const mockUseParams = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockUseNavigate,
    useParams: () => mockUseParams(),
  };
});

const mockDelivery: Delivery = {
  id: 'delivery-123',
  clientName: 'João da Silva',
  addressSummary: 'Rua Exemplo, 123',
  deliveryAddress: 'Rua Exemplo, 123 - Bairro Centro, Cidade - UF, 12345-678',
  clientPhone: '5511987654321',
  status: 'SAIU_PARA_ENTREGA',
};

describe('DeliveryDetailsPage', () => {
  const originalWindowOpen = window.open;
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseNavigate.mockReset(); // Explicitly reset mock call history
    mockUseParams.mockReset();   // Explicitly reset mock call history


    // Default mock for useDeliveryDetails
    (useDeliveryDetails as ReturnType<typeof vi.fn>).mockReturnValue({
      delivery: mockDelivery,
      loading: false,
      error: null,
    });
    // Mock useParams for each test
    mockUseParams.mockReturnValue({ id: mockDelivery.id });
    // Mock window.open
    window.open = vi.fn();
    // Mock navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
    });
  });

  afterAll(() => {
    window.open = originalWindowOpen;
    Object.defineProperty(navigator, 'clipboard', { value: originalClipboard, writable: true });

  });

  it('should display loading state initially', () => {
    (useDeliveryDetails as ReturnType<typeof vi.fn>).mockReturnValue({
      delivery: null,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={[`/details/${mockDelivery.id}`]}>
        <Routes>
          <Route path='/details/:id' element={<DeliveryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/carregando detalhes da entrega.../i)).toBeInTheDocument();
  });

  it('should display delivery details when loaded', async () => {
    render(
      <MemoryRouter initialEntries={[`/details/${mockDelivery.id}`]}>
        <Routes>
          <Route path='/details/:id' element={<DeliveryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockDelivery.clientName)).toBeInTheDocument();
      expect(screen.getByText(mockDelivery.deliveryAddress)).toBeInTheDocument();
      expect(screen.getByText(mockDelivery.clientPhone!)).toBeInTheDocument();
      expect(screen.getByText(/Out For Delivery/i)).toBeInTheDocument();
    });
  });

  it('should display error message on fetch error', async () => {
    const errorMessage = 'Failed to fetch delivery details';
    (useDeliveryDetails as ReturnType<typeof vi.fn>).mockReturnValue({
      delivery: null,
      loading: false,
      error: errorMessage,
    });

    render(
      <MemoryRouter initialEntries={[`/details/${mockDelivery.id}`]}>
        <Routes>
          <Route path='/details/:id' element={<DeliveryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(`Erro: ${errorMessage}`)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument();
    });
  });

  it('should display "Entrega não encontrada" if no delivery is returned', async () => {
    (useDeliveryDetails as ReturnType<typeof vi.fn>).mockReturnValue({
      delivery: null,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={[`/details/${mockDelivery.id}`]}>
        <Routes>
          <Route path='/details/:id' element={<DeliveryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/entrega não encontrada./i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument();
    });
  });

  it('should open Google Maps with the correct address on button click', async () => {
    render(
      <MemoryRouter initialEntries={[`/details/${mockDelivery.id}`]}>
        <Routes>
          <Route path='/details/:id' element={<DeliveryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    const openMapsButton = screen.getByRole('button', { name: /abrir rota no maps/i });
    fireEvent.click(openMapsButton);

    const expectedUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mockDelivery.deliveryAddress)}`;
    expect(window.open).toHaveBeenCalledWith(expectedUrl, '__blank');
  });

  it('should copy address to clipboard on button click', async () => {
    render(
      <MemoryRouter initialEntries={[`/details/${mockDelivery.id}`]}>
        <Routes>
          <Route path='/details/:id' element={<DeliveryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    const copyAddressButton = screen.getByRole('button', { name: /copiar endereço/i });
    fireEvent.click(copyAddressButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockDelivery.deliveryAddress);
    });
  });

  it('should navigate back to dashboard when "Voltar para o Dashboard" is clicked', () => {
    render(
      <MemoryRouter initialEntries={[`/details/${mockDelivery.id}`]}>
        <Routes>
          <Route path='/details/:id' element={<DeliveryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: /voltar para o dashboard/i });
    fireEvent.click(backButton);

    expect(mockUseNavigate).toHaveBeenCalledWith(-1);
  });
});
