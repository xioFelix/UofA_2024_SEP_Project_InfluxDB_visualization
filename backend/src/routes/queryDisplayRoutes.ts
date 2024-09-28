import { Router } from 'express';
import { getQuery } from '../controllers/queryDisplay'; // Adjust according to the actual path

const router = Router();
// POST route, used to generate a query string
router.post('/generate', getQuery);

export default router;
