import { Router } from 'express';
import { logIn } from '../controllers/authController';

const router = Router();

// POST /api/auth/login
router.post('/login', logIn);

export default router;