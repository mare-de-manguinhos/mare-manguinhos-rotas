import { useCallback, useEffect, useState } from "react";
import type { Delivery, SortBy } from "../types/delivery";
import { deliveryService } from "../services/api/deliveryService";

/**
 * Custom hook for managing pending deliveries state, including fetching, sorting, and refresh functionality.
 * @param {SortBy} [sortBy='none'] - The criteria to sort deliveries by.
 * @returns {{ deliveries: Delivery[], loading: boolean, error: string | null, fetchDeliveries: () => Promise<void>, pullToRefresh: () => void }}
 */
export function useDeliveries(sortBy: SortBy = 'none', _filterBy: string) {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const sortDeliveries = useCallback((deliveriesToSort: Delivery[]): Delivery[] => {
    if (sortBy === 'none') return deliveriesToSort;

    return [...deliveriesToSort].sort((a, b) => {
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      } else if (sortBy === 'clientName') {
        return a.clientName.localeCompare(b.clientName);
      }
      return 0;
    });
  }, [sortBy]);

  const fetchDeliveries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await deliveryService.getAllDeliveries();
      setDeliveries(sortDeliveries(data));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch all deliveries');
      setDeliveries([]); // Clear deliveries on error
    } finally {
      setLoading(false);
    }
  }, [sortDeliveries]);

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  const pullToRefresh = useCallback(() => {
    // This will trigger a re-fetch of deliveries
    fetchDeliveries();
  }, [fetchDeliveries]);

  return {
    deliveries,
    loading,
    error,
    fetchDeliveries,
    pullToRefresh,
  };
}
