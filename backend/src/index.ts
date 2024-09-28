import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import authRoutes from './routes/authRoutes';
import querySendRoutes from './routes/dragAndDrop/querySendRoutes';
import bucketRoutes from './routes/dragAndDrop/bucketRoutes'; 
<<<<<<< Updated upstream
=======
import queryDisplayRoutes from './routes/queryDisplayRoutes';
import grafanaRoutes from './routes/grafanaRoutes'; 
>>>>>>> Stashed changes

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

// Route for query generation 
app.use('/api/query', querySendRoutes);

// get measurements
app.use('/api/buckets', bucketRoutes);

<<<<<<< Updated upstream
=======
// Route for query display
app.use('/api/query', queryDisplayRoutes);

// Route for Grafana Dashboard
app.use('/api/grafana', grafanaRoutes);
>>>>>>> Stashed changes

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

// start the server at port 7000
app.listen(7000, () => {
    console.log('Server is running on port 7000');
    listRoutes(app);  
});