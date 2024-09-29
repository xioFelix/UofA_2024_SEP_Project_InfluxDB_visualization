import express from 'express';
import { fetchFieldsByMeasurement } from '../..//controllers/dragAndDrop/measurementController';

const router = express.Router();

// Route to fetch fields based on measurement
router.post('/fields', fetchFieldsByMeasurement);

export default router;
