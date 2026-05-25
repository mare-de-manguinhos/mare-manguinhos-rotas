import { useState, useEffect, useCallback } from 'react';
import { historyService } from '../services/api/historyService';
import type { Delivery, FilterBy, SortBy } from '../types/delivery';

export function useDeliveryHistory(sortBy: SortBy = 'none', filterBy: FilterBy = 'TODAS') {
  const [history, setHistory] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filterHistory = useCallback((historyToFilter: Delivery[]): Delivery[] => {
    if (filterBy === 'TODAS') return historyToFilter;
    return historyToFilter.filter(delivery => delivery.status === filterBy);
  }, [filterBy]);

  const sortHistory = useCallback((historyToSort: Delivery[]): Delivery[] => {
    if (sortBy === 'none') return historyToSort;

    return [...historyToSort].sort((a, b) => {
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      } else if (sortBy === 'clientName') {
        return a.clientName.localeCompare(b.clientName);
      }
      return 0;
    });
  }, [sortBy]);

  const fetchDeliveryHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await historyService.getDeliveryHistory();
      const filteredData = filterHistory(data);
      setHistory(sortHistory(filteredData));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch delivery history');
      setHistory([]); // Clear history on error
    } finally {
      setLoading(false);
    }
  }, [filterHistory, sortHistory]);

  useEffect(() => {
    fetchDeliveryHistory();
  }, [fetchDeliveryHistory]);

  return {
    history,
    loading,
    error,
    fetchDeliveryHistory,
  };
}
