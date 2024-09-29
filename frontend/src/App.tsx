import { useState } from 'react';
import Header from './components/Header';
import DragAndDrop from './components/DragAndDrop';
import QueryDisplay from './components/QueryDisplay';
import InfluxDBAPI from './components/InfluxDBAPI';
import GrafanaIframe from './components/GrafanaIframe';

function App() {
  // State to manage bucket names fetched from InfluxDB
  const [buckets, setBuckets] = useState<string[]>([]);

  // State to store the URL of the created Grafana dashboard
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);

  // Function to handle the event when login is successful and receive bucket names
  const handleLoginSuccess = (bucketNames: string[]) => {
    setBuckets(bucketNames); // Update the state with the received bucket names
  };

  // Function to handle the creation of a new dashboard and update the URL
  const handleDashboardCreated = (url: string) => {
    setDashboardUrl(url); // Store the dashboard URL when a new dashboard is created
  };

  return (
    <div>
      {/* Render the Header component, passing the handleLoginSuccess function */}
      <Header handleLoginSuccess={handleLoginSuccess} />

      {/* Render the DragAndDrop component and pass the buckets and handleDashboardCreated function as props */}
      <div className="mt-16">
        <DragAndDrop buckets={buckets} onDashboardCreated={handleDashboardCreated} />
      </div>

      {/* Render the QueryDisplay component to show any query results */}
      <div style={{ marginBottom: '50px', textAlign: 'center' }}>
        <QueryDisplay />
      </div>

      {/* Display the Grafana dashboard in an iframe if a dashboard URL is set */}
      <div className="mt-16">
        <h2>Grafana Dashboard</h2>
        {dashboardUid ? (
          <GrafanaIframe dashboardUid={dashboardUid} />
        ) : (
          <p>No dashboard to display</p>
        )}
      </div>

      {/* Render InfluxDB API Data */}
      <div className="mt-16">
        <h2>InfluxDB Data</h2>
        <InfluxDBAPI />
      </div>

      {/* Footer */}
      <div className="footer" style={{ marginBottom: '100px' }}>
      </div>
    </div>
  );
}

export default App;
