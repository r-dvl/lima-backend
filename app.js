/**
 * This module configures and exports an Express application.
 * @module app
 */

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoDbUrl = require('./config');

// Import routes
const photoRoutes = require('./routes/photos');
const authRoutes = require('./routes/auth');
const dockerRoutes = require('./routes/docker');

// Create Express application
const app = express();

/**
 * CORS configuration.
 * @type {Object}
 */
const corsOptions = {
  origin: 'https://r-dvl.site',
  optionsSuccessStatus: 200,
};

// Use CORS with defined options
app.use(cors(corsOptions));

/**
 * MongoDB connection.
 * Connects to the MongoDB database at the URL specified by the MONGODB_URL environment variable.
 */
mongoose.connect(`${mongoDbUrl}/lima`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * Use API routes.
 * Defines routes for photos, authentication, and Docker.
 */
app.use('/photos', photoRoutes);
app.use('/auth', authRoutes);
app.use('/docker', dockerRoutes);

/**
 * JSON handler.
 * Configures body parsing middleware to parse the body of incoming requests as JSON.
 */
app.use(bodyParser.json({limit: '50mb'}));

// Export Express application
module.exports = app;
