const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); // Assuming you have a routes/index.js that combines all routes
const { PORT = 3001 } = process.env;
require('dotenv').config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const db = require('./config/connection');

// Use routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
