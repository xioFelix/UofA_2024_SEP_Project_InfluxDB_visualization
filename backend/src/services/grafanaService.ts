import axios from 'axios';

// Function to handle dashboard creation on Grafana
export const handleCreateDashboard = async (
    query: string,
    chartType: string
): Promise<{ uid: string; url: string }> => {
    const grafanaToken = 'glsa_1KcuKQyqk4uBPAN9S3mNi5UGQHS4bEPj_ade072dc';

    // Log the start of the function
    console.log('Starting Grafana dashboard creation...');

    // Log the query being used
    console.log('Using query: ', query);

    try {
        // Generate a unique title for each dashboard
        const dashboardTitle = `Dashboard - ${new Date().toISOString()}`;

        // Configure the panel based on the selected chart type
        let panel: any = {
            type: chartType, // Use the chart type provided
            title: 'Query Results',
            datasource: 'InfluxDB',
            targets: [
                {
                    refId: 'A',
                    query: query, // Ensure the query is properly structured
                },
            ],
            gridPos: {
                x: 0,
                y: 0,
                w: 24,
                h: 9,
            },
        };

        // Add specific configurations for certain chart types
        if (chartType === 'piechart') {
            panel.type = 'grafana-piechart-panel'; // Use the plugin's panel type
            panel.options = {
                // Add pie chart specific options here
            };
        }
        // Add more conditions for other chart types if necessary

        // Axios request to create a new dashboard with the given query and panel configuration
        const response = await axios.post(
            'http://localhost:3000/api/dashboards/db',
            {
                dashboard: {
                    id: null, // Use null if creating a new dashboard
                    uid: null,
                    title: dashboardTitle, // Unique title for each dashboard
                    timezone: 'browser',
                    panels: [panel],
                    schemaVersion: 27,
                    version: 0,
                    time: {
                        from: 'now-1h',
                        to: 'now',
                    },
                },
                folderId: 0, // Set the folder ID to 0 if you're not using folders
                overwrite: false, // Disable overwriting existing dashboards
            },
            {
                headers: {
                    Authorization: `Bearer ${grafanaToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Log the response from Grafana
        console.log('Grafana response data: ', response.data);

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
