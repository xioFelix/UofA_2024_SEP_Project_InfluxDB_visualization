import { Request, Response } from 'express';
import { generateQueryForSelection } from '../services/influxDBService'; // Adjust according to the actual path

// A controller function that processes queries to generate and return results
export const getQuery = (req: Request, res: Response) => {
  try {
    // To get data from the request, you can extract buckets, measurement, and fields from the data passed by the front end
    const { bucket, measurement, fields } = req.body;
    console.log("Received request body:", req.body);

    // Invokes functions in the service to generate queries
    const query = generateQueryForSelection(bucket, measurement, fields);
    console.log("Generated query string:", query);
    // Returns the generated query string
    res.status(200).json({ query });
  } catch (error) {
    console.error('Error generating query:', error);
    res.status(500).json({ message: 'Failed to generate query' });
  }
};
