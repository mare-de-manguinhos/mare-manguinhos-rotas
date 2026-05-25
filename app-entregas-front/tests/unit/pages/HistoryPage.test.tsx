// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import HistoryPage from '../../../src/pages/HistoryPage';
// import { useDeliveryHistory } from '../../../src/hooks/useDeliveryHistory';
// import { Delivery } from '../../../src/types/delivery';
// import { MemoryRouter } from 'react-router-dom';

// // Mock the useDeliveryHistory hook
// vi.mock('../../../src/hooks/useDeliveryHistory', () => ({
//   useDeliveryHistory: vi.fn(),
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

// const mockUnsortedHistory: Delivery[] = [
//   {
//     id: 'h3',
//     clientName: 'Client Charlie',
//     addressSummary: '789 Pine Rd',
//     status: 'address-not-found',
//   },
//   {
//     id: 'h1',
//     clientName: 'Client Alpha',
//     addressSummary: '123 Main St',
//     status: 'delivered',
//   },
//   {
//     id: 'h2',
//     clientName: 'Client Beta',
//     addressSummary: '456 Oak Ave',
//     status: 'client-not-found',
//   },
// ];

// const mockHistorySortedByStatus: Delivery[] = [
//   {
//     id: 'h3',
//     clientName: 'Client Charlie',
//     addressSummary: '789 Pine Rd',
//     status: 'address-not-found',
//   },
//   {
//     id: 'h2',
//     clientName: 'Client Beta',
//     addressSummary: '456 Oak Ave',
//     status: 'client-not-found',
//   },
//   {
//     id: 'h1',
//     clientName: 'Client Alpha',
//     addressSummary: '123 Main St',
//     status: 'delivered',
//   },
// ];

// const mockHistorySortedByClientName: Delivery[] = [
//   {
//     id: 'h1',
//     clientName: 'Client Alpha',
//     addressSummary: '123 Main St',
//     status: 'delivered',
//   },
//   {
//     id: 'h2',
//     clientName: 'Client Beta',
//     addressSummary: '456 Oak Ave',
//     status: 'client-not-found',
//   },
//   {
//     id: 'h3',
//     clientName: 'Client Charlie',
//     addressSummary: '789 Pine Rd',
//     status: 'address-not-found',
//   },
// ];

// const mockHistoryFilteredAndSorted: Delivery[] = [
//   {
//     id: 'h1',
//     clientName: 'Client Alpha',
//     addressSummary: '123 Main St',
//     status: 'delivered',
//   },
// ];

// describe('HistoryPage', () => {
//   const mockFetchDeliveryHistory = vi.fn();
//   const mockUseDeliveryHistory = useDeliveryHistory as ReturnType<typeof vi.fn>;

//   beforeEach(() => {
//     vi.clearAllMocks();
//     mockNavigate.mockReset();
//     mockUseDeliveryHistory.mockReturnValue({
//       history: [],
//       loading: true,
//       error: null,
//       fetchDeliveryHistory: mockFetchDeliveryHistory,
//     });
//   });

//   it('should display loading state initially', () => {
//     render(
//       <MemoryRouter>
//         <HistoryPage />
//       </MemoryRouter>
//     );
//     expect(screen.getByText(/carregando histórico de entregas.../i)).toBeInTheDocument();
//   });

//   it('should display history when loaded', async () => {
//     mockUseDeliveryHistory.mockReturnValue({
//       history: mockUnsortedHistory,
//       loading: false,
//       error: null,
//       fetchDeliveryHistory: mockFetchDeliveryHistory,
//     });

//     render(
//       <MemoryRouter>
//         <HistoryPage />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/client alpha/i)).toBeInTheDocument();
//       expect(screen.getByText(/client beta/i)).toBeInTheDocument();
//       expect(screen.getByText(/client charlie/i)).toBeInTheDocument();
//       expect(screen.queryByText(/carregando histórico de entregas.../i)).not.toBeInTheDocument();
//     });
//   });

//   it('should display empty message when no history', async () => {
//     mockUseDeliveryHistory.mockReturnValue({
//       history: [],
//       loading: false,
//       error: null,
//       fetchDeliveryHistory: mockFetchDeliveryHistory,
//     });

//     render(
//       <MemoryRouter>
//         <HistoryPage />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/nenhuma entrega realizada ainda./i)).toBeInTheDocument();
//     });
//   });

//   it('should display error message and retry button on error', async () => {
//     mockUseDeliveryHistory.mockReturnValue({
//       history: [],
//       loading: false,
//       error: 'Failed to load history',
//       fetchDeliveryHistory: mockFetchDeliveryHistory,
//     });

//     render(
//       <MemoryRouter>
//         <HistoryPage />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/erro: failed to load history/i)).toBeInTheDocument();
//       expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument();
//     });
//   });

