import { Request, Response } from 'express';
import { handleCreateSnapshot, buildDashboardModel } from '../../services/grafanaService';

// Function to handle snapshot creation
export const createSnapshot = async (req: Request, res: Response) => {
    const { bucket, measurement, fields, chartType } = req.body;

    // Validate input
    if (!bucket || !measurement || !fields || fields.length === 0) {
        return res.status(400).json({ message: 'Invalid input parameters' });
    }

    try {
        // Build the dashboard model based on user selections
        const dashboard = buildDashboardModel(bucket, measurement, fields, chartType);

        // Create the snapshot using the Grafana API
        const { url } = await handleCreateSnapshot(dashboard);

        // Return the snapshot URL to the frontend
        res.status(200).json({ snapshotUrl: url });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Failed to create snapshot', error: error.message });
        } else {
            res.status(500).json({ message: 'Failed to create snapshot', error: 'Unknown error' });
        }
    }
};
