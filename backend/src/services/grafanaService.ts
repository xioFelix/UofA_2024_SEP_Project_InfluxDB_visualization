import axios, { AxiosError } from 'axios';

// Function to handle dashboard creation on Grafana
export const handleCreateDashboard = async (query: string): Promise<{ uid: string, url: string }> => {
    const grafanaToken = 'glsa_7bYeH35A4Pl5VfiuzeQhbz2Pim9am1bL_2a72c8d4';

    // Log the start of the function
    console.log("Starting Grafana dashboard creation...");

    // Log the query being used
    console.log("Using query: ", query);

    try {
        // Generate a unique title for each dashboard
        const dashboardTitle = `Dashboard - ${new Date().toISOString()}`;

        // Axios request to create a new dashboard with the given query
        const response = await axios.post('http://localhost:3000/api/dashboards/db', {
            dashboard: {
                id: null,  // Use null if creating a new dashboard
                title: dashboardTitle, // Unique title for each dashboard
                panels: [
                    {
                        type: 'graph',
                        title: 'Query Results',
                        datasource: 'InfluxDB',
                        targets: [
                            {
                                refId: 'A',
                                query: query  // Ensure the query is properly structured
                            }
                        ]
                    }
                ]
            },
            folderId: 0,  // Set the folder ID to 0 if you're not using folders
            overwrite: false  // Disable overwriting existing dashboards
        }, {
            headers: {
                Authorization: `Bearer ${grafanaToken}`,
                'Content-Type': 'application/json'
            }
        });

        // Log the response from Grafana
        console.log("Grafana response data: ", response.data);

        // Return UID and URL from the response
        return {
            uid: response.data.uid, // Return the UID of the created dashboard
            url: response.data.url  // Return the URL of the created dashboard
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Log error details from Axios errors
            console.error("Axios error creating Grafana dashboard: ", error.response ? error.response.data : error.message);
        } else if (error instanceof Error) {
            // Log error details from generic JS errors
            console.error("Generic error creating Grafana dashboard: ", error.message);
        } else {
            // Log unknown error type
            console.error("Unknown error creating Grafana dashboard");
        }
        throw new Error('Failed to create Grafana dashboard');
    }
};
