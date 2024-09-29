import React from 'react';

interface GrafanaIframeProps {
    dashboardUid: string;
}

const GrafanaIframe: React.FC<GrafanaIframeProps> = ({ dashboardUid }) => {
    return (
        <iframe
            src={`http://localhost:3000/d/${dashboardUid}?orgId=1&refresh=10s`}
            width="100%"
            height="600"
            frameBorder="0"
        ></iframe>
    );
};

export default GrafanaIframe;
