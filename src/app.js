import express from 'express';
import cors from 'cors';

// Create the express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Automatically parse JSON bodies

// Routes
app.post('/calculate', (req, res) => {
  const { price, quantity } = req.body;

  // Input validation
  if (
    typeof price !== 'number' ||
    typeof quantity !== 'number' ||
    price <= 0 ||
    quantity <= 0
  ) {
    return res.status(400).json({ error: 'Price and quantity must be positive numbers.' });
  }

  const total = price * quantity;
  res.status(200).json({ total });
});

// Export the app (for testing)
export default app;
