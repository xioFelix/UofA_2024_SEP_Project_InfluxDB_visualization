export const createDashboardOnBackend = async (query: string): Promise<string> => {
    // Send request to the backend to create a Grafana dashboard
    const response = await fetch('http://localhost:7000/api/grafana/create-dashboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error('Dashboard creation failed');
    }

    // Extract the UID of the created dashboard from the response
    const data = await response.json();
    return data.uid;
};
