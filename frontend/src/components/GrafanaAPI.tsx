export const updateGrafanaDashboard = async (query: string) => {
    const adminToken = 'YOUR_GRAFANA_ADMIN_TOKEN';
    const response = await fetch('http://localhost:3000/api/dashboards/db', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dashboard: {
                title: 'User Dashboard',
                panels: [
                    {
                        title: 'User Query Result',
                        type: 'graph',
                        targets: [{ refId: 'A', datasource: 'InfluxDB', query }],
                    },
                ],
            },
            overwrite: true,
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to update dashboard');
    }
};
