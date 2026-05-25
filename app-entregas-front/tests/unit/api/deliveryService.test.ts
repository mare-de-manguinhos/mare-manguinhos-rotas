import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { deliveryService } from '../../../src/services/api/deliveryService';
import { Delivery } from '../../../src/types/delivery';

const mockDeliveries: Delivery[] = [
  {
    id: '1',
    clientName: 'Client One',
    addressSummary: '123 Main St',
    deliveryAddress: '123 Main St, Anytown, USA',
    clientPhone: '555-1111',
    status: 'pending',
  },
  {
    id: '2',
    clientName: 'Client Two',
    addressSummary: '456 Oak Ave',
    deliveryAddress: '456 Oak Ave, Otherville, USA',
    clientPhone: '555-2222',
    status: 'pending',
  },
];

const mockDetailedDelivery: Delivery = {
  id: '1',
  clientName: 'Client One',
  addressSummary: '123 Main St',
  deliveryAddress: '123 Main St, Anytown, USA, 12345',
  clientPhone: '555-1111',
  status: 'pending',
};

const handlers = [
  http.get('*/deliveries/pending', () => {
    return HttpResponse.json(mockDeliveries);
  }),
  http.get('*/deliveries/:id', ({ params }) => {
    const { id } = params;
    if (id === mockDetailedDelivery.id) {
      return HttpResponse.json(mockDetailedDelivery);
    }
    return new HttpResponse(null, { status: 404 });
  }),
  http.get('*/deliveries/error', () => {
    return new HttpResponse(null, { status: 500 });
  }),
];

const server = setupServer(...handlers);

describe('Delivery Service', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should fetch pending deliveries successfully', async () => {
    const deliveries = await deliveryService.getPendingDeliveries();
    expect(deliveries).toEqual(mockDeliveries.filter(d => d.status === 'pending'));
  });

  it('should handle errors when fetching pending deliveries', async () => {
    server.use(
      http.get('*/deliveries/pending', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(deliveryService.getPendingDeliveries()).rejects.toThrow(
      'Failed to fetch pending deliveries'
    );
  });

  it('should fetch delivery details successfully by ID', async () => {
    const delivery = await deliveryService.getDeliveryDetails(mockDetailedDelivery.id);
    expect(delivery).toEqual(mockDetailedDelivery);
  });

  it('should handle errors when fetching delivery details', async () => {
    server.use(
      http.get('*/deliveries/:id', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(deliveryService.getDeliveryDetails('non-existent-id')).rejects.toThrow(
      'Failed to fetch delivery details for ID non-existent-id'
    );
  });
});
