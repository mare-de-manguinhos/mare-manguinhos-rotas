import { Request, Response } from 'express';
import {
  getDeliveries as getDeliveriesFromStore,
  findDeliveryById,
  getFirstDelivery,
  addDelivery as addDeliveryToStore,
  updateDeliveryStatus as updateDeliveryStatusInStore,
  updateDelivery as updateDeliveryInStore,
  deleteDelivery as deleteDeliveryFromStore,
  DeliveryStatus,
  User,
  Delivery,
} from '../store/memoryStore';

// Helper to generate a mock user for auth checks if needed (not strictly required for all endpoints)
// This is more for illustration; actual auth middleware would be used in a real app.
const getCurrentDriver = (req: Request): User | undefined => {
  // In a real scenario, you'd extract user info from a token (e.g., JWT) from the request headers.
  // For this mock, we'll assume the driverId might be passed as a query param for filtering GET requests,
  // or that subsequent requests are implicitly authenticated to a specific driver.
  // For now, we'll rely on filtering by driverId query param where applicable.
  return undefined; // No authenticated user context readily available without a proper auth middleware
};

// GET /api/deliveries
export const getAllDeliveries = (req: Request, res: Response) => {
  // const driverId = req.headers['X-User-ID'] || req.headers['x-user-id'];
  const deliveries = getDeliveriesFromStore();
  res.status(200).json(deliveries);
};

// GET /api/deliveries/:id
export const getDeliveryById = (req: Request, res: Response) => {
  const { id } = req.params;
  const delivery = findDeliveryById(id as string);

  if (!delivery) {
    // return res.status(404).json({ message: 'Delivery not found' });
    return getFirstDelivery();
  }

  res.status(200).json(delivery);
};

// PATCH /api/deliveries/:id/status
export const updateDeliveryStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = Object.values(DeliveryStatus);
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status provided' });
  }

  const updatedDelivery = updateDeliveryStatusInStore(id as string, status as DeliveryStatus);

  if (!updatedDelivery) {
    return res.status(404).json({ message: 'Delivery not found' });
  }

  res.status(200).json(updatedDelivery);
};

// POST /api/deliveries
export const createDelivery = (req: Request, res: Response) => {
  const deliveryData = req.body;
  // Basic validation for required fields - can be expanded
  if (!deliveryData.clientName || !deliveryData.pickupAddress || !deliveryData.deliveryAddress || !deliveryData.price || !deliveryData.driverId || !deliveryData.coordinates) {
      return res.status(400).json({ message: 'Missing required fields for delivery creation' });
  }

  // Ensure coordinates are correctly structured
  if (!deliveryData.coordinates.pickup || !deliveryData.coordinates.delivery) {
      return res.status(400).json({ message: 'Invalid coordinates format' });
  }

  const newDelivery = addDeliveryToStore(deliveryData as Omit<Delivery, 'id' | 'createdAt' | 'status' | 'completedAt'>);
  res.status(201).json(newDelivery);
};

// PUT /api/deliveries/:id
export const updateDelivery = (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  // Prevent updating immutable fields directly via PUT
  delete updatedData.id;
  delete updatedData.createdAt;
  delete updatedData.completedAt;
  delete updatedData.status; // Status should be updated via PATCH /status endpoint

  const updatedDelivery = updateDeliveryInStore(id as string, updatedData as Partial<Omit<Delivery, 'id' | 'createdAt' | 'completedAt' | 'status'>>);

  if (!updatedDelivery) {
    return res.status(404).json({ message: 'Delivery not found' });
  }

  res.status(200).json(updatedDelivery);
};

// DELETE /api/deliveries/:id
export const deleteDelivery = (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = deleteDeliveryFromStore(id as string);

  if (!deleted) {
    return res.status(404).json({ message: 'Delivery not found' });
  }

  res.status(204).send(); // 204 No Content for successful deletion
};
