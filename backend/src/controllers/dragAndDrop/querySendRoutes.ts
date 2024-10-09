import express from 'express';
import { generateQuery } from '../../controllers/dragAndDrop/querySentController';

const router = express.Router();

// POST route to handle query creation and dashboard generation
router.post('/', generateQuery);

export default router;
