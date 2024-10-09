// components/GrafanaIframe.tsx
import React, { useState } from 'react';

const GrafanaIframe: React.FC = () => {
    // State to store the URL of the created Grafana dashboard
    const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);

    // Function to handle the creation of a new dashboard and update the URL
    const handleDashboardCreated = (url: string) => {
        setDashboardUrl(url); // Store the dashboard URL when a new dashboard is created
    };

    return (
        <div className="mt-16">
            <h2>Grafana Dashboard</h2>
            {dashboardUrl ? (
                // Display the Grafana dashboard using the provided URL inside an iframe
                <iframe
                    src={`http://localhost:3000${dashboardUrl}?orgId=1&refresh=1s&viewPanel=1`}
                    width="100%"
                    height="600"
                    frameBorder="0"
                ></iframe>
            ) : (
                <p>No dashboard to display</p> // Message when no dashboard URL is set
            )}
        </div>
    );
};

export default GrafanaIframe;
