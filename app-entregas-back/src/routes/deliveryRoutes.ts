import { Router } from 'express';
import {
  getAllDeliveries,
  getDeliveryHistory,
  getPendingDeliveries,
  getDeliveryById,
  updateDeliveryStatus,
  createDelivery,
  updateDelivery,
  deleteDelivery,
} from '../controllers/deliveryController';

const router = Router();

// Specific routes must come before parameterized /:id routes
router.get('/history', getDeliveryHistory);
router.get('/pending', getPendingDeliveries);

router.get('/', getAllDeliveries);
router.get('/:id', getDeliveryById);
router.post('/', createDelivery);
router.put('/:id', updateDelivery);
router.patch('/:id/status', updateDeliveryStatus);
router.delete('/:id', deleteDelivery);

export default router;
