import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // Import dotenv

// Import route files
import authRoutes from './routes/authRoutes';
import deliveryRoutes from './routes/deliveryRoutes';

// Import auth middleware
import { authMiddleware } from './middleware/authMiddleware'; // Assuming middleware is in src/middleware/authMiddleware.ts

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse incoming JSON requests

// Apply authentication middleware globally to all /api routes
// This will protect all endpoints, including /api/auth/login as per specification
app.use('/api', authMiddleware);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/deliveries', deliveryRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.send('Delivery App Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
