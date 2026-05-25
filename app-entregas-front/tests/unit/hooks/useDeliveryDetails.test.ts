import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDeliveryDetails } from '../../../src/hooks/useDeliveryDetails';
import { deliveryService } from '../../../src/services/api/deliveryService';
import { Delivery } from '../../../src/types/delivery';

// Mock the deliveryService
vi.mock('../../../src/services/api/deliveryService', () => ({
  deliveryService: {
    getDeliveryDetails: vi.fn(),
  },
}));

const mockDetailedDelivery: Delivery = {
  id: 'delivery-123',
  clientName: 'Client Test',
  addressSummary: '123 Test St',
  deliveryAddress: '123 Test St, Test City, TS 12345',
  clientPhone: '555-0000',
  status: 'pending',
};

describe('useDeliveryDetails Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useDeliveryDetails('some-id'));
    expect(result.current.delivery).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should fetch delivery details successfully', async () => {
    (deliveryService.getDeliveryDetails as ReturnType<typeof vi.fn>).mockResolvedValue(mockDetailedDelivery);

    const { result } = renderHook(() => useDeliveryDetails(mockDetailedDelivery.id));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.delivery).toEqual(mockDetailedDelivery);
      expect(result.current.error).toBeNull();
    });
    expect(deliveryService.getDeliveryDetails).toHaveBeenCalledWith(mockDetailedDelivery.id);
  });

  it('should handle error when fetching delivery details', async () => {
    const errorMessage = 'Failed to fetch delivery details';
    (deliveryService.getDeliveryDetails as ReturnType<typeof vi.fn>).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useDeliveryDetails('non-existent-id'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.delivery).toBeNull();
      expect(result.current.error).toBe(errorMessage);
    });
    expect(deliveryService.getDeliveryDetails).toHaveBeenCalledWith('non-existent-id');
  });

  it('should not fetch if deliveryId is empty', async () => {
    (deliveryService.getDeliveryDetails as ReturnType<typeof vi.fn>).mockResolvedValue(mockDetailedDelivery);

    const { result } = renderHook(() => useDeliveryDetails(''));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(deliveryService.getDeliveryDetails).not.toHaveBeenCalled();
    expect(result.current.delivery).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
