import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Create the express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Automatically parse JSON bodies


// Rate limiting middleware 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 500, // Number of requests allowed per windowMs
  message: 'Too many requests, please try again later.' // Message to send when limit is reached
});

app.use(limiter); // Apply rate limiting to all requests


// Routes
app.get('/', (req, res) => { //So we can check if the server is running and not get the 404 error
  res.send('✅ Workflow Automation API is running.');
});

app.get('/calculate', (req, res) => {
  const price = Number(req.query.price);
  const quantity = Number(req.query.quantity);

  if (!price || !quantity || price <= 0 || quantity <= 0) {
    return res.status(400).json({ error: 'Price and quantity must be positive numbers.' });
  }

  const total = price * quantity;
  res.status(200).json({ total });
});

// Export the app (for testing)
export default app;
