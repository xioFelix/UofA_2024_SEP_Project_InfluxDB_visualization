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
        <iframe
            src={`http://localhost:3000/d/${dashboardUid}?orgId=1&refresh=1s&viewPanel=1`}
            width="100%"
            height="600"
            frameBorder="0"
        ></iframe>
    );
};

export default GrafanaIframe;
