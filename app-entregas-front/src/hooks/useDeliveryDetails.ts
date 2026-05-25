import { useState, useEffect, useCallback } from 'react';
import { deliveryService } from '../services/api/deliveryService';
import type { Delivery } from '../types/delivery';

export function useDeliveryDetails(deliveryId: string) {
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeliveryDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await deliveryService.getDeliveryDetails(deliveryId);
      setDelivery(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch delivery details');
      setDelivery(null);
    } finally {
      setLoading(false);
    }
  }, [deliveryId]); // Dependency array includes deliveryId

  useEffect(() => {
    if (deliveryId) {
      fetchDeliveryDetails();
    } else {
      setLoading(false);
    }
  }, [deliveryId, fetchDeliveryDetails]); // Added fetchDeliveryDetails to dependencies

  return {
    delivery,
    loading,
    error,
    refetchDelivery: fetchDeliveryDetails, // Export the refetch function
  };
}
