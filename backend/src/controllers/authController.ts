import { Request, Response } from 'express';
import { verifyTokenAndGetBuckets } from '../services/influxDBService';

// POST /api/auth/login
export const logIn = async (req: Request, res: Response) => {
  const { apiToken } = req.body;
  try {
    // Verify the API Token and fetch the buckets
    const buckets = await verifyTokenAndGetBuckets(apiToken);

    if (buckets && buckets.buckets) {
      // Extract the bucket names and filter out names starting with '_'
      const bucketNames = buckets.buckets
        .map((b) => b.name)
        .filter((name) => !name.startsWith('_')); // Filter out system buckets

      res.status(200).json({
        message: 'API Token is valid and buckets are fetched successfully!',
        buckets: bucketNames, // Send the filtered bucket names in the response
      });
    } else {
      res.status(401).json({
        message: 'Invalid API Token or no buckets found',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying API Token and fetching buckets' });
  }
};
