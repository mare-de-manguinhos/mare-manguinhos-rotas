// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { useParams, useNavigate } from 'react-router-dom';
// import DeliveryDetailsPage from '../pages/DeliveryDetailsPage';
// import { useDeliveryDetails } from '../hooks/useDeliveryDetails';
// import useAuthStore from '../stores/authStore.ts';
// import { updateDeliveryStatus } from '../services/api/deliveryService';

// // Mock react-router-dom hooks
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams: jest.fn(),
//   useNavigate: jest.fn(),
// }));

// // Mock custom hooks and stores
// jest.mock('../hooks/useDeliveryDetails');
// jest.mock('../stores/authStore.ts');

// // Mock API service functions
// jest.mock('../services/api/deliveryService', () => ({
//   updateDeliveryStatus: jest.fn(),
// }));

// // Type casts for mocks
// const mockUseParams = useParams as jest.Mock;
// const mockUseNavigate = useNavigate as jest.Mock;
// const mockUseDeliveryDetails = useDeliveryDetails as jest.Mock;
// const mockUpdateDeliveryStatus = updateDeliveryStatus as jest.Mock;
// const mockLogout = jest.fn();

// // Mocked data
// const mockDelivery = {
//   id: '1',
//   clientName: 'John Doe',
//   deliveryAddress: '123 Main St, Anytown, CA 90210',
//   clientPhone: '555-1234',
//   status: 'pending',
// };

// describe('DeliveryDetailsPage', () => {
//   beforeEach(() => {
//     // Reset mocks before each test
//     mockUseParams.mockClear();
//     mockUseNavigate.mockClear();
//     mockUseDeliveryDetails.mockClear();
//     mockUpdateDeliveryStatus.mockClear();
//     useAuthStore.getState().logout = mockLogout;
//     mockLogout.mockClear();

//     // Default mock implementations
//     mockUseParams.mockReturnValue({ id: '1' });
//     mockUseDeliveryDetails.mockReturnValue({ delivery: mockDelivery, loading: false, error: null, refetchDelivery: jest.fn() });
//     useAuthStore.mockReturnValue({ user: { id: 'user1', name: 'Test User' }, logout: mockLogout });
//   });

//   it('should render loading state correctly', () => {
//     mockUseDeliveryDetails.mockReturnValue({ delivery: null, loading: true, error: null, refetchDelivery: jest.fn() });
//     render(<DeliveryDetailsPage />);
//     expect(screen.getByText('Carregando detalhes da entrega...')).toBeInTheDocument();
//   });

//   it('should render error state correctly', () => {
//     mockUseDeliveryDetails.mockReturnValue({ delivery: null, loading: false, error: 'Failed to load data', refetchDelivery: jest.fn() });
//     render(<DeliveryDetailsPage />);
//     expect(screen.getByText('Erro: Failed to load data')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Voltar/i })).toBeInTheDocument();
//   });

//   it('should render delivery not found message', () => {
//     mockUseDeliveryDetails.mockReturnValue({ delivery: null, loading: false, error: null, refetchDelivery: jest.fn() });
//     render(<DeliveryDetailsPage />);
//     expect(screen.getByText('Entrega não encontrada.')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Voltar/i })).toBeInTheDocument();
//   });

//   it('should render delivery details correctly', () => {
//     render(<DeliveryDetailsPage />);

//     expect(screen.getByText('Detalhes da Entrega')).toBeInTheDocument();
//     expect(screen.getByText('Cliente:')).toBeInTheDocument();
//     expect(screen.getByText('John Doe')).toBeInTheDocument();
//     expect(screen.getByText('Endereço:')).toBeInTheDocument();
//     expect(screen.getByText('123 Main St, Anytown, CA 90210')).toBeInTheDocument();
//     expect(screen.getByText('Telefone:')).toBeInTheDocument();
//     expect(screen.getByRole('link', { name: /555-1234/i })).toBeInTheDocument();
//     expect(screen.getByText('Status Atual:')).toBeInTheDocument();
//     expect(screen.getByText('Pendente')).toBeInTheDocument(); // Assuming 'Pendente' is the label for 'pending'
//     expect(screen.getByRole('button', { name: /Abrir Rota no Maps/i })).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Copiar Endereço/i })).toBeInTheDocument();
//   });

