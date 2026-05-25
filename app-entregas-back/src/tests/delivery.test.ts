import request from 'supertest';
import express from 'express';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import deliveryRoutes from '../routes/deliveryRoutes';

// Mocking the controllers and memoryStore for isolated testing

// Mock memoryStore
let mockDeliveries = [
  { id: '1', driverId: 'driver-abc', status: 'pending', coordinates: { lat: 10, lon: 20 } },
  { id: '2', driverId: 'driver-xyz', status: 'in_progress', coordinates: { lat: 30, lon: 40 } },
];

// Mock memoryStore methods that might be used by deliveryController
const mockMemoryStore = {
  getAll: jest.fn(() => Promise.resolve(mockDeliveries)),
  getById: jest.fn((id: string) => Promise.resolve(mockDeliveries.find(d => d.id === id))),
  create: jest.fn((data: Omit<typeof mockDeliveries[0], 'id'>) => {
    const newId = (mockDeliveries.length + 1).toString();
    const newDelivery = { id: newId, ...data };
    mockDeliveries.push(newDelivery);
    return Promise.resolve(newDelivery);
  }),
  update: jest.fn((id: string, data: Object) => {
    const index = mockDeliveries.findIndex(d => d.id === id);
    if (index !== -1) {
      mockDeliveries[index] = { ...mockDeliveries[index], ...data };
      return Promise.resolve(mockDeliveries[index]);
    } else {
      return Promise.resolve(null);
    }
  }),
  delete: jest.fn((id: string) => {
    const initialLength = mockDeliveries.length;
    mockDeliveries = mockDeliveries.filter(d => d.id !== id);
    return Promise.resolve(initialLength > mockDeliveries.length);
  }),
  // Method to reset the store for tests
  reset: () => {
    mockDeliveries = [
      { id: '1', driverId: 'driver-abc', status: 'pending', coordinates: { lat: 10, lon: 20 } },
      { id: '2', driverId: 'driver-xyz', status: 'in_progress', coordinates: { lat: 30, lon: 40 } },
    ];
  }
};

