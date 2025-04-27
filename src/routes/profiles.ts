import { Router } from "express";
import { protect } from '../middleware/auth_middleware';

const router = Router();

router.get('/profile', protect, (req, res) => {
    res.json({ message: `Hola, usuario con id ${req.user?.id}`});
});

export default router;