// /// <reference types="jest" />

// import { deliveryService } from '../../../services/api/deliveryService';
// import api from '../../../services/api/base';

// // Mock the api object
// jest.mock('../../../services/api/base');

// const mockedApi = api as jest.Mocked<typeof api>;

// describe('deliveryService', () => {
//   beforeEach(() => {
//     // Reset mocks before each test
//     mockedApi.get.mockClear();
//     mockedApi.patch.mockClear();
//   });

//   describe('getPendingDeliveries', () => {
//     it('should fetch pending deliveries successfully', async () => {
//       const mockDeliveries = [
//         { id: '1', clientName: 'John Doe', deliveryAddress: '123 Main St', status: 'pending' },
//         { id: '2', clientName: 'Jane Smith', deliveryAddress: '456 Oak Ave', status: 'pending' },
//       ];
//       mockedApi.get.mockResolvedValue({ data: mockDeliveries });

//       const deliveries = await deliveryService.getPendingDeliveries();

//       expect(mockedApi.get).toHaveBeenCalledWith('/api/deliveries/pending');
//       expect(deliveries).toEqual(mockDeliveries);
//     });

//     it('should throw an error if fetching pending deliveries fails', async () => {
//       mockedApi.get.mockRejectedValue(new Error('Network Error'));

//       await expect(deliveryService.getPendingDeliveries()).rejects.toThrow('Failed to fetch pending deliveries');
//       expect(mockedApi.get).toHaveBeenCalledWith('/api/deliveries/pending');
//     });
//   });

//   describe('getAllDeliveries', () => {
//     it('should fetch all deliveries successfully', async () => {
//       const mockDeliveries = [
//         { id: '1', clientName: 'John Doe', deliveryAddress: '123 Main St', status: 'delivered' },
//         { id: '2', clientName: 'Jane Smith', deliveryAddress: '456 Oak Ave', status: 'pending' },
//       ];
//       mockedApi.get.mockResolvedValue({ data: mockDeliveries });

//       const deliveries = await deliveryService.getAllDeliveries();

//       expect(mockedApi.get).toHaveBeenCalledWith('/api/deliveries');
//       expect(deliveries).toEqual(mockDeliveries);
//     });

//     it('should throw an error if fetching all deliveries fails', async () => {
//       mockedApi.get.mockRejectedValue(new Error('Network Error'));

//       await expect(deliveryService.getAllDeliveries()).rejects.toThrow('Failed to fetch all deliveries');
//       expect(mockedApi.get).toHaveBeenCalledWith('/api/deliveries');
//     });
//   });

//   describe('getDeliveryDetails', () => {
//     it('should fetch delivery details successfully', async () => {
//       const deliveryId = '1';
//       const mockDelivery = {
//         id: deliveryId,
//         clientName: 'John Doe',
//         deliveryAddress: '123 Main St, Anytown',
//         clientPhone: '555-1234',
//         status: 'pending',
//       };
//       mockedApi.get.mockResolvedValue({ data: mockDelivery });

//       const delivery = await deliveryService.getDeliveryDetails(deliveryId);

//       expect(mockedApi.get).toHaveBeenCalledWith(`/api/deliveries/${deliveryId}`);
//       expect(delivery).toEqual(mockDelivery);
//     });

//     it('should throw an error if fetching delivery details fails', async () => {
//       const deliveryId = '1';
//       mockedApi.get.mockRejectedValue(new Error('Delivery not found'));

//       await expect(deliveryService.getDeliveryDetails(deliveryId)).rejects.toThrow(`Failed to fetch delivery details for ID ${deliveryId}`);
//       expect(mockedApi.get).toHaveBeenCalledWith(`/api/deliveries/${deliveryId}`);
//     });
//   });

//   describe('updateDeliveryStatus', () => {
//     const deliveryId = 'test-delivery-id';
//     const newStatus = 'delivered';
//     const mockUpdatedDelivery = {
//       id: deliveryId,
//       clientName: 'Test Client',
//       deliveryAddress: 'Test Address',
//       clientPhone: '111-2222',
//       status: newStatus,
//     };

//     it('should update delivery status successfully', async () => {
//       mockedApi.patch.mockResolvedValue({ data: mockUpdatedDelivery });

//       const updatedDelivery = await deliveryService.updateDeliveryStatus(deliveryId, newStatus);

//       expect(mockedApi.patch).toHaveBeenCalledWith(`/api/deliveries/${deliveryId}/status`, { status: newStatus });
//       expect(updatedDelivery).toEqual(mockUpdatedDelivery);
//     });

//     it('should throw an error if the API call fails', async () => {
//       const errorMessage = 'Failed to update status';
//       mockedApi.patch.mockRejectedValue(new Error(errorMessage));

//       await expect(deliveryService.updateDeliveryStatus(deliveryId, newStatus)).rejects.toThrow(`Failed to update delivery status: ${errorMessage}`);
//       expect(mockedApi.patch).toHaveBeenCalledWith(`/api/deliveries/${deliveryId}/status`, { status: newStatus });
//     });

//     it('should throw an error with a specific message if the API response contains one', async () => {
//       const apiErrorMessage = {
//         message: 'Invalid status transition',
//         details: 'Cannot transition from delivered to pending.'
//       };
//       // Mocking a response with a specific error structure
//       const errorResponse = {
//         response: {
//           data: apiErrorMessage,
//           status: 400,
//           headers: {},
//           config: {},
//           request: {},
//         },
//         message: 'Request failed with status code 400'
//       };
//       mockedApi.patch.mockRejectedValue(errorResponse);

//       await expect(deliveryService.updateDeliveryStatus(deliveryId, newStatus)).rejects.toThrow(`Failed to update delivery status: ${apiErrorMessage.message}`);
//       expect(mockedApi.patch).toHaveBeenCalledWith(`/api/deliveries/${deliveryId}/status`, { status: newStatus });
//     });

//     it('should throw an error with a generic message if API error is unexpected', async () => {
//       // Mocking a generic error without a specific response structure
//       mockedApi.patch.mockRejectedValue({ message: 'Some other error' });

//       await expect(deliveryService.updateDeliveryStatus(deliveryId, newStatus)).rejects.toThrow('Failed to update delivery status: Some other error');
//       expect(mockedApi.patch).toHaveBeenCalledWith(`/api/deliveries/${deliveryId}/status`, { status: newStatus });
//     });
//   });
// });
