import { Request, Response } from 'express';
import {
  getDeliveries as getDeliveriesFromStore,
  getDeliveryHistory as getDeliveryHistoryFromStore,
  getPendingDeliveries as getPendingDeliveriesFromStore,
  findDeliveryById,
  addDelivery as addDeliveryToStore,
  updateDeliveryStatus as updateDeliveryStatusInStore,
  updateDelivery as updateDeliveryInStore,
  deleteDelivery as deleteDeliveryFromStore,
  DeliveryStatus,
  Delivery,
} from '../store/memoryStore';

const getDriverIdFromRequest = (req: Request): string | undefined => {
  return (req.headers['x-user-id'] as string) || (req.query.driverId as string) || undefined;
};

// GET /api/deliveries
export const getAllDeliveries = (req: Request, res: Response) => {
  const driverId = getDriverIdFromRequest(req);
  const deliveries = getDeliveriesFromStore(driverId);
  res.status(200).json(deliveries);
};

// GET /api/deliveries/history
export const getDeliveryHistory = (req: Request, res: Response) => {
  const driverId = getDriverIdFromRequest(req);
  const history = getDeliveryHistoryFromStore(driverId);
  res.status(200).json(history);
};

// GET /api/deliveries/pending
export const getPendingDeliveries = (req: Request, res: Response) => {
  const driverId = getDriverIdFromRequest(req);
  const pending = getPendingDeliveriesFromStore(driverId);
  res.status(200).json(pending);
};

// GET /api/deliveries/:id
export const getDeliveryById = (req: Request, res: Response) => {
  const { id } = req.params;
  const delivery = findDeliveryById(id as string);

  if (!delivery) {
    return res.status(404).json({ message: 'Delivery not found' });
  }

  res.status(200).json(delivery);
};

// PATCH /api/deliveries/:id/status
export const updateDeliveryStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = Object.values(DeliveryStatus);
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status provided', validStatuses });
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

  if (
    !deliveryData.clientName ||
    !deliveryData.pickupAddress ||
    !deliveryData.deliveryAddress ||
    !deliveryData.price ||
    !deliveryData.driverId ||
    !deliveryData.coordinates
  ) {
    return res.status(400).json({ message: 'Missing required fields for delivery creation' });
  }

  if (!deliveryData.coordinates.pickup || !deliveryData.coordinates.delivery) {
    return res.status(400).json({ message: 'Invalid coordinates format' });
  }

  const newDelivery = addDeliveryToStore(
    deliveryData as Omit<Delivery, 'id' | 'createdAt' | 'status' | 'completedAt'>
  );
  res.status(201).json(newDelivery);
};

// PUT /api/deliveries/:id
export const updateDelivery = (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  delete updatedData.id;
  delete updatedData.createdAt;
  delete updatedData.completedAt;
  delete updatedData.status;

  const updatedDelivery = updateDeliveryInStore(
    id as string,
    updatedData as Partial<Omit<Delivery, 'id' | 'createdAt' | 'completedAt' | 'status'>>
  );

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

  res.status(204).send();
};
