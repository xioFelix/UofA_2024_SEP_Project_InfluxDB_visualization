import React from 'react';
import { Typography, Box } from '@mui/material';

interface GrafanaIframeProps {
    dashboardUrl: string | null;
}

const GrafanaIframe: React.FC<GrafanaIframeProps> = ({ dashboardUrl }) => {
    return (
        <>
            {dashboardUrl ? (
                <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                    {/* Title */}
                    <Typography variant="h6" align="center">
                        Grafana Dashboard
                    </Typography>
                    {/* Embedded Grafana iframe */}
                    <iframe
                        src={`http://localhost:3000${dashboardUrl}?orgId=1&refresh=1s&viewPanel=1`}
                        width="100%"
                        height="600"
                        frameBorder="0"
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                        }}
                    ></iframe>
                </Box>
            ) : (
                <p>No dashboard to display</p> // Message when no dashboard URL is set
            )}
        </div>
    );
};

export default GrafanaIframe;
