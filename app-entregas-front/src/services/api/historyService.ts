import api from './base';
import type { Delivery } from '../../types/delivery';

export const historyService = {
  getDeliveryHistory: async (): Promise<Delivery[]> => {
    try {
      const response = await api.get<Delivery[]>('/api/deliveries/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching delivery history:', error);
      throw new Error('Failed to fetch delivery history');
    }
  },
};
