import React, { useState, DragEvent } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DragAndDropProps {
  buckets: string[]; // Buckets data passed as a prop
  onDashboardCreated: (url: string) => void; // Function to handle when a dashboard is created
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ buckets, onDashboardCreated }) => {
  const [bucket, setBucket] = useState<string>('Drop Bucket Here');
  const [measurement, setMeasurement] = useState<string>('Drop Measurement Here');
  const [measurements, setMeasurements] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [queryResult, setQueryResult] = useState<string>('');

  const handleDragStart = (e: DragEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    if (target) {
      e.dataTransfer.setData('text/plain', target.innerText); // Set the dragged text
      setTimeout(() => {
        target.style.opacity = '0.5'; // Make the dragged item semi-transparent
      }, 0);
    }
  };

  const handleDragEnd = (e: DragEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    if (target) {
      target.style.opacity = '1'; // Reset the opacity of the dragged item
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Enable drop action
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '#f0f4f8'; // Light blue background when item is dragged over
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#fafafa'; // Reset background color
  };

  const fetchMeasurements = async (bucket: string) => {
    try {
      const response = await axios.post('http://localhost:7000/api/buckets/measurements', { bucket });
      setMeasurements(response.data.measurements); // Set fetched measurements
    } catch (error) {
      console.error('Error fetching measurements:', error); // Log any error
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

      fetchMeasurements(data); // Fetch measurements for the selected bucket
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
        setFields(response.data.fields);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    }
    e.currentTarget.style.backgroundColor = '#fafafa'; // Reset background color after drop
  };

  // Handle drop for fields, ensuring that fields are only added if they match the selected measurement
  const handleFieldDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    if (fields.includes(data) && !selectedFields.includes(data)) {
      setSelectedFields([...selectedFields, data]);  // Only add field to selectedFields when it's dragged
    }

    e.currentTarget.style.backgroundColor = '#fafafa'; // Reset background color after drop
  };

  // Handle complete button
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

        setQueryResult(`Query Generated Successfully: ${response.data.query}`); // Display success message
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setQueryResult(`Error: ${error.response?.data?.message || 'An error occurred.'}`);
        } else {
          setQueryResult('An unknown error occurred.');
        }
      }
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Query Builder
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
        {/* Available Buckets */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Available Buckets
          </Typography>
          <Paper
            sx={{
              maxHeight: 400,
              overflow: 'auto', // Enable scrolling if content exceeds height
              padding: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
            }}
          >
            <List>
              {buckets.map((bucket) => (
                <ListItem
                  key={bucket}
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  sx={{
                    cursor: 'grab',
                    backgroundColor: '#e0e0e0',
                    mb: 1,
                    borderRadius: 1,
                    '&:hover': { backgroundColor: '#cfcfcf' }, // Hover effect
                  }}
                >
                  <ListItemText primary={bucket} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Available Measurements */}
        {bucket !== 'Drop Bucket Here' && measurements.length > 0 && (
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              Available Measurements
            </Typography>
            <Paper
              sx={{
                maxHeight: 400,
                overflow: 'auto', // Enable scrolling if content exceeds height
                padding: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
              }}
            >
              <List>
                {measurements.map((measure) => (
                  <ListItem
                    key={measure}
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    sx={{
                      cursor: 'grab',
                      backgroundColor: '#e0e0e0',
                      mb: 1,
                      borderRadius: 1,
                      '&:hover': { backgroundColor: '#cfcfcf' }, // Hover effect
                    }}
                  >
                    <ListItemText primary={measure} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* Available Fields */}
        {measurement !== 'Drop Measurement Here' && fields.length > 0 && (
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              Available Fields
            </Typography>
            <Paper
              sx={{
                maxHeight: 400,
                overflow: 'auto', // Enable scrolling if content exceeds height
                padding: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
              }}
            >
              <List>
                {fields.map((field) => (
                  <ListItem
                    key={field}
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    sx={{
                      cursor: 'grab',
                      backgroundColor: '#e0e0e0',
                      mb: 1,
                      borderRadius: 1,
                      '&:hover': { backgroundColor: '#cfcfcf' }, // Hover effect
                    }}
                  >
                    <ListItemText primary={field} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* Query Builder */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Query Builder
          </Typography>
          
          {/* Bucket Drop Zone */}
          <Paper
            onDragOver={handleDragOver}
            onDrop={handleBucketDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            sx={{
              padding: 2,
              minHeight: 50,
              mb: 2,
              backgroundColor: '#fafafa',
              textAlign: 'center',
              border: '2px dashed #ccc',
              borderRadius: 2,
            }}
          >
            <Typography>{bucket}</Typography>
          </Paper>

          {/* Measurement Drop Zone */}
          <Paper
            onDragOver={handleDragOver}
            onDrop={handleMeasurementDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            sx={{
              padding: 2,
              minHeight: 50,
              mb: 2,
              backgroundColor: '#fafafa',
              textAlign: 'center',
              border: '2px dashed #ccc',
              borderRadius: 2,
            }}
          >
            <Typography>{measurement}</Typography>
          </Paper>

          {/* Fields Drop Zone */}
          <Paper
            onDragOver={handleDragOver}
            onDrop={handleFieldDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            sx={{
              padding: 2,
              minHeight: 50,
              maxHeight: 235,  // Make this similar to Available Buckets height
              overflowY: 'auto',  // Enable scrolling for long list of fields
              backgroundColor: '#fafafa',
              border: '2px dashed #ccc',
              borderRadius: 2,
            }}
          >
            <List>
              {selectedFields.length > 0 ? (
                selectedFields.map((field, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      backgroundColor: '#e0e0e0',
                      mb: 1,
                      borderRadius: 1,
                      '&:hover': { backgroundColor: '#cfcfcf' },
                    }}
                  >
                    <ListItemText primary={field} />
                    <IconButton
                      color="error"
                      onClick={() => setSelectedFields(selectedFields.filter((_, i) => i !== index))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))
              ) : (
                <Typography align="center">Drop Fields Here</Typography>
              )}
            </List>
          </Paper>

          {/* Complete Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: '#f57c00',
              '&:hover': { backgroundColor: '#ef6c00' },  // Orange color with hover effect
            }}
            onClick={handleComplete}
          >
            Complete
          </Button>
        </Box>
      </Box>

      {/* Query Result Section */}
      {queryResult && (
        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="textSecondary">
            {queryResult}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DragAndDrop;