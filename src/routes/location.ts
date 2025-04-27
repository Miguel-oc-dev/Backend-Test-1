import { Router } from "express";
import { protect } from "../middleware/auth_middleware";
import { createLocation, getLocations, deleteLocation } from '../controllers/location';

const router = Router();

router.post('/', protect, createLocation);
router.get('/', protect, getLocations);
router.delete('/:id/status', protect, deleteLocation);

export default router;     