//   it('should call fetchDeliveryHistory when refresh button is clicked', async () => {
//     mockUseDeliveryHistory.mockReturnValue({
//       history: mockUnsortedHistory,
//       loading: false,
//       error: null,
//       fetchDeliveryHistory: mockFetchDeliveryHistory,
//     });

//     render(
//       <MemoryRouter>
//         <HistoryPage />
//       </MemoryRouter>
//     );

//     const refreshButton = screen.getByRole('button', { name: /atualizar histórico/i });
//     fireEvent.click(refreshButton);

//     expect(mockFetchDeliveryHistory).toHaveBeenCalledTimes(1);
//   });

//   it('should navigate to delivery details on item click', async () => {
//     mockUseDeliveryHistory.mockReturnValue({
//       history: mockUnsortedHistory,
//       loading: false,
//       error: null,
//       fetchDeliveryHistory: mockFetchDeliveryHistory,
//     });

//     render(
//       <MemoryRouter>
//         <HistoryPage />
//       </MemoryRouter>
//     );

//     const deliveryItem = screen.getByText('Client Alpha');
//     fireEvent.click(deliveryItem);

//     expect(mockNavigate).toHaveBeenCalledWith('/details/h1');
//   });

//   it('should sort deliveries by status when "Status" is selected', async () => {
//     mockUseDeliveryHistory.mockImplementation((sortBy, filterBy) => ({
//       history: sortBy === 'status' ? mockHistorySortedByStatus : mockUnsortedHistory,
//       loading: false,
//       error: null,
//       fetchDeliveryHistory: mockFetchDeliveryHistory,
//     }));

//     render(
//       <MemoryRouter>
//         <HistoryPage />
//       </MemoryRouter>
//     );

//     const sortBySelect = screen.getByLabelText(/ordenar por:/i);
//     fireEvent.change(sortBySelect, { target: { value: 'status' } });

//     await waitFor(() => {
//       const items = screen.getAllByRole('heading', { level: 3 });
//       expect(items[0]).toHaveTextContent(/client charlie/i); // address-not-found
//       expect(items[1]).toHaveTextContent(/client beta/i);    // client-not-found
//       expect(items[2]).toHaveTextContent(/client alpha/i);   // delivered
//     });
//   });

//   it('should sort deliveries by client name when "Nome do Cliente" is selected', async () => {
//     mockUseDeliveryHistory.mockImplementation((sortBy, filterBy) => ({
//       history: sortBy === 'clientName' ? mockHistorySortedByClientName : mockUnsortedHistory,
//       loading: false,
//       error: null,
//       fetchDeliveryHistory: mockFetchDeliveryHistory,
//     }));

//     render(
//       <MemoryRouter>
//         <HistoryPage />
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

//   it('should filter deliveries by status when "Entregue" is selected', async () => {
//     mockUseDeliveryHistory.mockImplementation((sortBy, filterBy) => ({
//       history: filterBy === 'delivered' ? mockHistory.filter(d => d.status === 'delivered') : mockUnsortedHistory,
//       loading: false,
//       error: null,
//       fetchDeliveryHistory: mockFetchDeliveryHistory,
//     }));

//     render(
//       <MemoryRouter>
//         <HistoryPage />
//       </MemoryRouter>
//     );

//     const filterBySelect = screen.getByLabelText(/filtrar por status:/i);
//     fireEvent.change(filterBySelect, { target: { value: 'delivered' } });

//     await waitFor(() => {
//       const items = screen.getAllByRole('heading', { level: 3 });
//       expect(items).toHaveLength(1);
//       expect(items[0]).toHaveTextContent(/client alpha/i);
//     });
//   });

//   it('should filter and sort deliveries correctly', async () => {
//     mockUseDeliveryHistory.mockImplementation((sortBy, filterBy) => {
//       let data = mockUnsortedHistory;
//       if (filterBy === 'delivered') {
//         data = data.filter(d => d.status === 'delivered');
//       }
//       if (sortBy === 'clientName') {
//         data = [...data].sort((a, b) => a.clientName.localeCompare(b.clientName));
//       }
//       return {
//         history: data,
//         loading: false,
//         error: null,
//         fetchDeliveryHistory: mockFetchDeliveryHistory,
//       };
//     });

//     render(
//       <MemoryRouter>
//         <HistoryPage />
//       </MemoryRouter>
//     );

//     const filterBySelect = screen.getByLabelText(/filtrar por status:/i);
//     fireEvent.change(filterBySelect, { target: { value: 'delivered' } });

//     const sortBySelect = screen.getByLabelText(/ordenar por:/i);
//     fireEvent.change(sortBySelect, { target: { value: 'clientName' } });

//     await waitFor(() => {
//       const items = screen.getAllByRole('heading', { level: 3 });
//       expect(items).toHaveLength(1);
//       expect(items[0]).toHaveTextContent(/client alpha/i);
//     });
//   });
// });
