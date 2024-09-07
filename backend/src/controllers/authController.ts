import { Request, Response } from 'express';
import { verifyToken } from '../services/influxDBService';

export const logIn = async (req: Request, res: Response) => {
  const { apiToken } = req.body;
  try {
    const isValid = await verifyToken(apiToken);
    if (isValid) {
      res.status(200).json({ message: 'API Token is valid' });
    } else {
      res.status(401).json({ message: 'Invalid API Token' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying API Token' });
  }
};