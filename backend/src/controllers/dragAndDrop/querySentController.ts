import { Request, Response } from 'express';
import { generateQueryForSelection } from '../../services/influxDBService';
import { handleCreateDashboard } from '../../services/grafanaService';

// Function to handle query generation and dashboard creation
export const generateQuery = async (req: Request, res: Response) => {
  const { bucket, measurement, fields, chartType } = req.body;

  // Generate the InfluxDB query based on the selections
  const query = generateQueryForSelection(bucket, measurement, fields);

  try {
    // Create the Grafana dashboard, passing the query and chart type
    const { uid, url } = await handleCreateDashboard(query, chartType);

    // Return the dashboard URL and the query used
    res.status(200).json({ dashboardUrl: url, query });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to create dashboard', error: error.message });
    } else {
      return res.status(500).json({ message: 'Failed to generate query.' });
    }
  } catch (error) {
    console.error('Error in generateQuery:', error);
    return res.status(500).json({ message: 'Error generating query' });
  }
};
