// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
db.connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection error:', error.message);
    process.exit(1); // Exit the process with failure
  });

// Debugging: Log database connection details (consider removing in production)
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error.message); // Log the error for debugging
  res.status(500).json({ error: error.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});