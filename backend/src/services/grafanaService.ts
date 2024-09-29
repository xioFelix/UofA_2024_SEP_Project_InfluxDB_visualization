import axios, { AxiosError } from 'axios';

export const handleCreateDashboard = async (query: string): Promise<string> => {
    const grafanaToken = 'glsa_YV7vmDRSvgPJXz0GlAIrdipyM4SLLDPq_ec8a2f95';
    const response = await axios.post('http://localhost:3000/api/dashboards/db', {
        dashboard: {
            title: "Generated Dashboard",
            panels: [
                {
                    title: "Query Results",
                    type: "graph",
                    targets: [
                        {
                            refId: "A",
                            expr: query,  // Replace with the actual query
                            datasource: "InfluxDB",
                        }
                    ]
                }
            ]
        },
        overwrite: true
    }, {
        headers: {
            'Authorization': `Bearer ${grafanaToken}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data.uid;  // Return the UID of the created dashboard
};
