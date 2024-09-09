import { Request, Response } from 'express';
import { verifyToken } from '../services/influxDBService';

// POST /api/auth/login
export const logIn = async (req: Request, res: Response) => {
  const { apiToken } = req.body;
  try {
    const isValid = await verifyToken(apiToken);
    
    // Check if the API Token is valid
    if (isValid) {
      res.status(200).json({ message: 'API Token is valid' });
    } 
    
    // If the API Token is invalid
    else {
      res.status(401).json({ message: 'Invalid API Token' });
    }
  } 
  
  // Handle errors
  catch (error) {
    res.status(500).json({ message: 'Error verifying API Token' });
  }
};