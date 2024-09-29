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

    return response.data.uid;  // Return the UID of the created dashboard
};
