import { InfluxDB } from '@influxdata/influxdb-client';
import { HealthAPI } from '@influxdata/influxdb-client-apis';

// InfluxDB 2.0 server URL and token
export const verifyToken = async (token: string) => {
  const url = 'http://localhost:8086';
  const org = 'UofA';
  const bucket = 'Muffin';
  const client = new InfluxDB({ url, token });

  try {
    const healthAPI = new HealthAPI(client);
    const health = await healthAPI.getHealth();
    
    if (health.status === 'pass') {
      return true;
    } else {
      console.error('InfluxDB health check failed:', health);
      return false;
    }
  } catch (error) {
    console.error('Error verifying API Token:', error);
    return false;
  }
};