//   it('should call navigate to previous page when back button is clicked', () => {
//     const navigateMock = jest.fn();
//     mockUseNavigate.mockReturnValue(navigateMock);
//     mockUseDeliveryDetails.mockReturnValue({ delivery: null, loading: false, error: 'Failed to load data', refetchDelivery: jest.fn() }); // Simulate error state to show back button

//     render(<DeliveryDetailsPage />);
//     fireEvent.click(screen.getByRole('button', { name: /Voltar/i }));
//     expect(navigateMock).toHaveBeenCalledWith(-1);
//   });

//   it('should call logout and navigate to login page when Sair button is clicked', () => {
//     render(<DeliveryDetailsPage />);
//     fireEvent.click(screen.getByRole('button', { name: /Sair/i }));
//     expect(mockLogout).toHaveBeenCalled();
//     expect(mockUseNavigate()).toHaveBeenCalledWith('/');
//   });

//   describe('Status Update Functionality', () => {
//     let refetchDeliveryMock: jest.Mock;

//     beforeEach(() => {
//       refetchDeliveryMock = jest.fn();
//       mockUseDeliveryDetails.mockReturnValue({ delivery: mockDelivery, loading: false, error: null, refetchDelivery: refetchDeliveryMock });
//     });

//     it('should render the status update section with a select dropdown', () => {
//       render(<DeliveryDetailsPage />);
//       expect(screen.getByText(/Atualizar Status/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/Novo Status/i)).toBeInTheDocument();
//       expect(screen.getByRole('button', { name: /Atualizar Status/i })).toBeInTheDocument();
//     });

//     it('should update selected status when dropdown value changes', () => {
//       render(<DeliveryDetailsPage />);
//       const statusSelect = screen.getByLabelText(/Novo Status/i) as HTMLSelectElement;
//       fireEvent.change(statusSelect, { target: { value: 'out-for-delivery' } });
//       expect(statusSelect.value).toBe('out-for-delivery');
//     });

//     it('should disable the update button if no new status is selected or status is the same', () => {
//       render(<DeliveryDetailsPage />);
//       const statusSelect = screen.getByLabelText(/Novo Status/i) as HTMLSelectElement;
//       const updateButton = screen.getByRole('button', { name: /Atualizar Status/i });

//       // Initially, if selectedStatus is the same as delivery.status, it should be disabled
//       expect(updateButton).toBeDisabled();

//       // Select a different status
//       fireEvent.change(statusSelect, { target: { value: 'out-for-delivery' } });
//       expect(updateButton).not.toBeDisabled();

//       // Change back to the original status
//       fireEvent.change(statusSelect, { target: { value: 'pending' } });
//       expect(updateButton).toBeDisabled();
//     });

//     it('should call updateDeliveryStatus and refetchDelivery on successful status update', async () => {
//       render(<DeliveryDetailsPage />);
//       const statusSelect = screen.getByLabelText(/Novo Status/i) as HTMLSelectElement;
//       const updateButton = screen.getByRole('button', { name: /Atualizar Status/i });

//       // Select a new status
//       fireEvent.change(statusSelect, { target: { value: 'delivered' } });

//       // Mock the successful API response
//       mockUpdateDeliveryStatus.mockResolvedValue({ ...mockDelivery, status: 'delivered' });

//       // Click the update button
//       fireEvent.click(updateButton);

//       // Check if the button shows 'Atualizando...'
//       expect(screen.getByRole('button', { name: /Atualizando.../i })).toBeInTheDocument();
//       expect(updateButton).toBeDisabled();

//       // Wait for the async operations to complete
//       await waitFor(() => {
//         expect(mockUpdateDeliveryStatus).toHaveBeenCalledWith(mockDelivery.id, 'delivered');
//         expect(refetchDeliveryMock).toHaveBeenCalled();
//         // Check if alert is called (note: alert is tricky to mock directly, but we can check if the function was called)
//         // For a more robust test, you might mock window.alert
//       });

//       // After update, the button should be re-enabled and show 'Atualizar Status' if status is not changed again
//       // And selectedStatus should be reset, making the button disabled again if it's back to the original status
//       expect(screen.getByRole('button', { name: /Atualizar Status/i })).toBeInTheDocument();
//       expect(screen.getByRole('button', { name: /Atualizar Status/i })).toBeDisabled();
//       expect(statusSelect.value).toBe('pending'); // Check if selectedStatus was reset
//     });

