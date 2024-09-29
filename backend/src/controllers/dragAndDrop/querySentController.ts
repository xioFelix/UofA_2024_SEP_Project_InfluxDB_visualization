import { Request, Response } from 'express';
import { generateQueryForSelection } from '../../services/influxDBService';
import { handleCreateDashboard } from '../../services/grafanaService';

// POST /api/query
export const generateQuery = async (req: Request, res: Response) => {
  const { bucket, measurement, fields } = req.body;

  if (!bucket || !measurement || !fields || fields.length === 0) {
    return res.status(400).json({ message: 'Bucket, measurement, and at least one field are required.' });
  }

  try {
    // Generate the query
    const query = generateQueryForSelection(bucket, measurement, fields);

    if (query) {
      // Create Grafana dashboard with the query
      const { uid, url } = await handleCreateDashboard(query);

      return res.status(200).json({
        message: 'Query generated and dashboard created successfully!',
        query,
        dashboardUid: uid, // Grafana UID
        dashboardUrl: url, // Grafana URL
      });
    } else {
      return res.status(500).json({ message: 'Failed to generate query.' });
    }
  } catch (error) {
    console.error('Error in generateQuery:', error);
    return res.status(500).json({ message: 'Error generating query' });
  }
};
