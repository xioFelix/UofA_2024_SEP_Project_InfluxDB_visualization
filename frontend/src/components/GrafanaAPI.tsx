import { useEffect, useState } from 'react';

const GrafanaAPI = () => {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        fetch('/api/dashboards/1/a0fb9bb8-4dff-4d6b-b607-0039a140f21d', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer glsa_1KcuKQyqk4uBPAN9S3mNi5UGQHS4bEPj_ade072dc`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => setDashboardData(data))
            .catch((error) => console.error('Error fetching dashboard:', error));
    }, []);

    return (
        <div>
            {dashboardData ? (
                <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
            ) : (
                <p>Loading dashboard data...</p>
            )}
        </div>
    );
};

export default GrafanaAPI;
