import { InfluxDB } from '@influxdata/influxdb-client';
import { HealthAPI } from '@influxdata/influxdb-client-apis';
import { BucketsAPI } from '@influxdata/influxdb-client-apis';

// InfluxDB 2.0 server URL and token
const url = 'http://localhost:8086';  // URL remains constant
const org = 'UofA';  // organization remains constant for this example

export const verifyTokenAndGetBuckets = async (token: string) => {
  const client = new InfluxDB({ url, token });
  try {
    // Verify the API Token
    const healthAPI = new HealthAPI(client);  
    const health = await healthAPI.getHealth();
    
    if (health.status === 'pass') {
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

