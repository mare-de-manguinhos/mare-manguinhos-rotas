import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDeliveryHistory } from '../../../src/hooks/useDeliveryHistory';
import { historyService } from '../../../src/services/api/historyService';
import { Delivery } from '../../../src/types/delivery';

// Mock the historyService
vi.mock('../../../src/services/api/historyService', () => ({
  historyService: {
    getDeliveryHistory: vi.fn(),
  },
}));

const mockHistory: Delivery[] = [
  {
    id: 'h1',
    clientName: 'History Client One',
    addressSummary: '789 History Ave',
    deliveryAddress: '789 History Ave, Oldtown, USA, 98765',
    status: 'delivered',
  },
  {
    id: 'h2',
    clientName: 'History Client Two',
    addressSummary: '321 Past Rd',
    deliveryAddress: '321 Past Rd, Oldtown, USA, 98765',
    status: 'delivered',
  },
];

describe('useDeliveryHistory Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (historyService.getDeliveryHistory as ReturnType<typeof vi.fn>).mockResolvedValue(mockHistory);
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useDeliveryHistory());
    expect(result.current.history).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should fetch delivery history on mount', async () => {
    const { result } = renderHook(() => useDeliveryHistory());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.history).toEqual(mockHistory);
      expect(result.current.error).toBeNull();
    });
    expect(historyService.getDeliveryHistory).toHaveBeenCalledTimes(1);
  });

  it('should handle error when fetching delivery history', async () => {
    const errorMessage = 'Failed to fetch delivery history';
    (historyService.getDeliveryHistory as ReturnType<typeof vi.fn>).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useDeliveryHistory());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.history).toEqual([]);
      expect(result.current.error).toBe(errorMessage);
    });
  });

  it('should re-fetch history on fetchDeliveryHistory call', async () => {
    const { result } = renderHook(() => useDeliveryHistory());

    // Wait for initial fetch to complete
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Clear mock to count subsequent calls
    vi.clearAllMocks();
    (historyService.getDeliveryHistory as ReturnType<typeof vi.fn>).mockResolvedValue(mockHistory);

    result.current.fetchDeliveryHistory();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.history).toEqual(mockHistory);
    });
    expect(historyService.getDeliveryHistory).toHaveBeenCalledTimes(1);
  });
});
