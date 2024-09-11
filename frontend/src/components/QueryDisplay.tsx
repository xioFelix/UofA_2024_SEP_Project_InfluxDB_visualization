import React, { useState } from 'react';

// Query display component
const QueryDisplay: React.FC = () => {
  // State to toggle query visibility
  const [isQueryVisible, setIsQueryVisible] = useState<boolean>(false);

  const toggleQueryVisibility = () => {
    setIsQueryVisible(!isQueryVisible);
  };

  return (
    <div style={{ marginTop: '20px', textAlign: 'left', width: '350px', marginLeft: '370px' }}>
      <button
        onClick={toggleQueryVisibility}
        className="mt-2 flex justify-between items-center font-semibold text-lg bg-orange-500 text-white py-3 px-5 rounded"
        style={{ width: 'auto', padding: '10px 20px', marginBottom: '10px' }} // Added padding and margin for space
        aria-expanded={isQueryVisible}
      >
        Query Display
        <span style={{ marginLeft: '10px' }}>{isQueryVisible ? '▲' : '▼'}</span> {/* Added margin between text and icon */}
      </button>

      {/* Query display area */}
      {isQueryVisible && (
        <div
          className="mt-2 p-2 bg-gray-100 rounded"
          style={{ width: '350px', margin: '0 auto', padding: '10px' }} // Adjusted width and padding
        >
          <p>Content area can be used for interactions.</p>
        </div>
      )}
    </div>
  );
};

export default QueryDisplay;
