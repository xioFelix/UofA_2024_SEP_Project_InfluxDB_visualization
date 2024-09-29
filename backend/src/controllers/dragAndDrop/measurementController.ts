
import { Request, Response } from 'express';
import { getFieldsForMeasurement } from '../../services/influxDBService';

// Controller to fetch fields by measurement and bucket
export const fetchFieldsByMeasurement = async (req: Request, res: Response) => {
  const { bucket, measurement } = req.body;

  if (!bucket || !measurement) {
    return res.status(400).json({ message: 'Bucket and measurement are required' });
  }

  try {
    const fields = await getFieldsForMeasurement(bucket, measurement);
    console.log('Fetched fields:', fields);  // 添加日志，检查 fields
    res.status(200).json({ fields });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching fields:', errorMessage);
    res.status(500).json({ message: 'Failed to fetch fields', error: errorMessage });
  }
};

