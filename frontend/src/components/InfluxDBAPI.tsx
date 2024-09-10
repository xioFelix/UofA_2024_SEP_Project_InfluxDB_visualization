import { useEffect, useState } from 'react';

const InfluxDBAPI = () => {
    const [buckets, setBuckets] = useState<any[]>([]); // State to store buckets

    useEffect(() => {
        fetch('http://localhost:8086/api/v2/buckets', {  // API endpoint to get all buckets
            method: 'GET',
            headers: {
                'Authorization': `Token N-8Wu2nfylIVZyPR4xLK3ONuVIC-RmxnuhoBzOmkXhIXRUPdlMnssvXPe8xAj50-zZTqv5zgQxxCNGD-UtViuw==`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setBuckets(data.buckets);  // Set the bucket data to state
            })
            .catch((error) => console.error('Error fetching buckets:', error));
    }, []);

    return (
        <div>
            <h2>Available Buckets</h2>
            {buckets.length > 0 ? (
                <ul>
                    {buckets.map((bucket) => (
                        <li key={bucket.id}>{bucket.name}</li>  // Display bucket names
                    ))}
                </ul>
            ) : (
                <p>Loading buckets...</p>
            )}
        </div>
    );
};

export default InfluxDBAPI;
