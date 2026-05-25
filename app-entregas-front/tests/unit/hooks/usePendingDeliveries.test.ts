import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePendingDeliveries } from '../../../src/hooks/usePendingDeliveries';
import { deliveryService } from '../../../src/services/api/deliveryService';
import { Delivery } from '../../../src/types/delivery';

const mockDeliveries: Delivery[] = [
  {
    id: '1',
    clientName: 'Client One',
    addressSummary: '123 Main St',
    status: 'pending',
  },
  {
    id: '2',
    clientName: 'Client Two',
    addressSummary: '456 Oak Ave',
    status: 'pending',
  },
];

describe('usePendingDeliveries Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(deliveryService, 'getPendingDeliveries').mockResolvedValue(mockDeliveries);
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => usePendingDeliveries());
    expect(result.current.deliveries).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should fetch pending deliveries on mount', async () => {
    const { result } = renderHook(() => usePendingDeliveries());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.deliveries).toEqual(mockDeliveries);
      expect(result.current.error).toBeNull();
    });
    expect(deliveryService.getPendingDeliveries).toHaveBeenCalledTimes(1);
  });

  it('should handle error when fetching pending deliveries', async () => {
    vi.spyOn(deliveryService, 'getPendingDeliveries').mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => usePendingDeliveries());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.deliveries).toEqual([]);
      expect(result.current.error).toBe('API Error');
    });
  });

  it('should re-fetch deliveries on pullToRefresh', async () => {
    const { result } = renderHook(() => usePendingDeliveries());

    // Wait for initial fetch to complete
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Clear mock to count subsequent calls
    vi.clearAllMocks();
    vi.spyOn(deliveryService, 'getPendingDeliveries').mockResolvedValue(mockDeliveries);

    result.current.pullToRefresh();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.deliveries).toEqual(mockDeliveries);
    });
    expect(deliveryService.getPendingDeliveries).toHaveBeenCalledTimes(1);
  });
});
