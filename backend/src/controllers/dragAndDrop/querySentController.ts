import { Request, Response } from 'express';
import { generateQueryForSelection } from '../../services/influxDBService';
import { handleCreateDashboard } from '../../services/grafanaService';

// Function to handle query generation and dashboard creation
export const generateQuery = async (req: Request, res: Response) => {
  const { bucket, measurement, fields, chartType } = req.body;

  // Generate the InfluxDB query based on the selections
  const query = generateQueryForSelection(bucket, measurement, fields);

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
