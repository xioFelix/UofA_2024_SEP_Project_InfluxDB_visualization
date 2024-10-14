import puppeteer from 'puppeteer';

// Function to take a screenshot of a given URL
export const takeScreenshot = async (url: string): Promise<Buffer> => {
  try {

    console.log('url:', url);
    const grafanaUrl = url;
    console.log('grafanaUrl:', grafanaUrl);

    // Launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navigate to the Grafana URL and wait for the page to load
    await page.goto(grafanaUrl, { waitUntil: 'networkidle0' });
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    // Return the screenshot buffer
    return Buffer.from(screenshotBuffer);
  } catch (error) {
    console.error('Error taking screenshot:', error);
    throw new Error('Failed to take screenshot');
  }
};
