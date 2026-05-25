// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import DashboardPage from '../../../src/pages/DashboardPage';
// import { usePendingDeliveries } from '../../../src/hooks/usePendingDeliveries';
// import { Delivery } from '../../../src/types/delivery';
// import { MemoryRouter } from 'react-router-dom';

// // Mock the usePendingDeliveries hook
// vi.mock('../../../src/hooks/usePendingDeliveries', () => ({
//   usePendingDeliveries: vi.fn(),
// }));

// // Mock react-router-dom's useNavigate
// const mockNavigate = vi.fn();
// vi.mock('react-router-dom', async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//   };
// });

// const mockUnsortedDeliveries: Delivery[] = [
//   {
//     id: '3',
//     clientName: 'Client Charlie',
//     addressSummary: '789 Pine Rd',
//     status: 'pending',
//   },
//   {
//     id: '1',
//     clientName: 'Client Alpha',
//     addressSummary: '123 Main St',
//     status: 'delivered',
//   },
//   {
//     id: '2',
//     clientName: 'Client Beta',
//     addressSummary: '456 Oak Ave',
//     status: 'out-for-delivery',
//   },
// ];

// const mockDeliveriesSortedByStatus: Delivery[] = [
//   {
//     id: '2',
//     clientName: 'Client Beta',
//     addressSummary: '456 Oak Ave',
//     status: 'out-for-delivery',
//   },
//   {
//     id: '1',
//     clientName: 'Client Alpha',
//     addressSummary: '123 Main St',
//     status: 'delivered',
//   },
//   {
//     id: '3',
//     clientName: 'Client Charlie',
//     addressSummary: '789 Pine Rd',
//     status: 'pending',
//   },
// ];

// const mockDeliveriesSortedByClientName: Delivery[] = [
//   {
//     id: '1',
//     clientName: 'Client Alpha',
//     addressSummary: '123 Main St',
//     status: 'delivered',
//   },
//   {
//     id: '2',
//     clientName: 'Client Beta',
//     addressSummary: '456 Oak Ave',
//     status: 'out-for-delivery',
//   },
//   {
//     id: '3',
//     clientName: 'Client Charlie',
//     addressSummary: '789 Pine Rd',
//     status: 'pending',
//   },
// ];

// describe('DashboardPage', () => {
//   const mockPullToRefresh = vi.fn();
//   const mockUsePendingDeliveries = usePendingDeliveries as ReturnType<typeof vi.fn>;

//   beforeEach(() => {
//     vi.clearAllMocks();
//     mockNavigate.mockReset();
//     mockUsePendingDeliveries.mockReturnValue({
//       deliveries: [],
//       loading: true,
//       error: null,
//       pullToRefresh: mockPullToRefresh,
//     });
//   });

//   it('should display loading state initially', () => {
//     render(
//       <MemoryRouter>
//         <DashboardPage />
//       </MemoryRouter>
//     );
//     expect(screen.getByText(/carregando entregas pendentes.../i)).toBeInTheDocument();
//   });

//   it('should display deliveries when loaded', async () => {
//     mockUsePendingDeliveries.mockReturnValue({
//       deliveries: mockUnsortedDeliveries,
//       loading: false,
//       error: null,
//       pullToRefresh: mockPullToRefresh,
//     });

//     render(
//       <MemoryRouter>
//         <DashboardPage />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/client alpha/i)).toBeInTheDocument();
//       expect(screen.getByText(/client beta/i)).toBeInTheDocument();
//       expect(screen.getByText(/client charlie/i)).toBeInTheDocument();
//       expect(screen.queryByText(/carregando entregas pendentes.../i)).not.toBeInTheDocument();
//     });
//   });

//   it('should display empty message when no deliveries', async () => {
//     mockUsePendingDeliveries.mockReturnValue({
//       deliveries: [],
//       loading: false,
//       error: null,
//       pullToRefresh: mockPullToRefresh,
//     });

//     render(
//       <MemoryRouter>
//         <DashboardPage />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/nenhuma entrega pendente no momento./i)).toBeInTheDocument();
//     });
//   });

//   it('should display error message and retry button on error', async () => {
//     mockUsePendingDeliveries.mockReturnValue({
//       deliveries: [],
//       loading: false,
//       error: 'Failed to load deliveries',
//       pullToRefresh: mockPullToRefresh,
//     });

//     render(
//       <MemoryRouter>
//         <DashboardPage />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/erro: failed to load deliveries/i)).toBeInTheDocument();
//       expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument();
//     });
//   });

//   it('should call pullToRefresh when refresh button is clicked', async () => {
//     mockUsePendingDeliveries.mockReturnValue({
//       deliveries: mockUnsortedDeliveries,
//       loading: false,
//       error: null,
//       pullToRefresh: mockPullToRefresh,
//     });

//     render(
//       <MemoryRouter>
//         <DashboardPage />
//       </MemoryRouter>
//     );

//     const refreshButton = screen.getByRole('button', { name: /atualizar entregas/i });
//     fireEvent.click(refreshButton);

//     expect(mockPullToRefresh).toHaveBeenCalledTimes(1);
//   });

//   it('should navigate to delivery details on item click', async () => {
//     mockUsePendingDeliveries.mockReturnValue({
//       deliveries: mockUnsortedDeliveries,
//       loading: false,
//       error: null,
//       pullToRefresh: mockPullToRefresh,
//     });

//     render(
//       <MemoryRouter>
//         <DashboardPage />
//       </MemoryRouter>
//     );

//     const deliveryItem = screen.getByText('Client Alpha'); // Use a client from mockUnsortedDeliveries
//     fireEvent.click(deliveryItem);

//     expect(mockNavigate).toHaveBeenCalledWith('/details/1');
//   });

//   it('should sort deliveries by status when "Status" is selected', async () => {
//     mockUsePendingDeliveries.mockImplementation((sortBy) => ({
//       deliveries: sortBy === 'status' ? mockDeliveriesSortedByStatus : mockUnsortedDeliveries,
//       loading: false,
//       error: null,
//       pullToRefresh: mockPullToRefresh,
//     }));

//     render(
//       <MemoryRouter>
//         <DashboardPage />
//       </MemoryRouter>
//     );

//     const sortBySelect = screen.getByLabelText(/ordenar por:/i);
//     fireEvent.change(sortBySelect, { target: { value: 'status' } });

//     await waitFor(() => {
//       const items = screen.getAllByRole('heading', { level: 3 });
//       expect(items[0]).toHaveTextContent(/client beta/i);
//       expect(items[1]).toHaveTextContent(/client alpha/i);
//       expect(items[2]).toHaveTextContent(/client charlie/i);
//     });
//   });

//   it('should sort deliveries by client name when "Nome do Cliente" is selected', async () => {
//     mockUsePendingDeliveries.mockImplementation((sortBy) => ({
//       deliveries: sortBy === 'clientName' ? mockDeliveriesSortedByClientName : mockUnsortedDeliveries,
//       loading: false,
//       error: null,
//       pullToRefresh: mockPullToRefresh,
//     }));

//     render(
//       <MemoryRouter>
//         <DashboardPage />
//       </MemoryRouter>
//     );

//     const sortBySelect = screen.getByLabelText(/ordenar por:/i);
//     fireEvent.change(sortBySelect, { target: { value: 'clientName' } });

//     await waitFor(() => {
//       const items = screen.getAllByRole('heading', { level: 3 });
//       expect(items[0]).toHaveTextContent(/client alpha/i);
//       expect(items[1]).toHaveTextContent(/client beta/i);
//       expect(items[2]).toHaveTextContent(/client charlie/i);
//     });
//   });
// });
