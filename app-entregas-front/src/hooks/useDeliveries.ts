import { useCallback, useEffect, useState } from "react";
import type { Delivery, FilterBy, SortBy } from "../types/delivery";
import { deliveryService } from "../services/api/deliveryService";

const ACTIVE_STATUSES = ['PENDENTE', 'SAIU_PARA_ENTREGA'];

export function useDeliveries(sortBy: SortBy = 'none', filterBy: FilterBy = 'TODAS') {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const processDeliveries = useCallback(
    (raw: Delivery[]): Delivery[] => {
      let result = raw.filter(d => ACTIVE_STATUSES.includes(d.status));

      if (filterBy !== 'TODAS') {
        result = result.filter(d => d.status === filterBy);
      }

      if (sortBy !== 'none') {
        result = [...result].sort((a, b) => {
          if (sortBy === 'status') return a.status.localeCompare(b.status);
          if (sortBy === 'clientName') return a.clientName.localeCompare(b.clientName);
          return 0;
        });
      }

      return result;
    },
    [sortBy, filterBy]
  );

  const fetchDeliveries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await deliveryService.getAllDeliveries();
      setDeliveries(processDeliveries(data));
    } catch (err: any) {
      setError(err.message || 'Falha ao buscar entregas');
      setDeliveries([]);
    } finally {
      setLoading(false);
    }
  }, [processDeliveries]);

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  const pullToRefresh = useCallback(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  return { deliveries, loading, error, fetchDeliveries, pullToRefresh };
}
