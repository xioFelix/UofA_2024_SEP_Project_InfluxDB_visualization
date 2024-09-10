import { Request, Response } from 'express';
import { generateQueryForSelection } from '../../services/influxDBService'; 

// POST /api/query
export const generateQuery = async (req: Request, res: Response) => {
    const { bucket, measurement, fields } = req.body;
    
    // Check whether the request body is valid
    if (!bucket || !measurement || !fields || fields.length === 0) {
      return res.status(400).json({ message: 'Bucket, measurement, and at least one field are required.' });
    }
  
    try {
      const query = generateQueryForSelection(bucket, measurement, fields);  // Make sure this function generates the correct query
  
    //   console.log("Generated query:", query);  // Debug
  
      if (query) {
        return res.status(200).json({
          message: 'Query generated successfully!',
          query: query,  // Returns the generated query statement
        });
      } else {
        return res.status(500).json({ message: 'Failed to generate the query.' });
      }
    } catch (error) {
      console.error('Error in generateQuery:', error);
      return res.status(500).json({ message: 'Error generating query' });
    }
  };
  