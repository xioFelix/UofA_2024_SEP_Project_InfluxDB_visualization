import { Router } from 'express';
import { generateQuery } from '../../controllers/dragAndDrop/querySentController';

const router = Router();

// console.log("Loading querySendRoutes..."); // Debug

// Define POST routes to handle POST requests from /api/query
router.post('/', (req, res) => {
  console.log("POST request received at /api/query"); // Process the POST request
  generateQuery(req, res);  // Call the function that generates the query
});

export default router;