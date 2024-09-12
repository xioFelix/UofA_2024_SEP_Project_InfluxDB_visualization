import React, { useState, useEffect } from 'react';

// Query display component
const QueryDisplay: React.FC = () => {
  // State to hold query string
  const [queryString, setQueryString] = useState('');

  // Function to fetch query string from the backend
  const fetchQueryString = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/query/generate'); // Adjust the URL according to your backend endpoint
      const data = await response.json();
      setQueryString(data.query); // Assuming backend returns { query: 'your query string' }
    } catch (error) {
      console.error('Error fetching query string:', error);
    }
  };

  // Optionally fetch query string when component is mounted
  useEffect(() => {
    fetchQueryString();
  }, []);

  return (
    <div style={{ marginTop: '20px', textAlign: 'left', width: '350px', marginLeft: '370px' }}>
      <button
        onClick={() => setQueryString(queryString ? '' : 'Your query string will appear here.')}
        className="mt-2 flex justify-between items-center font-semibold text-lg bg-orange-500 text-white py-3 px-5 rounded"
        style={{ width: 'auto', padding: '10px 20px', marginBottom: '10px' }}
      >
        Query Display <span style={{ marginLeft: '10px' }}>{queryString ? '▲' : '▼'}</span>
      </button>

      {/* Conditionally render the query string */}
      {queryString && (
        <div className="mt-2 p-2 bg-gray-100 rounded" style={{ width: '350px', margin: '0 auto', padding: '10px' }}>
          <p>{queryString || 'No query string available'}</p>
        </div>
      )}
    </div>
  );
};

export default QueryDisplay;
