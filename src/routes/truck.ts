import { Router } from 'express';
import { protect } from '../middleware/auth_middleware';
import { createTruck, getTrucks, updateTruck, deleteTruck } from '../controllers/truck';

const router = Router();

router.post('/', protect, createTruck);
router.get('/', protect, getTrucks);
router.put('/:id', protect, updateTruck);
router.delete('/:id', protect, deleteTruck);

export default router;     