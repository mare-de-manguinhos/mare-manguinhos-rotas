import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { historyService } from '../../../src/services/api/historyService';
import { Delivery } from '../../../src/types/delivery';

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

const handlers = [
  http.get('*/deliveries/history', () => {
    return HttpResponse.json(mockHistory);
  }),
  http.get('*/deliveries/history-error', () => {
    return new HttpResponse(null, { status: 500 });
  }),
];

const server = setupServer(...handlers);

describe('History Service', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should fetch delivery history successfully', async () => {
    const history = await historyService.getDeliveryHistory();
    expect(history).toEqual(mockHistory);
  });

  it('should handle errors when fetching delivery history', async () => {
    server.use(
      http.get('*/deliveries/history', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(historyService.getDeliveryHistory()).rejects.toThrow(
      'Failed to fetch delivery history'
    );
  });
});
