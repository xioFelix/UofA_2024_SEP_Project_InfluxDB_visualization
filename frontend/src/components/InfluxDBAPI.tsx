import { useEffect, useState } from 'react';

const InfluxDBAPI = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8086/api/v2/query', {
            method: 'POST',
            headers: {
                'Authorization': `Token N-8Wu2nfylIVZyPR4xLK3ONuVIC-RmxnuhoBzOmkXhIXRUPdlMnssvXPe8xAj50-zZTqv5zgQxxCNGD-UtViuw==`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: 'from(bucket: "Muffin") |> range(start: -1h)',
                dialect: {
                    annotations: ["datatype", "group", "default"],
                },
            }),
        })
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data from InfluxDB:', error));
    }, []);

    return (
        <div>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading InfluxDB data...</p>}
        </div>
    );
};

export default InfluxDBAPI;
