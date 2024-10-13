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
  buckets: string[];
  onDashboardCreated: (url: string) => void;
  onSnapshotCreated: (url: string) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ buckets, onDashboardCreated, onSnapshotCreated }) => {
  const [bucket, setBucket] = useState<string>('Drop Bucket Here');
  const [measurement, setMeasurement] = useState<string>('Drop Measurement Here');
  const [measurements, setMeasurements] = useState<string[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [queryResult, setQueryResult] = useState<string>('');
  const [chartType, setChartType] = useState<string>('graph');

  const handleChartTypeChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as string);
  };

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
    e.currentTarget.style.backgroundColor = '#f0f4f8';
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#fafafa';
  };

  const fetchMeasurements = async (bucket: string) => {
    try {
      const response = await axios.post('http://localhost:7000/api/buckets/measurements', { bucket });
      setMeasurements(response.data.measurements);
    } catch (error) {
      console.error('Error fetching measurements:', error);
    }
  };

  const handleBucketDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    if (buckets.includes(data)) {
      setBucket(data);
      setMeasurement('Drop Measurement Here');
      setFields([]);
      setSelectedFields([]);

      fetchMeasurements(data);
    }
    e.currentTarget.style.backgroundColor = '#fafafa';
  };

  const handleMeasurementDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    if (measurements.includes(data)) {
      setMeasurement(data);
      setSelectedFields([]);

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
    e.currentTarget.style.backgroundColor = '#fafafa';
  };

  const handleFieldDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    if (fields.includes(data) && !selectedFields.includes(data)) {
      setSelectedFields([...selectedFields, data]);
    }

    e.currentTarget.style.backgroundColor = '#fafafa';
  };

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
          chartType,
        };

        const response = await axios.post('http://localhost:7000/api/query', requestData);

        if (response.data.dashboardUrl) {
          onDashboardCreated(response.data.dashboardUrl);
        }

        setQueryResult(`${response.data.query}`);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setQueryResult(`Error: ${error.response?.data?.message || 'An error occurred.'}`);
        } else {
          setQueryResult('An unknown error occurred.');
        }
      }
    }
  };

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
          chartType,
        };

        const response = await axios.post('http://localhost:7000/api/snapshot', requestData);

        if (response.data.snapshotUrl) {
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

      {/* Main layout structure */}
      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Available Buckets */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Available Buckets
          </Typography>
          <Paper sx={{ height: 400, padding: 2, overflow: 'auto' }}>
            <List>
              {buckets.map((bucket) => (
                <ListItem
                  key={bucket}
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  sx={{ cursor: 'grab', backgroundColor: '#e0e0e0', mb: 1 }}
                >
                  <ListItemText primary={bucket} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Available Measurements */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Available Measurements
          </Typography>
          <Paper sx={{ height: 400, padding: 2, overflow: 'auto' }}>
            <List>
              {measurements.map((measurement) => (
                <ListItem
                  key={measurement}
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  sx={{ cursor: 'grab', backgroundColor: '#e0e0e0', mb: 1 }}
                >
                  <ListItemText primary={measurement} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Available Fields */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Available Fields
          </Typography>
          <Paper sx={{ height: 400, padding: 2, overflow: 'auto' }}>
            <List>
              {fields.map((field) => (
                <ListItem
                  key={field}
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  sx={{ cursor: 'grab', backgroundColor: '#e0e0e0', mb: 1 }}
                >
                  <ListItemText primary={field} />
                </ListItem>
              ))}
            </List>
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

      {/* Query Code Display */}
      <Box sx={{ mt: 4 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: '#D95023', color: '#fff' }}
          >
            <Typography>Query code display</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ maxHeight: 200, overflowY: 'auto' }}>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {queryResult}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default DragAndDrop;
