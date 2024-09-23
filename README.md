# InfluxUI-UG1 Configuration

## InfluxDB
Run `docker-compose up` to start the InfluxDB and Grafana containers. The InfluxDB container will be available at `http://localhost:8086` and the Grafana container will be available at `http://localhost:3000`.

- **Username**: Muffin
- **Password**: G4$z7wQp!k2R
- **Initial Organization Name**: UofA
- **Initial Bucket Name**: Muffin
- **Initial Token (sudo)**: N-8Wu2nfylIVZyPR4xLK3ONuVIC-RmxnuhoBzOmkXhIXRUPdlMnssvXPe8xAj50-zZTqv5zgQxxCNGD-UtViuw==
- **Read Example Data Token (Read-only): q0Mc51HIxXJ_kphljbgbNwgM6-Cz_UhC1l1rw_BpOKm-z28cqqqTXMQKswXD11OReW-gx5EAh4bOOG5539IsVw==
- **Reference:** https://docs.influxdata.com/influxdb/v2/api/

## Grafana
- **Username**: admin
- **Password**: H3x&9Lmp*V8j
- **Token**: glsa_1KcuKQyqk4uBPAN9S3mNi5UGQHS4bEPj_ade072dc
- **Token ID**: sa-muffin

## React.js(Frontend)
- Navigate to the Frontend Directory: `cd frontend`.
- Install all required packages and dependencies: `npm install`.
- Start the frontend development server using the following command: `npm run dev`
- Once the command completes, a URL will be displayed in the terminal. Copy and paste the URL into your browser to access the frontend.(Example: `http://localhost:5173/`)

## Node.js(Backend)
- Navigate to the Backend Directory: `cd backend`.
- Install all required packages and dependencies: `npm install`.
- Start the backend development server using the following command: `npm run dev`