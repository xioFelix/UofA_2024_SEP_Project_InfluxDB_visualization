import express, { Request, Response } from 'express';
import { handleCreateDashboard } from '../services/grafanaService';

const router = express.Router();

// POST /api/grafana/create-dashboard
router.post('/create-dashboard', async (req: Request, res: Response) => {
    const { query, chartType } = req.body; // Destructure chartType from the request body
    try {
        // Get both the UID and URL from the Grafana API
        const { uid, url } = await handleCreateDashboard(query);
        res.status(200).json({ uid, url }); // Send both UID and URL
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Dashboard creation failed', error: error.message });
        } else {
            res.status(500).json({ message: 'Dashboard creation failed', error: 'Unknown error' });
        }
    }
});

export default router;
