import React from 'react';
import { Typography, Box } from '@mui/material';

interface SnapshotPreviewProps {
    snapshotUrl: string | null;
}

const SnapshotPreview: React.FC<SnapshotPreviewProps> = ({ snapshotUrl }) => {
    return (
        <>
            {snapshotUrl && (
                <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                    {/* Title */}
                    <Typography variant="h6" align="center">
                        Snapshot Preview
                    </Typography>
                    {/* Embedded Snapshot iframe */}
                    <iframe
                        src={snapshotUrl}
                        width="100%"
                        height="600"
                        frameBorder="0"
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                        }}
                    ></iframe>
                </Box>
            )}
        </>
    );
};

export default SnapshotPreview;
