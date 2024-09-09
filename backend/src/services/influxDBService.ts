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
      
      return buckets;   // Return the list of buckets
    } else {
      throw new Error('Token verification failed');
    }
  } catch (error) {
    console.error('Error verifying API Token and fetching buckets:', error);
    throw error;
  }
};
