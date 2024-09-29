import React, { useState, DragEvent } from 'react';
import axios from 'axios'; // Axios for HTTP requests

interface DragAndDropProps {
  buckets: string[]; // Buckets data passed as a prop
  onDashboardCreated: (url: string) => void; // Function to handle when a dashboard is created
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ buckets, onDashboardCreated }) => {
  const [bucket, setBucket] = useState<string>('Drop Bucket Here');
  const [measurement, setMeasurement] = useState<string>('Drop Measurement Here');
  const [measurements, setMeasurements] = useState<string[]>([]); // Store actual measurements
  const [fields, setFields] = useState<string[]>([]); // Multi-select fields
  const [selectedFields, setSelectedFields] = useState<string[]>([]); // Selected fields by drag and drop
  const [queryResult, setQueryResult] = useState<string>(''); // Store the query result

  const handleDragStart = (e: DragEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    if (target) {
      e.dataTransfer.setData('text/plain', target.innerText);
      setTimeout(() => {
        target.style.opacity = '0.5';
      }, 0);
    }
  };

  const handleDragEnd = (e: DragEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    if (target) {
      target.style.opacity = '1';
    }
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


  const fetchMeasurements = async (bucket: string) => {
    try {
      console.log('Fetching measurements for bucket:', bucket);  // Log the bucket before making the request
      const response = await axios.post('http://localhost:7000/api/buckets/measurements', { bucket });
      console.log('Measurements fetched:', response.data.measurements);  // Log the measurements received
      setMeasurements(response.data.measurements); // Update the state with fetched measurements
    } catch (error) {
      console.error('Error fetching measurements:', error);  // Log the error
    }
  };

  // Handle drop logic for buckets, resetting measurements and fields as necessary
  const handleBucketDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    if (buckets.includes(data)) {
      setBucket(data); // Update selected bucket
      setMeasurement('Drop Measurement Here'); // Reset selected measurement
      setFields([]); // Reset selected fields
      setSelectedFields([]); // Reset selected fields

      // Fetch measurements for the selected bucket
      fetchMeasurements(data);
    }

    e.currentTarget.style.backgroundColor = '#fafafa'; // Restore background color
  };

  // Handle drop logic for measurements, resetting fields as necessary
  const handleMeasurementDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    if (measurements.includes(data)) {
      setMeasurement(data);
      setSelectedFields([]); // Reset fields when measurement is changed

      // Fetch fields for the selected measurement
      try {
        const response = await axios.post('http://localhost:7000/api/measurements/fields', {
          bucket,
          measurement: data,
        });
        console.log('Fetched fields:', response.data.fields);  // Log fetched fields
        setFields(response.data.fields);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    }
    if (e.currentTarget) {
      e.currentTarget.style.backgroundColor = '#fafafa'; // Restore background color
    }
  };

  // Handle drop for fields, ensuring that fields are only added if they match the selected measurement
  const handleFieldDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    // Check if the field is not already selected and is part of the fields array
    if (fields.includes(data) && !selectedFields.includes(data)) {
      setSelectedFields([...selectedFields, data]);  // Only add field to selectedFields when it's dragged
    }

    e.currentTarget.style.backgroundColor = '#fafafa'; // Restore background color
  };

  const updateChart = () => {
    // Placeholder function for updating the chart, modify or remove as necessary
  };

  // Remove a specific field from the selected fields list
  const removeField = (index: number) => {
    const updatedFields = selectedFields.filter((_, i) => i !== index); // Remove from selectedFields
    setSelectedFields(updatedFields);
    updateChart(); // Optional: Update chart after field removal
  };

  // Frontend drag-and-drop logic in DragAndDrop.tsx
  const handleComplete = async () => {
    if (bucket === 'Drop Bucket Here') {
      setQueryResult('Please select a Bucket.');
    } else if (measurement === 'Drop Measurement Here') {
      setQueryResult('Please select a Measurement.');
    } else if (selectedFields.length === 0) {
      setQueryResult('Please select at least one Field.');
    } else {
      try {
        const requestData = {
          bucket,
          measurement,
          fields: selectedFields,
        };

        // Send the query request to the backend
        const response = await axios.post('http://localhost:7000/api/query', requestData);

        // Check if the dashboard URL is included in the response
        if (response.data.dashboardUrl) {
          onDashboardCreated(response.data.dashboardUrl); // Pass the URL to the parent component
        }

        // Set the query result in the state
        setQueryResult(`Query Generated Successfully: ${response.data.query}`);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
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
            {buckets.map((bucket) => (
              <li
                key={bucket} // Using the bucket name as the key
                style={listItemStyle}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                {bucket}
              </li>
            ))}
          </ul>
        </div>

        <div className="available-items">
          {bucket !== 'Drop Bucket Here' && measurements.length > 0 && (
            <>
              <h2 style={{ textAlign: 'center' }}>Available Measurements</h2>
              <ul id="measurements" style={listStyle}>
                {measurements.map((measure) => (
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
          {measurement !== 'Drop Measurement Here' && fields.length > 0 && (
            <>
              <h2 style={{ textAlign: 'center' }}>Available Fields</h2>
              <ul id="fields" style={listStyle}>
                {fields.map((field) => (
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
            {selectedFields.length > 0 ? (
              selectedFields.map((field, index) => (
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
              <p>Drop Fields Here</p> // This is the placeholder for fields
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