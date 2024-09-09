import React, { useState, DragEvent } from 'react';
import axios from 'axios'; // Axios for HTTP requests

const DragAndDrop: React.FC = () => {
  const [bucket, setBucket] = useState<string>('Drop Bucket Here');
  const [measurement, setMeasurement] = useState<string>('Drop Measurement Here');
  const [fields, setFields] = useState<string[]>([]); // Multi-select fields
  const [queryResult, setQueryResult] = useState<string>(''); // Store the query result

  // Available measurements, assumed to be associated with the bucket
  const measurementsMap: { [key: string]: string[] } = {
    'Bucket 1': ['Measurement 1', 'Measurement 2', 'Measurement 3'],
    'Bucket 2': ['Measurement 4', 'Measurement 5', 'Measurement 6'],
    'Bucket 3': ['Measurement 7', 'Measurement 8', 'Measurement 9'],
  };

  // Available fields, assumed to be associated with the measurement
  const fieldsMap: { [key: string]: string[] } = {
    'Measurement 1': ['Field 1', 'Field 2', 'Field 3'],
    'Measurement 2': ['Field 4', 'Field 5', 'Field 6'],
    'Measurement 3': ['Field 7', 'Field 8', 'Field 9'],
  };

  const handleDragStart = (e: DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData('text/plain', e.currentTarget.innerText);
    setTimeout(() => (e.currentTarget.style.opacity = '0.5'), 0);
  };

  const handleDragEnd = (e: DragEvent<HTMLLIElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '#e0ffe0';
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#fafafa';
  };

  // Handle drop logic including resetting fields or measurement
  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    setItem: React.Dispatch<React.SetStateAction<string>>,
    allowedItems: string[],
    resetFields: boolean = false,
    resetMeasurement: boolean = false
  ) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (allowedItems.includes(data)) {
      setItem(data);
      e.currentTarget.style.backgroundColor = '#fafafa';

      if (resetFields) {
        setFields([]); // Reset fields
      }

      if (resetMeasurement) {
        setMeasurement('Drop Measurement Here'); // Reset measurement
        setFields([]); // Also reset fields when resetting measurement
      }

      updateChart();
    } else {
      e.currentTarget.style.backgroundColor = '#fafafa'; // Restore background color
    }
  };

  // Handle drop for fields, ensuring that fields are only added if they match the selected measurement
  const handleFieldDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (fieldsMap[measurement]?.includes(data) && !fields.includes(data)) {
      setFields([...fields, data]);
      e.currentTarget.style.backgroundColor = '#fafafa';
      updateChart();
    } else {
      e.currentTarget.style.backgroundColor = '#fafafa'; // Restore background color
    }
  };

  // Handle drop logic for buckets, resetting measurements and fields as necessary
  const handleBucketDrop = (e: DragEvent<HTMLDivElement>) => {
    handleDrop(e, setBucket, ['Bucket 1', 'Bucket 2', 'Bucket 3'], true, true);
  };

  // Handle drop logic for measurements, resetting fields as necessary
  const handleMeasurementDrop = (e: DragEvent<HTMLDivElement>) => {
    handleDrop(e, setMeasurement, measurementsMap[bucket], true);
  };

  const updateChart = () => {
    // Placeholder function for updating the chart, modify or remove as necessary
  };

  // Remove a specific field from the selected fields list
  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
    updateChart();
  };

  // Frontend drag-and-drop logic in DragAndDrop.tsx
  const handleComplete = async () => {
    if (bucket === 'Drop Bucket Here') {
      setQueryResult('Please select a Bucket.');
    } else if (measurement === 'Drop Measurement Here') {
      setQueryResult('Please select a Measurement.');
    } else if (fields.length === 0) {
      setQueryResult('Please select at least one Field.');
    } else {
      try {
        // Prepare the data to be sent to the backend
        const requestData = {
          bucket,
          measurement,
          fields,  // Send fields array
        };

        // Frontend Axios Request (ensure it's a POST request)
        const response = await axios.post('http://localhost:7000/api/query', requestData); // Use POST method

        // Display the result from the backend
        setQueryResult(`Query Generated Successfully: ${response.data.query}`);
      } catch (error: unknown) { 
        if (axios.isAxiosError(error)) {
          console.error('Axios error status:', error.response?.status);
          console.error('Axios error data:', error.response?.data);
          console.error('Axios error headers:', error.response?.headers);
      
          setQueryResult(`Error: ${error.response?.data?.message || 'An error occurred.'}`);
        } else if (error instanceof Error) {
          console.error('Error generating query:', error.message);
          setQueryResult(`Error: ${error.message}`);
        } else {
          console.error('An unexpected error occurred:', error);
          setQueryResult('An unknown error occurred.');
        }
      }          
    }
  };
  
  // Styles for the container that holds the different drop zones and available items
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px', // Adding space between the columns
    maxWidth: '1300px', // Increase occupied page width
    margin: 'auto',
  };

  // Styles for the list of available items (buckets, measurements, fields)
  const listStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#fff',
    width: '300px', // Fixed width for columns
    wordWrap: 'break-word', // Ensure long words break and wrap within the box
    overflowWrap: 'break-word',
  };

  // Styles for individual list items within the available items
  const listItemStyle: React.CSSProperties = {
    padding: '8px',
    margin: '5px 0',
    backgroundColor: '#e0e0e0',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  // Styles for the drop zones in the Query Builder section
  const dropzoneStyle: React.CSSProperties = {
    border: '2px dashed #ccc',
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: '#fafafa',
    textAlign: 'center',
    marginBottom: '20px',
    width: '200px', // Fixed width for columns
    wordWrap: 'break-word', // Ensure long words break and wrap within the box
    overflowWrap: 'break-word',
  };

  // Styles for the individual fields displayed in the Query Builder
  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '5px 0',
    padding: '5px 10px', // Add padding to make the X button easier to click
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
    position: 'relative',
  };

  // Styles for the delete button (X) that appears next to each field in the Query Builder
  const deleteButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ff0000',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    position: 'absolute',
    right: '10px', // Position the delete button to the right
    top: '50%',
    transform: 'translateY(-50%)',
  };

  // Styles for the text within the field items, ensuring long text is handled properly
  const fieldTextStyle: React.CSSProperties = {
    flexGrow: 1,
    marginRight: '30px', // Adjust margin for the delete button space
    whiteSpace: 'nowrap', // Prevent text from wrapping
    overflow: 'hidden', // Hide overflow text
    textOverflow: 'ellipsis', // Add ellipsis if text is too long
  };

  // Styles for the "Complete" button in the Query Builder
  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#ff8c00', // Orange color
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  // Styles for the result text that appears below the "Complete" button, in a fixed position
  const resultContainerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    width: '80%',
    maxWidth: '600px',
    textAlign: 'center',
  };

  return (
    <div id="app">
      <h1 style={{ textAlign: 'center' }}>InfluxDB & Grafana Query Builder</h1>
      <div style={containerStyle}>
        <div className="available-items">
          <h2 style={{ textAlign: 'center' }}>Available Buckets</h2>
          <ul id="buckets" style={listStyle}>
            <li
              style={listItemStyle}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              Bucket 1
            </li>
            <li
              style={listItemStyle}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              Bucket 2
            </li>
            <li
              style={listItemStyle}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              Bucket 3
            </li>
          </ul>
        </div>

        <div className="available-items">
          {bucket !== 'Drop Bucket Here' && (
            <>
              <h2 style={{ textAlign: 'center' }}>Available Measurements</h2>
              <ul id="measurements" style={listStyle}>
                {measurementsMap[bucket].map((measure) => (
                  <li
                    key={measure}
                    style={listItemStyle}
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    {measure}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="available-items">
          {measurement !== 'Drop Measurement Here' && (
            <>
              <h2 style={{ textAlign: 'center' }}>Available Fields</h2>
              <ul id="fields" style={listStyle}>
                {fieldsMap[measurement]?.map((field) => (
                  <li
                    key={field}
                    style={listItemStyle}
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    {field}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="query-builder">
          <h2 style={{ textAlign: 'center' }}>Query Builder</h2>
          <div
            id="selected-bucket"
            style={dropzoneStyle}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleBucketDrop} 
          >
            <p>{bucket}</p>
          </div>
          <div
            id="selected-measurement"
            style={dropzoneStyle}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleMeasurementDrop} 
          >
            <p>{measurement}</p>
          </div>
          <div
            id="selected-field"
            style={dropzoneStyle}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleFieldDrop} 
          >
            {fields.length > 0 ? (
              fields.map((field, index) => (
                <div key={index} style={fieldStyle}>
                  <span style={fieldTextStyle}>{field}</span>
                  <button
                    onClick={() => removeField(index)}
                    style={deleteButtonStyle}
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <p>Drop Field Here</p>
            )}
          </div>
          <button onClick={handleComplete} style={buttonStyle}>
            Complete
          </button>
        </div>
      </div>
      {queryResult && (
        <div style={resultContainerStyle}>
          <p>{queryResult}</p>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
