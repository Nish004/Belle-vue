const express = require('express');
const router = express.Router();
const { pool } = require('../../resort-management-next/app/config/db'); // ✅ Use pool from db.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password, address, pincode, phone } = req.body;

  if (!name || !email || !password || !address || !pincode || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if user exists
    const [userExists] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (userExists.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert with address, pincode, phone
    await pool.query(
      'INSERT INTO users (name, email, password, address, pincode, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, address, pincode, phone]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('[REGISTER ERROR]', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});


// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'SECRET_KEY',
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('[LOGIN ERROR]', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
