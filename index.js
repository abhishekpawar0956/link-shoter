// index.js
const express = require('express');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const bodyParser = require('body-parser');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
