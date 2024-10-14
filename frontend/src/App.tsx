// frontend/src/App.tsx
import { useState } from 'react';
import Header from './components/Header';
import DragAndDrop from './components/DragAndDrop';
import GrafanaIframe from './components/GrafanaIframe';
import SnapshotPreview from './components/SnapshotPreview';
import { Box } from '@mui/material';

function App() {
  // State to manage bucket names fetched from InfluxDB
  const [buckets, setBuckets] = useState<string[]>([]);

  // State to store the URL of the created Grafana dashboard
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);

  // State to store the URL of the snapshot
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

  // Function to handle login success and receive bucket names
  const handleLoginSuccess = (bucketNames: string[]) => {
    setBuckets(bucketNames); // Update the state with the received bucket names
  };

  // Function to handle the creation of a new dashboard and update the URL
  const handleDashboardCreated = (url: string) => {
    setDashboardUrl(url); // Store the dashboard URL when a new dashboard is created
  };

  // Function to handle the creation of a new snapshot and update the URL
  const handleSnapshotCreated = (url: string) => {
    setSnapshotUrl(url); // Store the snapshot URL when a new snapshot is created
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

      {/* Render the GrafanaIframe component, passing the dashboardUrl */}
      <GrafanaIframe dashboardUrl={dashboardUrl} />

      {/* Render the SnapshotPreview component, passing the snapshotUrl */}
      <SnapshotPreview snapshotUrl={snapshotUrl} />

      {/* Footer section for additional spacing */}
      <Box sx={{ mb: 10 }}></Box>
    </div>
  );
}

export default App;
