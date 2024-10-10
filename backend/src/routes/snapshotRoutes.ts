import express from 'express';
import { createSnapshot } from '../controllers/dragAndDrop/snapshotController';

const router = express.Router();

// POST route to handle snapshot creation
router.post('/', createSnapshot);

export default router;
