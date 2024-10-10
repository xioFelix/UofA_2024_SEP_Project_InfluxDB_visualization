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
            url: response.data.url, // Return the URL of the created dashboard
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Log error details from Axios errors
            console.error(
                'Axios error creating Grafana dashboard: ',
                error.response ? error.response.data : error.message
            );
        } else if (error instanceof Error) {
            // Log error details from generic JS errors
            console.error('Generic error creating Grafana dashboard: ', error.message);
        } else {
            // Log unknown error type
            console.error('Unknown error creating Grafana dashboard');
        }
        throw new Error('Failed to create Grafana dashboard');
    }
};

// Handle snapshot creation
export const handleCreateSnapshot = async (
    dashboard: any
): Promise<{ url: string }> => {
    const grafanaToken = 'glsa_1KcuKQyqk4uBPAN9S3mNi5UGQHS4bEPj_ade072dc';
    const grafanaApiUrl = 'http://localhost:3000';

    try {
        // Send a POST request to Grafana's Snapshot API
        const response = await axios.post(
            `${grafanaApiUrl}/api/snapshots`,
            {
                dashboard: dashboard,
                expires: 3600, // Snapshot expiration time in seconds (e.g., 1 hour)
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${grafanaToken}`,
                },
            }
        );

        // Return the snapshot URL
        return {
            url: response.data.url,
        };
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error(
                'Axios error creating Grafana snapshot: ',
                error.response ? error.response.data : error.message
            );
        } else if (error instanceof Error) {
            console.error('Generic error creating Grafana snapshot: ', error.message);
        } else {
            console.error('Unknown error creating Grafana snapshot');
        }
        throw new Error('Failed to create Grafana snapshot');
    }
};

// Build the dashboard model based on user selections
export const buildDashboardModel = (
    bucket: string,
    measurement: string,
    fields: string[],
    chartType: string
) => {
    const fieldFilters = fields.map((field) => `r._field == "${field}"`).join(' or ');

    const query = `
        from(bucket: "${bucket}")
          |> range(start: -1h)
          |> filter(fn: (r) => r._measurement == "${measurement}" and (${fieldFilters}))
    `;

    const panel = {
        type: chartType,
        title: 'Data Preview',
        datasource: 'InfluxDB',
        targets: [
            {
                refId: 'A',
                query: query,
            },
        ],
        gridPos: {
            x: 0,
            y: 0,
            w: 24,
            h: 9,
        },
    };

    const dashboard = {
        id: null,
        uid: null,
        title: 'Snapshot Dashboard',
        timezone: 'browser',
        panels: [panel],
        schemaVersion: 27,
        version: 0,
        time: {
            from: 'now-1h',
            to: 'now',
        },
    };

    return dashboard;
};