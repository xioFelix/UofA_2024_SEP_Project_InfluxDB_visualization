import { Request, Response } from 'express';
import { verifyTokenAndGetBuckets, getMeasurements } from '../../services/influxDBService';

// Controller to verify token and fetch buckets
export const fetchBuckets = async (req: Request, res: Response) => {
  const { token } = req.body;
  console.log('Token received:', token);  // Log the token

  if (!token) {
    console.log('No token provided');
    return res.status(400).json({ message: 'API token is required' });
  }

  try {
    const buckets = await verifyTokenAndGetBuckets(token);
    console.log('Buckets fetched:', buckets);  // Log fetched buckets
    res.status(200).json({ buckets: buckets.buckets });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching buckets:', errorMessage);
    res.status(500).json({ message: 'Failed to fetch buckets', error: errorMessage });
  }
};

// Controller to fetch measurements by bucket
export const fetchMeasurementsByBucket = async (req: Request, res: Response) => {
  const { bucket } = req.body;
  console.log('Bucket received:', bucket);  // Log the bucket

  if (!bucket) {
    console.log('No bucket provided');
    return res.status(400).json({ message: 'Bucket is required' });
  }

  try {
    const measurements = await getMeasurements(bucket);
    console.log('Measurements fetched:', measurements);  // Log fetched measurements
    res.status(200).json({ measurements });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching measurements:', errorMessage);
    res.status(500).json({ message: 'Failed to fetch measurements', error: errorMessage });
  }
};
