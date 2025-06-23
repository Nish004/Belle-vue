// config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to connect to the database
const connect = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping(); // Check if the connection is alive
    console.log('MySQL is connected');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
};

// Export the pool and connect function
module.exports = { pool, connect };