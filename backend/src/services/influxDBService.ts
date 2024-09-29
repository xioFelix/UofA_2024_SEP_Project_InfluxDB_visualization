import { InfluxDB } from '@influxdata/influxdb-client';
import { HealthAPI } from '@influxdata/influxdb-client-apis';
import { BucketsAPI } from '@influxdata/influxdb-client-apis';

// InfluxDB 2.0 server URL and organization
const url = 'http://localhost:8086';  // URL remains constant
const org = 'UofA';  // organization remains constant for this example

let savedToken: string | null = null;

export const verifyTokenAndGetBuckets = async (token: string) => {
  const client = new InfluxDB({ url, token });
  try {
    // Verify the API Token
    const healthAPI = new HealthAPI(client);  
    const health = await healthAPI.getHealth();
    
    // If the token is valid, fetch the buckets
    if (health.status === 'pass') {
      savedToken = token; // save token +

      // Fetch all buckets from the database
      const bucketsAPI = new BucketsAPI(client);  
      const buckets = await bucketsAPI.getBuckets({ org });
      console.log(buckets)
      return buckets;   // Return the list of buckets
    } else {
      throw new Error('Token verification failed');
    }
  } catch (error) {
    console.error('Error verifying API Token and fetching buckets:', error);
    throw error;
  }
};


export const generateQueryForSelection = (bucket: string, measurement: string, fields: string[]): string => {
  if (!bucket || !measurement || !fields || fields.length === 0) {
    return '';  // If the input data is incorrect, an empty string is returned
  }

  // Dynamically generate filters for multiple fields
  const fieldFilters = fields.map(field => `r._field == "${field}"`).join(' or ');

  // Construct the InfluxDB query
  const query = `
    from(bucket: "${bucket}")
      |> range(start: -1h)
      |> filter(fn: (r) => r._measurement == "${measurement}" and (${fieldFilters}))
      |> yield(name: "selected_data")
  `;
  
  return query;
};

export const getMeasurements = async (bucket: string): Promise<string[]> => {
  if (!savedToken) {
    throw new Error('Token is not available. Please verify the token first.');
  }

  const client = new InfluxDB({ url, token: savedToken });
  const queryApi = client.getQueryApi(org);

  const query = `import "influxdata/influxdb/schema"
    schema.measurements(bucket: "${bucket}")`;

  try {
    const measurements: string[] = [];
    const result = await queryApi.collectRows(query);

    result.forEach((row) => {
      measurements.push((row as { _value: string })._value);
    });

    return measurements;
  } catch (error) {
    console.error('Failed to fetch measurements:', error);
    throw new Error('Failed to fetch measurements');
  }
};


// This function fetches fields based on the bucket and measurement
export const getFieldsForMeasurement = async (bucket: string, measurement: string): Promise<string[]> => {
  if (!savedToken) {
    throw new Error('Token is not available. Please verify the token first.');
  }

  const client = new InfluxDB({ url, token: savedToken });
  const queryApi = client.getQueryApi(org);

  // InfluxDB query to fetch fields for the specific measurement
  const query = `
    import "influxdata/influxdb/schema"
    schema.measurementFieldKeys(bucket: "${bucket}", measurement: "${measurement}")
  `;

  try {
    const fields: string[] = [];
    const result = await queryApi.collectRows(query);

    result.forEach((row) => {
      fields.push((row as { _value: string })._value);
    });

    console.log('Fields fetched:', fields);  // Log the fields fetched for debugging
    return fields;
  } catch (error) {
    console.error('Failed to fetch fields from InfluxDB:', error);
    throw new Error('Failed to fetch fields');
  }
};
