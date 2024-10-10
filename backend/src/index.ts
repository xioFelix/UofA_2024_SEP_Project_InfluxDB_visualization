import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import authRoutes from './routes/authRoutes';
import querySendRoutes from './routes/dragAndDrop/querySendRoutes';
import bucketRoutes from './routes/dragAndDrop/bucketRoutes'; 
import queryDisplayRoutes from './routes/queryDisplayRoutes';
import grafanaRoutes from './routes/grafanaRoutes'; 
import measurementRoutes from './routes/dragAndDrop/measurementRoutes';
import snapshotRoutes from './routes/snapshotRoutes';

const app = express();
// Configure CORS to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend's origin
  methods: ['GET', 'POST', 'OPTIONS'], // Allow only these HTTP methods
  credentials: true
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use the authRoutes
app.use('/api/auth', authRoutes);

// get measurements
app.use('/api/measurements', measurementRoutes); 
app.use('/api/buckets', bucketRoutes);

// Route for query generation 
app.use('/api/query', querySendRoutes);

// Route for query display
app.use('/api/display', queryDisplayRoutes);

// Route for Grafana Dashboard
app.use('/api/grafana', grafanaRoutes);

// Route for Snapshot Function
app.use('/api/snapshot', snapshotRoutes);

// Print the registered route
const listRoutes = (app: express.Express) => {
    if (!app._router) {
      console.log("No routes registered.");
      return;
    }
    
    app._router.stack.forEach((middleware: any) => {
      if (middleware.route) {
        console.log(`${Object.keys(middleware.route.methods)}: ${middleware.route.path}`);
      }
    });
  };

// // start the server at port 7000
// app.listen(7000, () => {
//     console.log('Server is running on port 7000');
//     listRoutes(app);  
// });

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
