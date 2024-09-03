import React, { useState, DragEvent } from 'react';

const DragAndDrop: React.FC = () => {
  const [bucket, setBucket] = useState<string>('Drop Bucket Here');
  const [measurement, setMeasurement] = useState<string>('Drop Measurement Here');
  const [fields, setFields] = useState<string[]>([]); // Multi-select fields

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
    // Continue adding fields for other measurements
  };

  const handleDragStart = (e: DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData('text/plain', e.currentTarget.innerText);
    setTimeout(() => e.currentTarget.style.opacity = '0.5', 0);
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

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    setItem: React.Dispatch<React.SetStateAction<string>>,
    allowedItems: string[]
  ) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (allowedItems.includes(data)) {
      setItem(data);
      e.currentTarget.style.backgroundColor = '#fafafa';
      updateChart();
    } else {
      e.currentTarget.style.backgroundColor = '#fafafa'; // Restore background color
    }
  };

  const handleFieldDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const field = e.dataTransfer.getData('text/plain');
    if (fieldsMap[measurement]?.includes(field) && !fields.includes(field)) {
      setFields([...fields, field]);
      e.currentTarget.style.backgroundColor = '#fafafa';
      updateChart();
    } else {
      e.currentTarget.style.backgroundColor = '#fafafa'; // Restore background color
    }
  };

  const updateChart = () => {
    const chartDiv = document.getElementById('chart');
    if (chartDiv) {
      if (
        bucket !== 'Drop Bucket Here' &&
        measurement !== 'Drop Measurement Here' &&
        fields.length > 0
      ) {
        chartDiv.innerHTML = `
          <p>Generating chart for:</p>
          <p><strong>Bucket:</strong> ${bucket}</p>
          <p><strong>Measurement:</strong> ${measurement}</p>
          <p><strong>Fields:</strong> ${fields.join(', ')}</p>
        `;
      } else {
        chartDiv.innerHTML = ''; // Clear content
      }
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '800px',
    margin: 'auto',
  };

  const listStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#fff',
  };

  const listItemStyle: React.CSSProperties = {
    padding: '8px',
    margin: '5px 0',
    backgroundColor: '#e0e0e0',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  const dropzoneStyle: React.CSSProperties = {
    border: '2px dashed #ccc',
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: '#fafafa',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const chartContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    border: '2px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    backgroundColor: '#fff',
    marginTop: '30px',
  };

  return (
    <div id="app">
      <h1 style={{ textAlign: 'center' }}>InfluxDB & Grafana Query Builder</h1>
      <div style={containerStyle}>
        <div className="available-items">
          <h2 style={{ textAlign: 'center' }}>Available Buckets</h2>
          <ul id="buckets" style={listStyle}>
            <li style={listItemStyle} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>Bucket 1</li>
            <li style={listItemStyle} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>Bucket 2</li>
            <li style={listItemStyle} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>Bucket 3</li>
          </ul>

          {bucket !== 'Drop Bucket Here' && (
            <>
              <h2 style={{ textAlign: 'center' }}>Available Measurements</h2>
              <ul id="measurements" style={listStyle}>
                {measurementsMap[bucket].map(measure => (
                  <li key={measure} style={listItemStyle} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>{measure}</li>
                ))}
              </ul>
            </>
          )}

          {measurement !== 'Drop Measurement Here' && (
            <>
              <h2 style={{ textAlign: 'center' }}>Available Fields</h2>
              <ul id="fields" style={listStyle}>
                {fieldsMap[measurement]?.map(field => (
                  <li key={field} style={listItemStyle} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>{field}</li>
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
            onDrop={(e) => handleDrop(e, setBucket, ['Bucket 1', 'Bucket 2', 'Bucket 3'])}
          >
            <p>{bucket}</p>
          </div>
          <div
            id="selected-measurement"
            style={dropzoneStyle}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, setMeasurement, measurementsMap[bucket])}
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
            <p>{fields.length > 0 ? fields.join(', ') : 'Drop Field Here'}</p>
          </div>
        </div>
      </div>

      <div style={chartContainerStyle}>
        <h2>Generated Chart</h2>
        <div id="chart">
          {/* No content will be displayed here if conditions are not met */}
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
