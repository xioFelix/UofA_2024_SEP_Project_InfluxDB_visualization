// frontend/src/App.tsx
import { useState } from 'react';
import Header from './components/Header';
import DragAndDrop from './components/DragAndDrop';
import GrafanaIframe from './components/GrafanaIframe';
import SnapshotPreview from './components/SnapshotPreview';
import { Box, Button, Alert, Snackbar } from '@mui/material';
import axios from 'axios';

function App() {
  // State to manage bucket names fetched from InfluxDB
  const [buckets, setBuckets] = useState<string[]>([]);

  // State to store the URL of the created Grafana dashboard
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);

  // State to store the URL of the snapshot
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

  // State to manage the Snackbar open state
  const [open, setOpen] = useState(false);

  // Function to handle login success and receive bucket names
  const handleLoginSuccess = (bucketNames: string[]) => {
    setBuckets(bucketNames); // Update the state with the received bucket names
  };

  // Function to handle the creation of a new dashboard and update the URL
  const handleDashboardCreated = (url: string) => {
    setDashboardUrl(url); // Store the dashboard URL when a new dashboard is created
    setSnapshotUrl(null); // Clear the snapshot URL to ensure only one iframe is displayed
  };

  // Function to handle the creation of a new snapshot and update the URL
  const handleSnapshotCreated = (url: string) => {
    setSnapshotUrl(url); // Store the snapshot URL when a new snapshot is created
    setDashboardUrl(null); // Clear the dashboard URL to ensure only one iframe is displayed
  };

  // Function to take a screenshot of the snapshot
  const handleTakeScreenshot = async () => {
    try {
      const url = snapshotUrl;
      if (!url) return;
  
        // Send a POST request to the backend to take a screenshot
      const response = await axios.post(
        'http://localhost:7000/api/puppeteer/screenshot',
        { url },
        { responseType: 'blob' }    // Set the response type to 'blob' to receive binary data
      );
      
      // Create a Blob object from the binary data and download it as a PNG file
      const blob = new Blob([response.data], { type: 'image/png' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'grafana-screenshot.png';
      link.click();

      // Display a success message using a Snackbar
      setOpen(true);
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  };

  // Function to handle the Snackbar close event
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      {/* Render the Header component, passing the handleLoginSuccess function */}
      <Header handleLoginSuccess={handleLoginSuccess} />

      {/* Render the DragAndDrop component and pass the buckets and handler functions as props */}
      <Box sx={{ mt: 4 }}>
        <DragAndDrop
          buckets={buckets}
          onDashboardCreated={handleDashboardCreated}
          onSnapshotCreated={handleSnapshotCreated} // Pass the snapshot handler
        />
      </Box>

      {/* Conditionally render either the GrafanaIframe or SnapshotPreview based on which URL is available */}
      {dashboardUrl && <GrafanaIframe dashboardUrl={dashboardUrl} />}
      {snapshotUrl && <SnapshotPreview snapshotUrl={snapshotUrl} />}

      {/* Button to trigger screenshot */}
      <Button onClick={handleTakeScreenshot} 
      variant="contained" 
      color="primary" 
      style={{
      position: 'absolute',
      right: '10px',
    }} sx={{ marginTop: 2 }}>
        Export as PNG
      </Button>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        The snapshot has been successfully exported as a PNG file.
        </Alert>
      </Snackbar>

      {/* Footer section for additional spacing */}
      <Box sx={{ mb: 10 }}></Box>
    </div>
  );
}

export default App;
