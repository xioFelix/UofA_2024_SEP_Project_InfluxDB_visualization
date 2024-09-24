import React, { useState } from 'react';

// Query display component
const QueryDisplay: React.FC = () => {
  // State to hold query string and visibility of the display area
  const [queryString, setQueryString] = useState('');
  const [isQueryVisible, setIsQueryVisible] = useState(false);

  // Function to send POST request and fetch query string from the backend
  const generateQueryString = async () => {
    try {
      // Send POST request to generate query string
      const response = await fetch('http://localhost:7000/api/query/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      // Parse the response and update state
      const data = await response.json();
      setQueryString(data.query || 'No query string available'); // Assuming the backend returns { query: 'your query string' }
    } catch (error) {
      console.error('Error generating query string:', error);
    }
  };

  // Function to toggle query visibility
  const toggleQueryVisibility = () => {
    if (!isQueryVisible) {
      generateQueryString(); // Only generate query when opening the dropdown
    }
    setIsQueryVisible(!isQueryVisible); // Toggle visibility
  };

  return (
    <div style={{ marginTop: '20px', textAlign: 'left', width: '350px', marginLeft: '370px' }}>
      <button
        onClick={toggleQueryVisibility}
        className="mt-2 flex justify-between items-center font-semibold text-lg bg-orange-500 text-white py-3 px-5 rounded"
        style={{ width: 'auto', padding: '10px 20px', marginBottom: '10px' }}
      >
        Query Display <span style={{ marginLeft: '10px' }}>{isQueryVisible ? '▲' : '▼'}</span>
      </button>

      {/* Conditionally render the query string area */}
      {isQueryVisible && (
        <div className="mt-2 p-2 bg-gray-100 rounded" style={{ width: '350px', margin: '0 auto', padding: '10px' }}>
          <p>{queryString}</p>
        </div>
      )}
    </div>
  );
};

export default QueryDisplay;
