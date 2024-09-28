export const createDashboardOnBackend = async (query: string): Promise<string> => {
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

    const data = await response.json();
    return data.uid;
};
