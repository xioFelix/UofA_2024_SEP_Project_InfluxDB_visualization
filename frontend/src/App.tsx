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
    setBuckets(bucketNames); // Store bucket names in state
  };

  return (
    <div>
      {/* Render the Header component, with LogIn button inside */}
      <Header handleLoginSuccess={handleLoginSuccess} />

      {/* Render DragAndDrop component and pass the buckets as a prop */}
      <div className="mt-16">
        <DragAndDrop buckets={buckets} />
      </div>

      {/* Render QueryDisplay component */}
      <div style={{ marginBottom: '50px', textAlign: 'center' }}>
        <QueryDisplay />
      </div>

      {/* Render Grafana iframe if dashboardUid exists, otherwise show a message */}
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
