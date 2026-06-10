import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API healthcheck endpoint
app.get('/', (req, res) => {
  res.send('HealthGuard Pharmaceutical API is active');
});

// Products endpoint
app.use('/api/products', productsRouter);

// Contact message endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please specify name, email, and message.' });
  }

  console.log('Contact inquiry received:', { name, email, subject, message });
  
  res.status(200).json({ 
    success: true, 
    message: 'Your inquiry has been logged successfully.' 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
