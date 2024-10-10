import React from 'react';
import { Typography, Box } from '@mui/material';

interface GrafanaIframeProps {
    dashboardUrl: string | null;
}

    return (
        <>
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
