import { Request, Response } from 'express';
import { verifyTokenAndGetBuckets } from '../services/influxDBService';

// POST /api/auth/login
export const logIn = async (req: Request, res: Response) => {
  const { apiToken } = req.body;
  try {
    // Verify the API Token and fetch the buckets
    const buckets = await verifyTokenAndGetBuckets(apiToken);
    
    if (buckets && buckets.buckets) {
      const bucketNames = buckets.buckets.map((b) => b.name);  // Extract the bucket names
      res.status(200).json({
        message: 'API Token is valid and buckets are fetched successfully!',
        buckets: bucketNames,  // Send the bucket names in the response
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