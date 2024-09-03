import React, { useState, DragEvent } from 'react';

const dragAndDrop: React.FC = () => {
  const [bucket, setBucket] = useState<string>('Drop Bucket Here');
  const [measurement, setMeasurement] = useState<string>('Drop Measurement Here');
  const [field, setField] = useState<string>('Drop Field Here');

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

  const handleDrop = (e: DragEvent<HTMLDivElement>, setItem: React.Dispatch<React.SetStateAction<string>>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    setItem(data);
    e.currentTarget.style.backgroundColor = '#fafafa';
    updateChart();
  };

  const updateChart = () => {
    const chartDiv = document.getElementById('chart');
    if (chartDiv) {
      chartDiv.innerHTML = `
        <p>Generating chart for:</p>
        <p><strong>Bucket:</strong> ${bucket}</p>
        <p><strong>Measurement:</strong> ${measurement}</p>
        <p><strong>Field:</strong> ${field}</p>
      `;
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

          <h2 style={{ textAlign: 'center' }}>Available Measurements</h2>
          <ul id="measurements" style={listStyle}>
            <li style={listItemStyle} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>Measurement 1</li>
            <li style={listItemStyle} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>Measurement 2</li>
            <li style={listItemStyle} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>Measurement 3</li>
          </ul>

          <h2 style={{ textAlign: 'center' }}>Available Fields</h2>
          <ul id="fields" style={listStyle}>
            <li style={listItemStyle} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>Field 1</li>
            <li style={listItemStyle} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>Field 2</li>
            <li style={listItemStyle} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>Field 3</li>
          </ul>
        </div>

        <div className="query-builder">
          <h2 style={{ textAlign: 'center' }}>Query Builder</h2>
          <div
            id="selected-bucket"
            style={dropzoneStyle}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, setBucket)}
          >
            <p>{bucket}</p>
          </div>
          <div
            id="selected-measurement"
            style={dropzoneStyle}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, setMeasurement)}
          >
            <p>{measurement}</p>
          </div>
          <div
            id="selected-field"
            style={dropzoneStyle}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, setField)}
          >
            <p>{field}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dragAndDrop;
