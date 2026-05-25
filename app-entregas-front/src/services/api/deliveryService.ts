import type { Delivery, DeliveryStatus } from '../../types/delivery';
import api from './base';

/**
 * Service for interacting with delivery-related API endpoints.
 */
export const deliveryService = {
  /**
   * Fetches a list of pending deliveries.
   * @returns {Promise<Delivery[]>} A promise that resolves to an array of pending deliveries.
   * @throws {Error} If the API call fails.
   */
  getPendingDeliveries: async (): Promise<Delivery[]> => {
    try {
      const response = await api.get<Delivery[]>('/api/deliveries/pending');
      return response.data;
    } catch (error) {
      console.error('Error fetching pending deliveries:', error);
      throw new Error('Failed to fetch pending deliveries');
    }
  },

  /**
   * Fetches a list of all deliveries.
   * @returns {Promise<Delivery[]>} A promise that resolves to an array of all deliveries.
   * @throws {Error} If the API call fails.
   */
  getAllDeliveries: async (): Promise<Delivery[]> => {
    try {
      const response = await api.get<Delivery[]>('/api/deliveries');
      return response.data;
    } catch (error) {
      console.error('Error fetching all deliveries:', error);
      throw new Error('Failed to fetch all deliveries');
    }
  },

  /**
   * Fetches the detailed information for a specific delivery by its ID.
   * @param {string} id - The ID of the delivery to fetch.
   * @returns {Promise<Delivery>} A promise that resolves to the detailed delivery object.
   * @throws {Error} If the API call fails or the delivery is not found.
   */
  getDeliveryDetails: async (id: string): Promise<Delivery> => {
    try {
      const response = await api.get<Delivery>(`/api/deliveries/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching delivery details for ID ${id}:`, error);
      throw new Error(`Failed to fetch delivery details for ID ${id}`);
    }
  },

  /**
   * Updates the status of a specific delivery.
   * @param {string} deliveryId - The ID of the delivery to update.
   * @param {DeliveryStatus} newStatus - The new status for the delivery.
   * @returns {Promise<Delivery>} A promise that resolves to the updated delivery object.
   * @throws {Error} If the API call fails.
   */
  updateDeliveryStatus: async (deliveryId: string, newStatus: DeliveryStatus): Promise<Delivery> => {
    try {
      const response = await api.patch<Delivery>(`/api/deliveries/${deliveryId}/status`, { status: newStatus });
      return response.data;
    } catch (error: any) {
      console.error(`Error updating status for delivery ID ${deliveryId} to ${newStatus}:`, error);
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
      throw new Error(`Failed to update delivery status: ${errorMessage}`);
    }
  },
};
