import { Router } from "express";
import { protect } from "../middleware/auth_middleware";
import { createOrder, getOrders, updateOrderStatus } from '../controllers/order';

const router = Router();

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.put('/:id/status', protect, updateOrderStatus);

export default router;