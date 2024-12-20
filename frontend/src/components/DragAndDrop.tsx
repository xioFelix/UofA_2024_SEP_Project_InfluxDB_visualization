import React, { useState, DragEvent } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface DragAndDropProps {
  buckets: string[]; // Buckets data passed as a prop
  onDashboardCreated: (url: string) => void; // Function to handle when a dashboard is created
  onSnapshotCreated: (url: string) => void; // Function to handle when a snapshot is created
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ buckets, onDashboardCreated, onSnapshotCreated }) => {
  // State variables to manage selections and data
  const [bucket, setBucket] = useState<string>('Drop Bucket Here');
  const [measurement, setMeasurement] = useState<string>('Drop Measurement Here');
  const [measurements, setMeasurements] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [queryResult, setQueryResult] = useState<string>('');
  const [chartType, setChartType] = useState<string>('graph'); // State to store selected chart type

  // Handle chart type change
  const handleChartTypeChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as string); // Update chart type state
  };

  // Handle drag start event
  const handleDragStart = (e: DragEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    if (target) {
      e.dataTransfer.setData('text/plain', target.innerText); // Set the dragged text
      setTimeout(() => {
        target.style.opacity = '0.5'; // Make the dragged item semi-transparent
      }, 0);
    }
  };

  // Handle drag end event
  const handleDragEnd = (e: DragEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    if (target) {
      target.style.opacity = '1'; // Reset the opacity of the dragged item
    }
  };

  // Handle drag over event
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Enable drop action
  };

  // Handle drag enter event
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '#f0f4f8'; // Light blue background when item is dragged over
  };

  // Handle drag leave event
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#fafafa'; // Reset background color
  };

  // Fetch measurements for a selected bucket
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
      setFields([]); // Reset fields
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
      setMeasurement(data); // Update selected measurement
      setSelectedFields([]); // Reset selected fields

      // Fetch fields for the selected measurement
      try {
        const response = await axios.post('http://localhost:7000/api/measurements/fields', {
          bucket,
          measurement: data,
        });
        setFields(response.data.fields); // Set fetched fields
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
      setSelectedFields([...selectedFields, data]); // Add field to selectedFields
    }

    e.currentTarget.style.backgroundColor = '#fafafa'; // Reset background color after drop
  };

  // Handle the "Complete" button click
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
          chartType, // Include chart type in the request data
        };

        // Send the query request to the backend
        const response = await axios.post('http://localhost:7000/api/query', requestData);

        // Check if the dashboard URL is included in the response
        if (response.data.dashboardUrl) {
          onDashboardCreated(response.data.dashboardUrl); // Pass the URL to the parent component
        }

        setQueryResult(`${response.data.query}`); // Display success message
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setQueryResult(`Error: ${error.response?.data?.message || 'An error occurred.'}`);
        } else {
          setQueryResult('An unknown error occurred.');
        }
      }
    }
  };

  // Function to handle snapshot creation
  const handleCreateSnapshot = async () => {
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
          chartType, // Include chartType if needed
        };

        // Send a request to the backend to create a snapshot
        const response = await axios.post('http://localhost:7000/api/snapshot', requestData);

        if (response.data.snapshotUrl) {
          // Use the handler to pass the snapshot URL to the parent component
          onSnapshotCreated(response.data.snapshotUrl);
        } else {
          console.error('Snapshot URL not received from server.');
        }
      } catch (error) {
        console.error('Error creating snapshot:', error);
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
              height: 400,
              padding: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
              overflow: 'auto',
            }}
          >
            {buckets.length > 0 ? (
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
                      '&:hover': { backgroundColor: '#cfcfcf' },
                    }}
                  >
                    <ListItemText primary={bucket} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography align="center" color="textSecondary">
                Log in to display buckets
              </Typography>
            )}
          </Paper>
        </Box>

        {/* Available Measurements */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Available Measurements
          </Typography>
          <Paper
            sx={{
              height: 400,
              padding: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
              overflow: 'auto',
            }}
          >
            {bucket !== 'Drop Bucket Here' && measurements.length > 0 ? (
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
                      '&:hover': { backgroundColor: '#cfcfcf' },
                    }}
                  >
                    <ListItemText primary={measure} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography align="center" color="textSecondary">
                Drag a bucket to display measurements
              </Typography>
            )}
          </Paper>
        </Box>

        {/* Available Fields */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Available Fields
          </Typography>
          <Paper
            sx={{
              height: 400,
              padding: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
              overflow: 'auto',
            }}
          >
            {measurement !== 'Drop Measurement Here' && fields.length > 0 ? (
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
                      '&:hover': { backgroundColor: '#cfcfcf' },
                    }}
                  >
                    <ListItemText primary={field} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography align="center" color="textSecondary">
                Drag a measurement to display fields
              </Typography>
            )}
          </Paper>
        </Box>

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
              maxHeight: 235,
              overflowY: 'auto',
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
          {/* Chart Type Selection */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="chart-type-label">Chart Type</InputLabel>
            <Select
              labelId="chart-type-label"
              value={chartType}
              label="Chart Type"
              onChange={handleChartTypeChange}
            >
              <MenuItem value="graph">Graph</MenuItem>
              <MenuItem value="table">Table</MenuItem>
              <MenuItem value="stat">Stat</MenuItem>
              <MenuItem value="gauge">Gauge</MenuItem>
              <MenuItem value="bargauge">Bar Gauge</MenuItem>
            </Select>
          </FormControl>

          {/* Complete Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleComplete}
          >
            Complete
          </Button>
          {/* Create Snapshot Button */}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleCreateSnapshot}
          >
            Create Snapshot
          </Button>
        </Box>
      </Box>

      {queryResult && (
        <Accordion sx={{ marginTop: 4}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
            aria-controls="query-content"
            id="query-header"
            sx={{
              backgroundColor: '#D95023', // The background color of the title
              color: '#fff', // Title text color
            }}
          >
            <Typography sx={{ marginBottom: 0 }}>Query code display</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              maxHeight: '200px', // content
              overflowY: 'auto', // scrollbar
            }}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}
            >
              {queryResult}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};
export default DragAndDrop;