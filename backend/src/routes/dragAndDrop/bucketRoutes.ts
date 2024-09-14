import express from 'express';
import { fetchBuckets, fetchMeasurementsByBucket } from '../../controllers/dragAndDrop/bucketController';

const router = express.Router();

// Route to get measurements for the selected bucket
router.post('/', fetchBuckets);

router.post('/measurements', fetchMeasurementsByBucket);

export default router;
