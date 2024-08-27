const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URI
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB';

// Connect to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;
