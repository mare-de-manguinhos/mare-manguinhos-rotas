import { Router } from 'express';
import {
  getAllDeliveries,
  getDeliveryById,
  updateDeliveryStatus,
  createDelivery,
  updateDelivery,
  deleteDelivery,
} from '../controllers/deliveryController';

const router = Router();

// GET /api/deliveries?driverId=...
router.get('/', getAllDeliveries);

// GET /api/deliveries/:id
router.get('/:id', getDeliveryById);

// POST /api/deliveries
router.post('/', createDelivery);

// PUT /api/deliveries/:id
router.put('/:id', updateDelivery);

// PATCH /api/deliveries/:id/status
router.patch('/:id/status', updateDeliveryStatus);

// DELETE /api/deliveries/:id
router.delete('/:id', deleteDelivery);

export default router;