//     it('should display an error message if status update fails', async () => {
//       render(<DeliveryDetailsPage />);
//       const statusSelect = screen.getByLabelText(/Novo Status/i) as HTMLSelectElement;
//       const updateButton = screen.getByRole('button', { name: /Atualizar Status/i });

//       // Select a new status
//       fireEvent.change(statusSelect, { target: { value: 'not-found' } });

//       // Mock the API call to fail
//       const errorMessage = 'Invalid status transition';
//       mockUpdateDeliveryStatus.mockRejectedValue(new Error(errorMessage));

//       // Click the update button
//       fireEvent.click(updateButton);

//       // Wait for the error to be displayed
//       await waitFor(() => {
//         expect(mockUpdateDeliveryStatus).toHaveBeenCalledWith(mockDelivery.id, 'not-found');
//         expect(refetchDeliveryMock).not.toHaveBeenCalled(); // Ensure refetch is not called on error
//         expect(screen.getByText(`Failed to update delivery status: ${errorMessage}`)).toBeInTheDocument();
//       });
//     });

//     it('should handle API error response with a specific message', async () => {
//       render(<DeliveryDetailsPage />);
//       const statusSelect = screen.getByLabelText(/Novo Status/i) as HTMLSelectElement;
//       const updateButton = screen.getByRole('button', { name: /Atualizar Status/i });

//       fireEvent.change(statusSelect, { target: { value: 'canceled' } });

//       // Mock API to return an error with a specific message in response.data
//       const apiError = {
//         message: 'Cannot cancel delivered order',
//         response: {
//           data: { message: 'Cannot cancel delivered order' },
//           status: 400,
//           headers: {}, config: {}, request: {},
//         },
//         // Add the message property to the error object itself as well for broader handling
//         message: 'Request failed with status code 400',
//       };
//       mockUpdateDeliveryStatus.mockRejectedValue(apiError);

//       fireEvent.click(updateButton);

//       await waitFor(() => {
//         expect(mockUpdateDeliveryStatus).toHaveBeenCalledWith(mockDelivery.id, 'canceled');
//         expect(refetchDeliveryMock).not.toHaveBeenCalled();
//         expect(screen.getByText('Failed to update delivery status: Cannot cancel delivered order')).toBeInTheDocument();
//       });
//     });

//     it('should correctly set initial selectedStatus if delivery is loaded', () => {
//       render(<DeliveryDetailsPage />);
//       const statusSelect = screen.getByLabelText(/Novo Status/i) as HTMLSelectElement;
//       expect(statusSelect.value).toBe(mockDelivery.status);
//     });

//     it('should handle the case where delivery status is different from available options', () => {
//         // Mock a delivery with an unknown status
//         const deliveryWithUnknownStatus = { ...mockDelivery, status: 'shipped' };
//         mockUseDeliveryDetails.mockReturnValue({ delivery: deliveryWithUnknownStatus, loading: false, error: null, refetchDelivery: jest.fn() });

//         render(<DeliveryDetailsPage />);
//         const statusSelect = screen.getByLabelText(/Novo Status/i) as HTMLSelectElement;
//         // The select should default to the first option if the delivery status is not found in options,
//         // or if its value is not explicitly set. The current implementation sets it to delivery.status if it exists.
//         // So we expect it to be 'shipped' if that's the initial value, or if it's not in the options, it will be rendered.
//         // However, our current `deliveryStatusOptions` don't have 'shipped'.
//         // The `setSelectedStatus(delivery.status)` in useEffect will set it to 'shipped'.
//         // The select will display 'shipped' but it won't be a valid option in the dropdown display.
//         // For this test, we check if the *initial* value in the select element reflects the delivery status.
//         // The component's useEffect sets `selectedStatus` to `delivery.status`. The select element's value is controlled by `selectedStatus`.
//         expect(statusSelect.value).toBe('shipped'); // It should reflect the 'shipped' status

//         // Verify that the 'Update Status' button is disabled as 'shipped' is not a predefined option
//         // and thus the selectedStatus is unlikely to match any option value to enable the button.
//         // More accurately, it should be disabled if selectedStatus === delivery.status.
//         // Since delivery.status is 'shipped', and our initial selectedStatus is 'shipped', the button should be disabled.
//         expect(screen.getByRole('button', { name: /Atualizar Status/i })).toBeDisabled();
//     });

// });