// Mock the deliveryController functions by replacing them with controlled mocks
jest.mock('../controllers/deliveryController', () => ({
  getAllDeliveries: jest.fn((req: any, res: any, next: any) => {
    // Simulate controller logic calling memoryStore and responding
    const driverId = req.query.driverId;
    const deliveries = driverId ? mockDeliveries.filter(d => d.driverId === driverId) : mockDeliveries;
    res.status(200).json(deliveries);
  }),
  getDeliveryById: jest.fn((req: any, res: any, next: any) => {
    const { id } = req.params;
    const delivery = mockDeliveries.find(d => d.id === id);
    if (delivery) {
      res.status(200).json(delivery);
    } else {
      res.status(404).json({ message: 'Delivery not found' });
    }
  }),
  createDelivery: jest.fn(async (req: any, res: any, next: any) => {
    const { driverId, status, coordinates } = req.body;
    // Basic validation as per plan
    if (!driverId || !status || !coordinates || !coordinates.lat || !coordinates.lon) {
      return res.status(400).json({ message: 'Missing required fields: driverId, status, coordinates' });
    }
    if (!['pending', 'in_progress', 'delivered'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }
    // Mocking uuid generation for the new ID
    const newId = (await mockMemoryStore.create({ driverId, status, coordinates })).id; // Assuming create returns the new delivery object with id
    res.status(201).json(newId); // Return the new ID
  }),
  updateDelivery: jest.fn((req: any, res: any, next: any) => {
    const { id } = req.params;
    const dataToUpdate = req.body;
    // Basic validation for PUT
    if (dataToUpdate.status && !['pending', 'in_progress', 'delivered'].includes(dataToUpdate.status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }
    const updatedDelivery = mockMemoryStore.update(id, dataToUpdate);
    if (updatedDelivery) {
      res.status(200).json(updatedDelivery);
    } else {
      res.status(404).json({ message: 'Delivery not found' });
    }
  }),
  updateDeliveryStatus: jest.fn(async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    if (!['pending', 'in_progress', 'delivered'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }
    const updatedDelivery = await mockMemoryStore.update(id, { status });
    if (updatedDelivery) {
      res.status(200).json(updatedDelivery);
    } else {
      res.status(404).json({ message: 'Delivery not found' });
    }
  }),
  deleteDelivery: jest.fn(async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const deleted = await mockMemoryStore.delete(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Delivery not found' });
    }
  }),
}));

// Re-require deliveryRoutes AFTER the mocks are set up
const mockedDeliveryRoutes = require('../routes/deliveryRoutes').default;

const app = express();
app.use(express.json());
// Mount the delivery routes
app.use('/api/deliveries', mockedDeliveryRoutes);

describe('Delivery Endpoints Integration Tests', () => {
  // Reset the store before each test
  beforeEach(() => {
    mockMemoryStore.reset();
    // Clear all mocks used in controllers
    jest.clearAllMocks();
    // Ensure the controller mocks are re-applied or their implementations are reset
    // The mocked methods are defined within the jest.mock block, so they should be fine
    // unless they are re-defined in the tests. Here, we are using jest.fn() within the mock setup,
    // so clearing them is appropriate.
    
    // Re-access the mocked functions to clear them
    const mockControllerModule = require('../controllers/deliveryController');
    mockControllerModule.getAllDeliveries.mockClear();
    mockControllerModule.getDeliveryById.mockClear();
    mockControllerModule.createDelivery.mockClear();
    mockControllerModule.updateDelivery.mockClear();
    mockControllerModule.updateDeliveryStatus.mockClear();
    mockControllerModule.deleteDelivery.mockClear();
  });

  // GET /api/deliveries
  it('GET /api/deliveries - should return all deliveries', async () => {
    const response = await request(app).get('/api/deliveries');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(mockDeliveries.length);
    expect(response.body[0]).toHaveProperty('id', '1');
  });

  // GET /api/deliveries?driverId=...
  it('GET /api/deliveries - should return deliveries for a specific driver', async () => {
    const response = await request(app).get('/api/deliveries?driverId=driver-abc');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('driverId', 'driver-abc');
  });

  // GET /api/deliveries/:id
  it('GET /api/deliveries/:id - should return a single delivery by ID', async () => {
    const response = await request(app).get('/api/deliveries/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', '1');
  });

  it('GET /api/deliveries/:id - should return 404 if delivery not found', async () => {
    const response = await request(app).get('/api/deliveries/999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Delivery not found');
  });

  // POST /api/deliveries
  it('POST /api/deliveries - should create a new delivery', async () => {
    const newDeliveryData = {
      driverId: 'driver-new',
      status: 'pending',
      coordinates: { lat: 50, lon: 60 }
    };
    const response = await request(app).post('/api/deliveries').send(newDeliveryData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id'); // Expecting the ID of the created delivery
    expect(response.body.id).toBeDefined();
    // Verify the delivery was added to the store (indirectly)
    const createdDelivery = await mockMemoryStore.getById(response.body.id);
    expect(createdDelivery).toBeDefined();
    if (createdDelivery) {
      expect(createdDelivery.driverId).toBe('driver-new');
    }
  });

  it('POST /api/deliveries - should return 400 if required fields are missing', async () => {
    const invalidData = {
      driverId: 'driver-new'
      // Missing status and coordinates
    };
    const response = await request(app).post('/api/deliveries').send(invalidData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Missing required fields: driverId, status, coordinates');
  });

  it('POST /api/deliveries - should return 400 for invalid status', async () => {
    const invalidData = {
      driverId: 'driver-new',
      status: 'invalid-status',
      coordinates: { lat: 50, lon: 60 }
    };
    const response = await request(app).post('/api/deliveries').send(invalidData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid status value');
  });

  // PUT /api/deliveries/:id
  it('PUT /api/deliveries/:id - should update an existing delivery', async () => {
    const updateData = {
      status: 'in_progress',
      coordinates: { lat: 55, lon: 65 }
    };
    const response = await request(app).put('/api/deliveries/1').send(updateData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', '1');
    expect(response.body.status).toBe('in_progress');
    expect(response.body.coordinates).toEqual({ lat: 55, lon: 65 });
  });

  it('PUT /api/deliveries/:id - should return 404 if delivery not found for update', async () => {
    const updateData = { status: 'delivered' };
    const response = await request(app).put('/api/deliveries/999').send(updateData);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Delivery not found');
  });

  it('PUT /api/deliveries/:id - should return 400 for invalid status on update', async () => {
    const updateData = { status: 'invalid-status' };
    const response = await request(app).put('/api/deliveries/1').send(updateData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid status value');
  });

  // PATCH /api/deliveries/:id/status
  it('PATCH /api/deliveries/:id/status - should update delivery status', async () => {
    const updateData = { status: 'delivered' };
    const response = await request(app).patch('/api/deliveries/1/status').send(updateData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', '1');
    expect(response.body.status).toBe('delivered');
  });

  it('PATCH /api/deliveries/:id/status - should return 404 if delivery not found for status update', async () => {
    const updateData = { status: 'delivered' };
    const response = await request(app).patch('/api/deliveries/999/status').send(updateData);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Delivery not found');
  });

  it('PATCH /api/deliveries/:id/status - should return 400 for missing status in patch request', async () => {
    const response = await request(app).patch('/api/deliveries/1/status').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Status is required');
  });

  it('PATCH /api/deliveries/:id/status - should return 400 for invalid status value in patch request', async () => {
    const updateData = { status: 'invalid-status' };
    const response = await request(app).patch('/api/deliveries/1/status').send(updateData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid status value');
  });

  // DELETE /api/deliveries/:id
  it('DELETE /api/deliveries/:id - should delete a delivery', async () => {
    const response = await request(app).delete('/api/deliveries/1');
    expect(response.status).toBe(204);
    // Verify deletion indirectly
    const deletedDelivery = await mockMemoryStore.getById('1');
    expect(deletedDelivery).toBeUndefined();
  });

  it('DELETE /api/deliveries/:id - should return 404 if delivery not found for deletion', async () => {
    const response = await request(app).delete('/api/deliveries/999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Delivery not found');
  });
});
