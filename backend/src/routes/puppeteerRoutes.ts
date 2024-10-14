import express from 'express';
import { takeScreenshot } from '../controllers/puppeteerController';

// Create a new router
const router = express.Router();

// POST /api/puppeteer/screenshot
router.post('/screenshot', async (req, res) => {
  const { url } = req.body; 

  if (!url) {
    return res.status(400).send('No URL provided');
  }

  try {
    // Take a screenshot of the provided URL
    const screenshotBuffer = await takeScreenshot(url); 

    // Send the screenshot as a response
    res.setHeader('Content-Type', 'image/png');
    res.send(screenshotBuffer);
  } catch (error) {
    console.error('Error taking screenshot:', error);
    res.status(500).send('Failed to take screenshot');
  }
});

export default router;