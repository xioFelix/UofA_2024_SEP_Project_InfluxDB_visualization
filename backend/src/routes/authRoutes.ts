import { Router } from 'express';
import { logIn } from '../controllers/authController';

const router = Router();

router.post('/login', logIn);

export default router;