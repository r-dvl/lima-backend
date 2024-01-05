/**
 * This module configures and exports an Express application.
 * @module app
 */

// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoDbUrl from './config.js';

// Import routes
import photoRoutes from './routes/photos.js';
import authRoutes from './routes/auth.js';
import dockerRoutes from './routes/docker.js';

// Create Express application
const app = express();

/**
 * CORS configuration.
 * @type {Object}
 */
const corsOptions = {
  origin: ['https://r-dvl.site'],
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
 * JSON handler.
 * Configures body parsing middleware to parse the body of incoming requests as JSON.
 */
app.use(bodyParser.json({limit: '50mb'}));

/**
 * Use API routes.
 * Defines routes for photos, authentication, and Docker.
 */
app.use('/photos', photoRoutes);
app.use('/auth', authRoutes);
app.use('/docker', dockerRoutes);

// Export Express application
export default app;